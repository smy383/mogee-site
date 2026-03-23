import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  collection, addDoc, updateDoc, doc, getDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { PenSquare, Tag, Save, Eye, ArrowLeft, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!editId);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    if (!editId) return;
    const fetchPost = async () => {
      const snap = await getDoc(doc(db, 'posts', editId));
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title || '');
        setSummary(data.summary || '');
        setContent(data.content || '');
        setTags(data.tags || []);
      }
      setLoading(false);
    };
    fetchPost();
  }, [editId]);

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

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    setSaving(true);
    try {
      const data = {
        title: title.trim(),
        summary: summary.trim() || content.slice(0, 120).trim(),
        content: content.trim(),
        tags,
        updatedAt: serverTimestamp(),
      };
      if (editId) {
        await updateDoc(doc(db, 'posts', editId), data);
        navigate(`/post/${editId}`);
      } else {
        const ref = await addDoc(collection(db, 'posts'), {
          ...data,
          createdAt: serverTimestamp(),
        });
        navigate(`/post/${ref.id}`);
      }
    } catch (e) {
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
            <button
              onClick={() => setPreview(!preview)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                preview ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              미리보기
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

          {/* Content / Preview */}
          {preview ? (
            <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 min-h-96 prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-indigo-500 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-blockquote:border-indigo-300">
              {content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              ) : (
                <p className="text-gray-300">내용을 입력하면 여기에 미리보기가 표시됩니다.</p>
              )}
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`# 제목\n\n마크다운으로 글을 작성하세요.\n\n**굵게**, *기울임*, \`코드\` 등을 사용할 수 있어요.`}
              className="w-full px-5 py-4 text-sm text-gray-700 placeholder-gray-300 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-200 transition-all resize-none font-mono leading-relaxed"
              style={{ minHeight: '480px' }}
            />
          )}

          <p className="text-xs text-gray-400 text-center">마크다운(Markdown) 문법을 지원합니다 · 미리보기로 확인하세요</p>
        </div>
      </div>
    </main>
  );
};

export default Admin;
