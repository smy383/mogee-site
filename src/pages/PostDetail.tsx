import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useLang, t, Lang } from '../contexts/LanguageContext';
import { Post } from '../components/BlogCard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Pencil, Trash2 } from 'lucide-react';

const LANG_INFO: Record<Lang, { flag: string; label: string }> = {
  ko: { flag: '🇰🇷', label: '한국어' },
  en: { flag: '🇺🇸', label: 'English' },
  ja: { flag: '🇯🇵', label: '日本語' },
};

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lang: globalLang } = useLang();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [lang, setLang] = useState<Lang>(globalLang);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, 'posts', id));
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() } as Post);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // 글 로드 후 전역 언어로 초기화 (해당 언어 번역이 있을 때만)
  useEffect(() => {
    if (!post) return;
    if (globalLang === 'en' && post.title_en && post.content_en) setLang('en');
    else if (globalLang === 'ja' && post.title_ja && post.content_ja) setLang('ja');
    else setLang('ko');
  }, [post, globalLang]);

  const formatDate = (ts: any) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    const locale = lang === 'en' ? 'en-US' : lang === 'ja' ? 'ja-JP' : 'ko-KR';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleDelete = async () => {
    if (!id || !window.confirm(t(lang, 'deleteConfirm'))) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'posts', id));
      navigate('/');
    } catch {
      alert(t(lang, 'deleteError'));
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-28">
        <div className="max-w-3xl mx-auto px-6 animate-pulse">
          <div className="h-8 bg-gray-100 rounded w-2/3 mb-4" />
          <div className="h-4 bg-gray-100 rounded w-1/3 mb-8" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded w-full" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">{t(lang, 'postNotFound')}</p>
          <Link to="/" className="text-indigo-500 hover:underline text-sm">{t(lang, 'goHome')}</Link>
        </div>
      </main>
    );
  }

  const availableLangs: Lang[] = [
    'ko',
    ...(post.title_en && post.content_en ? ['en' as Lang] : []),
    ...(post.title_ja && post.content_ja ? ['ja' as Lang] : []),
  ];

  const displayTitle =
    lang === 'en' && post.title_en ? post.title_en :
    lang === 'ja' && post.title_ja ? post.title_ja :
    post.title;

  const displayContent =
    lang === 'en' && post.content_en ? post.content_en :
    lang === 'ja' && post.content_ja ? post.content_ja :
    post.content;

  const displayTags =
    lang === 'en' && post.tags_en?.length ? post.tags_en :
    lang === 'ja' && post.tags_ja?.length ? post.tags_ja :
    post.tags;

  const readingTime = Math.max(1, Math.ceil(displayContent.length / 700));
  const readLabel = lang === 'en'
    ? `${readingTime} min read`
    : `${readingTime}${t(lang, 'minRead')}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t(lang, 'backToBlog')}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Tags */}
          {displayTags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {displayTags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {displayTitle}
          </h1>

          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readLabel}
              </span>
            </div>

            {user && (
              <div className="flex items-center gap-2">
                <Link
                  to={`/admin?edit=${post.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  {t(lang, 'edit')}
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t(lang, 'delete')}
                </button>
              </div>
            )}
          </div>

          {/* 언어 전환 탭 (다국어 글에만 표시) */}
          {availableLangs.length > 1 && (
            <div className="flex items-center gap-1.5 mb-8">
              {availableLangs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    lang === l
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'bg-white/70 text-gray-500 hover:bg-gray-100 border border-gray-100'
                  }`}
                >
                  <span>{LANG_INFO[l].flag}</span>
                  <span>{LANG_INFO[l].label}</span>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-indigo-500 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-indigo-300 prose-blockquote:text-gray-500"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {displayContent}
          </ReactMarkdown>
        </motion.div>
      </div>
    </main>
  );
};

export default PostDetail;
