import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, addDoc, updateDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { PenSquare, Tag, Save, Eye, ArrowLeft, X, ImagePlus, Loader2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Admin: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!editId);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState('');

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!editId) return;
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, 'posts', editId));
        if (snap.exists()) {
          const data = snap.data();
          setTitle(data.title || '');
          setSummary(data.summary || '');
          setContent(data.content || '');
          setTags(data.tags || []);
        }
      } catch {
        alert('글을 불러오는 중 오류가 발생했어요.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [editId, navigate]);

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '');
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  // 이미지 업로드
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('JPG, PNG, WEBP, GIF 형식만 업로드할 수 있어요.');
      return;
    }
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      alert('이미지는 5MB 이하만 업로드할 수 있어요.');
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `images/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // 커서 위치에 마크다운 이미지 삽입
      const mdImage = `![이미지](${url})`;
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.slice(0, start) + mdImage + content.slice(end);
        setContent(newContent);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + mdImage.length;
          textarea.focus();
        }, 0);
      } else {
        setContent((prev) => prev + '\n' + mdImage);
      }
    } catch {
      alert('이미지 업로드 중 오류가 발생했어요.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    setSaving(true);
    try {
      const data = {
        title: title.trim(),
        summary: summary.trim() || content
          .replace(/!\[.*?\]\(.*?\)/g, '')
          .replace(/#{1,6}\s/g, '')
          .replace(/\*\*|__|\*|_|~~|`/g, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .trim().slice(0, 120),
        content: content.trim(),
        tags,
        updatedAt: serverTimestamp(),
      };
      if (editId) {
        await updateDoc(doc(db, 'posts', editId), data);
        navigate(`/post/${editId}`);
      } else {
        const docRef = await addDoc(collection(db, 'posts'), {
          ...data,
          createdAt: serverTimestamp(),
        });
        navigate(`/post/${docRef.id}`);
      }
    } catch {
      alert('저장 중 오류가 발생했어요.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-28 flex items-center justify-center">
        <div className="text-gray-400">불러오는 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <PenSquare className="w-3.5 h-3.5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">
                {editId ? '글 수정' : '새 글 작성'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 이미지 업로드 버튼 */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || preview}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              title="이미지 업로드"
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ImagePlus className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{uploading ? '업로드 중...' : '이미지'}</span>
            </button>

            <button
              onClick={() => setPreview(!preview)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                preview ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">미리보기</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? '저장 중...' : '발행'}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full px-5 py-4 text-xl font-bold text-gray-900 placeholder-gray-300 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-200 transition-all"
          />

          {/* Summary */}
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="요약 (비워두면 본문 첫 120자가 사용됩니다)"
            className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-200 transition-all"
          />

          {/* Tags */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl px-5 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium"
                >
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-indigo-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={addTag}
                placeholder="태그 입력 후 Enter"
                className="flex-1 min-w-24 text-sm text-gray-600 placeholder-gray-300 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* 이미지 드래그앤드롭 안내 + 에디터 */}
          <div
            className="relative"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file && file.type.startsWith('image/')) {
                const dt = new DataTransfer();
                dt.items.add(file);
                if (fileInputRef.current) {
                  fileInputRef.current.files = dt.files;
                  fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }
            }}
          >
            {preview ? (
              <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 min-h-96 prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-indigo-500 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-blockquote:border-indigo-300 prose-img:rounded-xl">
                {content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                ) : (
                  <p className="text-gray-300">내용을 입력하면 여기에 미리보기가 표시됩니다.</p>
                )}
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`# 제목\n\n마크다운으로 글을 작성하세요.\n\n**굵게**, *기울임*, \`코드\` 등을 사용할 수 있어요.\n\n이미지는 상단 [이미지] 버튼 또는 여기에 드래그&드롭 하세요.`}
                className="w-full px-5 py-4 text-sm text-gray-700 placeholder-gray-300 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-200 transition-all resize-none font-mono leading-relaxed"
                style={{ minHeight: '480px' }}
              />
            )}

            {/* 업로드 오버레이 */}
            {uploading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                  <p className="text-sm text-gray-600 font-medium">이미지 업로드 중...</p>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center">
            마크다운 지원 · 이미지 버튼 또는 드래그&드롭으로 업로드 (최대 5MB)
          </p>
        </div>
      </div>
    </main>
  );
};

export default Admin;
