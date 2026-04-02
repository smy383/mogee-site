import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useLang, t, Lang } from '../contexts/LanguageContext';
import { Post } from '../components/BlogCard';
import SEOHead from '../components/SEOHead';
import CommentSection from '../components/CommentSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'style', 'link'],
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className'],
    '*': [...(defaultSchema.attributes?.['*'] || []), 'style', 'className'],
    link: ['href', 'rel', 'type'],
  },
};

const LANG_INFO: Record<Lang, { flag: string; label: string }> = {
  ko: { flag: 'KO', label: '한국어' },
  en: { flag: 'EN', label: 'English' },
  ja: { flag: 'JA', label: '日本語' },
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
  const [copied, setCopied] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const viewedRef = React.useRef(false);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const snap = await getDoc(doc(db, 'posts', id));
        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() } as Post;
          setPost(data);
          setLikeCount(data.likes ?? 0);
          setLiked(!!localStorage.getItem(`liked_post_${snap.id}`));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!id || viewedRef.current) return;
    viewedRef.current = true;
    updateDoc(doc(db, 'posts', id), { views: increment(1) }).catch(() => {});
  }, [id]);

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

  const canonicalUrl = `https://mogee.org/post/${id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('input');
      el.value = canonicalUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = async () => {
    if (!id || liked) return;
    setLiked(true);
    setLikeCount((n) => n + 1);
    localStorage.setItem(`liked_post_${id}`, '1');
    updateDoc(doc(db, 'posts', id), { likes: increment(1) }).catch(() => {});
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: displayTitle ?? '', url: canonicalUrl });
    } catch {}
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

  /* --- Loading skeleton --- */
  if (loading) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--wh)', paddingTop: '112px' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px' }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                background: 'var(--of)',
                border: '2px solid var(--pn)',
                height: i === 0 ? '24px' : '14px',
                width: i === 0 ? '66%' : i === 1 ? '33%' : '100%',
                marginBottom: i === 1 ? '24px' : '10px',
              }}
            />
          ))}
        </div>
      </main>
    );
  }

  /* --- 404 error window --- */
  if (!post) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--wh)', paddingTop: '112px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ border: '2px solid var(--or)', boxShadow: '6px 6px 0 var(--or)', width: '360px', maxWidth: '90vw' }}>
          <div style={{ background: 'var(--or)', padding: '6px 12px', borderBottom: '2px solid var(--or)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--wh)', letterSpacing: '0.12em' }}>ERROR 404</span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--wh)' }}>[X]</span>
          </div>
          <div style={{ padding: '32px 24px', textAlign: 'center', background: 'var(--obg)' }}>
            <p style={{ fontFamily: 'var(--fh)', fontSize: '20px', fontWeight: 700, color: 'var(--or)', marginBottom: '12px' }}>
              {t(lang, 'postNotFound')}
            </p>
            <Link
              to="/"
              style={{ fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--bl)', textDecoration: 'underline' }}
            >
              {'<< '}{t(lang, 'goHome')}
            </Link>
          </div>
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

  const seoDescription = (() => {
    const raw = displayContent.replace(/[#*`>\-_[\]()]/g, '').trim();
    return raw.length > 160 ? raw.slice(0, 157) + '...' : raw;
  })();

  const publishedIso = post.createdAt?.toDate
    ? post.createdAt.toDate().toISOString()
    : undefined;

  const postJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: displayTitle,
    description: seoDescription,
    url: `https://mogee.org/post/${post.id}`,
    datePublished: publishedIso,
    author: { '@type': 'Person', name: 'Mogee Development', url: 'https://mogee.org' },
    publisher: { '@type': 'Organization', name: 'Mogee Development', url: 'https://mogee.org' },
    keywords: displayTags?.join(', '),
  };

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--fm)',
    fontSize: '11px',
    letterSpacing: '0.06em',
    padding: '6px 14px',
    border: '2px solid var(--dk)',
    background: 'var(--wh)',
    color: 'var(--dk)',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'transform 0.1s, box-shadow 0.1s',
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--wh)' }}>
      <SEOHead
        title={displayTitle}
        description={seoDescription}
        ogType="article"
        canonicalPath={`/post/${post.id}`}
        publishedAt={publishedIso}
        tags={displayTags}
        jsonLd={postJsonLd}
      />

      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '112px 24px 80px' }}>
        {/* Back */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--fm)',
            fontSize: '12px',
            color: 'var(--bl)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '24px',
            letterSpacing: '0.06em',
          }}
        >
          {'<< BACK'}
        </Link>

        {/* Tags */}
        {displayTags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {displayTags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  border: '2px solid var(--bl)',
                  background: 'var(--bbg)',
                  color: 'var(--bl)',
                  boxShadow: '2px 2px 0 var(--bl)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 32px)', color: 'var(--dk)', lineHeight: 1.2, marginBottom: '12px' }}>
          {displayTitle}
        </h1>

        {/* Meta + Admin */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', marginBottom: '16px', borderBottom: '2px solid var(--dk)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--bl)', letterSpacing: '0.06em' }}>
            <span>DATE: {formatDate(post.createdAt)}</span>
            <span>TIME: {readLabel}</span>
            <span>VIEWS: {(post.views ?? 0).toLocaleString()}</span>
          </div>

          {user && (
            <div style={{ display: 'flex', gap: '6px' }}>
              <Link to={`/admin?edit=${post.id}`} style={{ ...btnBase, fontSize: '10px', padding: '4px 10px' }}>
                [E] {t(lang, 'edit')}
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{ ...btnBase, fontSize: '10px', padding: '4px 10px', borderColor: 'var(--or)', color: 'var(--or)' }}
              >
                [X] {t(lang, 'delete')}
              </button>
            </div>
          )}
        </div>

        {/* Language tabs */}
        {availableLangs.length > 1 && (
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
            {availableLangs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  padding: '5px 14px',
                  border: '2px solid var(--dk)',
                  background: lang === l ? 'var(--bm)' : 'var(--wh)',
                  color: lang === l ? 'var(--wh)' : 'var(--dk)',
                  cursor: 'pointer',
                  boxShadow: lang === l ? '2px 2px 0 var(--bl)' : 'none',
                }}
              >
                {LANG_INFO[l].flag} {LANG_INFO[l].label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          key={lang}
          className="prose prose-gray max-w-none prose-headings:font-bold"
          style={{
            fontFamily: 'var(--fb)',
            color: 'var(--dk)',
          }}
        >
          <style>{`
            .prose h1,.prose h2,.prose h3,.prose h4{font-family:var(--fh);color:var(--dk)}
            .prose p{color:var(--dk);opacity:0.85;line-height:1.75}
            .prose a{color:var(--bm);text-decoration:underline}
            .prose code{font-family:var(--fm);color:var(--bl);background:var(--bbg);padding:2px 6px}
            .prose pre{background:var(--dk);color:var(--wh);border:2px solid var(--dk);box-shadow:4px 4px 0 var(--bl)}
            .prose blockquote{border-left:4px solid var(--bm);color:var(--dk);opacity:0.7;background:var(--of);padding:8px 16px;margin-left:0}
            .prose img{border:2px solid var(--dk);box-shadow:4px 4px 0 var(--dk)}
          `}</style>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}>
            {displayContent}
          </ReactMarkdown>
        </div>

        {/* Like */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleLike}
            disabled={liked}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '16px 32px',
              border: `2px solid ${liked ? 'var(--or)' : 'var(--dk)'}`,
              background: liked ? 'var(--obg)' : 'var(--wh)',
              color: liked ? 'var(--or)' : 'var(--dk)',
              boxShadow: `4px 4px 0 ${liked ? 'var(--or)' : 'var(--dk)'}`,
              cursor: liked ? 'default' : 'pointer',
              fontFamily: 'var(--fm)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ fontSize: '20px' }}>{liked ? '[*]' : '[ ]'}</span>
            <span style={{ fontSize: '12px' }}>{likeCount > 0 ? likeCount.toLocaleString() : t(lang, 'likes')}</span>
          </button>
        </div>

        {/* Share */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid var(--dk)' }}>
          <p style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
            {t(lang, 'sharePost')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={handleCopyLink}
              style={{
                ...btnBase,
                borderColor: copied ? 'var(--bm)' : 'var(--dk)',
                background: copied ? 'var(--bbg)' : 'var(--wh)',
                color: copied ? 'var(--bl)' : 'var(--dk)',
                boxShadow: '3px 3px 0 var(--dk)',
              }}
            >
              [#] {copied ? t(lang, 'copied') : t(lang, 'copyLink')}
            </button>

            {canNativeShare && (
              <button onClick={handleNativeShare} style={{ ...btnBase, boxShadow: '3px 3px 0 var(--dk)' }}>
                [&gt;] {t(lang, 'shareVia')}
              </button>
            )}

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(displayTitle)}&url=${encodeURIComponent(canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnBase, boxShadow: '3px 3px 0 var(--dk)' }}
            >
              [X] {t(lang, 'shareTwitter')}
            </a>
          </div>
        </div>

        {/* Comments */}
        <CommentSection postId={post.id} />
      </div>
    </main>
  );
};

export default PostDetail;
