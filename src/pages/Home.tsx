import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { db } from '../firebase/config';
import BlogCard, { Post } from '../components/BlogCard';
import AppCarousel from '../components/AppCarousel';
import SEOHead from '../components/SEOHead';
import { useLang, t } from '../contexts/LanguageContext';
import { TBOT_GIF } from '../assets/tbot';

const Home: React.FC = () => {
  const { lang } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const TAG_LIMIT = 20;

  const selectedTag = searchParams.get('tag');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post));
        setPosts(data);
      } catch {
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getPostTags = (p: Post) =>
    lang === 'en' && p.tags_en?.length ? p.tags_en :
    lang === 'ja' && p.tags_ja?.length ? p.tags_ja :
    p.tags || [];

  const allTags = Array.from(new Set(posts.flatMap(getPostTags)));
  const visibleTags = showAllTags ? allTags : allTags.slice(0, TAG_LIMIT);
  const hasMoreTags = allTags.length > TAG_LIMIT;
  const filtered = selectedTag
    ? posts.filter((p) => getPostTags(p).includes(selectedTag))
    : posts;

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Mogee Development',
    url: 'https://mogee.org',
    description: 'Flutter 앱 개발 블로그. AI, 앱 개발, 기술 이야기를 공유합니다.',
    author: {
      '@type': 'Person',
      name: 'Mogee Development',
      url: 'https://mogee.org',
    },
  };

  const tagBtnActive: React.CSSProperties = {
    fontFamily: 'var(--fm)',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    border: '2px solid var(--bl)',
    background: 'var(--bm)',
    color: 'var(--wh)',
    cursor: 'pointer',
    boxShadow: '2px 2px 0 var(--bl)',
  };

  const tagBtnInactive: React.CSSProperties = {
    fontFamily: 'var(--fm)',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    border: '2px solid var(--dk)',
    background: 'var(--wh)',
    color: 'var(--dk)',
    cursor: 'pointer',
  };

  const tagBtnMore: React.CSSProperties = {
    fontFamily: 'var(--fm)',
    fontSize: '11px',
    letterSpacing: '0.08em',
    padding: '4px 10px',
    border: '2px dashed var(--pn)',
    background: 'transparent',
    color: 'var(--dk)',
    cursor: 'pointer',
    opacity: 0.7,
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--wh)' }}>
      <SEOHead canonicalPath="/" jsonLd={homeJsonLd} />

      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '88px 24px 80px' }}>

        {/* App Window Header */}
        <div style={{ border: '2px solid var(--dk)', boxShadow: '6px 6px 0 var(--dk)', marginBottom: '40px', background: 'var(--wh)' }}>
          {/* Title bar */}
          <div style={{ background: 'var(--bm)', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--dk)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={TBOT_GIF} alt="TBOT" className="tbot" style={{ width: 24, height: 32 }} />
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--wh)', letterSpacing: '0.12em' }}>
                MOGEE.ORG &mdash; BLOG.EXE
              </span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['_', '[ ]', 'X'].map((sym) => (
                <span key={sym} style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--wh)', padding: '1px 6px', border: '1px solid rgba(255,255,255,0.4)', cursor: 'default' }}>
                  {sym}
                </span>
              ))}
            </div>
          </div>

          {/* Window body */}
          <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '0.18em', color: 'var(--bl)', textTransform: 'uppercase', marginBottom: '8px' }}>
                {'// DEVELOPER BLOG'}
              </div>
              <h1 style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: 'var(--dk)', lineHeight: 1.1, marginBottom: '8px' }}>
                {t(lang, 'homeTitle')}
              </h1>
              <p style={{ fontFamily: 'var(--fb)', fontSize: '14px', color: 'var(--dk)', opacity: 0.65 }}>
                {t(lang, 'homeSubtitle')}
              </p>
            </div>
            <div className="tbot-bounce" style={{ flexShrink: 0 }}>
              <img src={TBOT_GIF} alt="TBOT mascot" className="tbot" style={{ width: 48, height: 64 }} />
            </div>
          </div>

          {/* Status bar */}
          <div style={{ background: 'var(--of)', borderTop: '2px solid var(--dk)', padding: '4px 12px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', letterSpacing: '0.08em' }}>
              READY
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--dk)', letterSpacing: '0.08em', opacity: 0.6 }}>
              {loading ? 'LOADING...' : `${posts.length} POSTS LOADED`}
            </span>
          </div>
        </div>

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
            <button
              onClick={() => setSearchParams({})}
              style={!selectedTag ? tagBtnActive : tagBtnInactive}
            >
              {t(lang, 'all')}
            </button>
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchParams(selectedTag === tag ? {} : { tag })}
                style={selectedTag === tag ? tagBtnActive : tagBtnInactive}
              >
                #{tag}
              </button>
            ))}
            {hasMoreTags && (
              <button onClick={() => setShowAllTags((v) => !v)} style={tagBtnMore}>
                {showAllTags ? '[-] COLLAPSE' : `[+] +${allTags.length - TAG_LIMIT} MORE`}
              </button>
            )}
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ background: 'var(--of)', border: '2px solid var(--pn)', padding: '20px' }}>
                <div style={{ height: '12px', background: 'var(--pn)', width: '25%', marginBottom: '10px' }} />
                <div style={{ height: '18px', background: 'var(--pn)', width: '70%', marginBottom: '8px' }} />
                <div style={{ height: '12px', background: 'var(--pn)', width: '100%', marginBottom: '6px' }} />
                <div style={{ height: '12px', background: 'var(--pn)', width: '60%' }} />
              </div>
            ))}
          </div>
        ) : fetchError ? (
          <div style={{ border: '2px solid var(--or)', boxShadow: '4px 4px 0 var(--or)', background: 'var(--obg)' }}>
            <div style={{ background: 'var(--or)', padding: '6px 12px', borderBottom: '2px solid var(--or)' }}>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--wh)', letterSpacing: '0.12em' }}>
                ERROR.EXE
              </span>
            </div>
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--fh)', fontSize: '18px', fontWeight: 700, color: 'var(--or)', marginBottom: '4px' }}>
                {t(lang, 'loadError')}
              </p>
              <p style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--dk)', opacity: 0.6 }}>
                {t(lang, 'loadErrorHint')}
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="tbot-walk" style={{ display: 'inline-block', marginBottom: '16px' }}>
              <img src={TBOT_GIF} alt="TBOT" className="tbot" style={{ width: 64, height: 85 }} />
            </div>
            <p style={{ fontFamily: 'var(--fh)', fontSize: '18px', fontWeight: 700, color: 'var(--dk)', marginBottom: '4px' }}>
              {t(lang, 'noPosts')}
            </p>
            <p style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--dk)', opacity: 0.5 }}>
              {t(lang, 'noPostsHint')}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* App Carousel */}
        <AppCarousel />
      </div>
    </main>
  );
};

export default Home;
