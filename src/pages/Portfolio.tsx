import React, { useEffect, useState } from 'react';
import { collection, getDocsFromServer } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useLang, t, Lang } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';

interface AppData {
  id: string;
  title: string;
  packageName: string;
  logo?: string;
  icon?: string;
  primaryColor: string;
  description: Record<Lang, string>;
  features: Record<Lang, string[]>;
  privacyPolicyUrl?: string;
  websiteUrl?: string;
  appStoreUrl?: string;
  order?: number;
}

const btnStyle: React.CSSProperties = {
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
};

const AppCard: React.FC<{ app: AppData; lang: Lang }> = ({ app, lang }) => {
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${app.packageName}`;
  const isWeb = !app.packageName.startsWith('com.');

  return (
    <div
      style={{
        border: '2px solid var(--dk)',
        boxShadow: '5px 5px 0 var(--dk)',
        background: 'var(--wh)',
        padding: '20px',
        transition: 'transform 0.12s, box-shadow 0.12s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translate(-3px, -3px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0 var(--dk)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 var(--dk)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'start', gap: '14px', marginBottom: '14px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            border: '2px solid var(--dk)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            overflow: 'hidden',
            backgroundColor: app.logo ? 'transparent' : `${app.primaryColor}18`,
          }}
        >
          {app.logo ? (
            <img src={app.logo} alt={app.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          ) : (
            app.icon
          )}
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--fh)', fontSize: '16px', fontWeight: 700, color: 'var(--dk)' }}>
            {app.title}
          </h3>
          <p style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', marginTop: '2px', letterSpacing: '0.04em' }}>
            {app.packageName}
          </p>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontFamily: 'var(--fb)', fontSize: '13px', color: 'var(--dk)', opacity: 0.7, lineHeight: 1.5, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {app.description[lang]}
      </p>

      {/* Features */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {app.features[lang].map((f, i) => (
          <li key={i} style={{ fontFamily: 'var(--fb)', fontSize: '12px', color: 'var(--dk)', opacity: 0.8, display: 'flex', alignItems: 'start', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--fm)', color: app.primaryColor, fontWeight: 700, flexShrink: 0 }}>[*]</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {isWeb && app.websiteUrl ? (
          <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer"
            style={{ ...btnStyle, background: app.primaryColor, color: 'var(--wh)', borderColor: 'var(--dk)', boxShadow: '3px 3px 0 var(--dk)', flex: 1, justifyContent: 'center' }}>
            [&gt;] {t(lang, 'website')}
          </a>
        ) : (
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer"
            style={{ ...btnStyle, background: app.primaryColor, color: 'var(--wh)', borderColor: 'var(--dk)', boxShadow: '3px 3px 0 var(--dk)', flex: 1, justifyContent: 'center' }}>
            [v] Google Play
          </a>
        )}
        {app.appStoreUrl && (
          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer"
            style={{ ...btnStyle, background: 'var(--dk)', color: 'var(--wh)', boxShadow: '3px 3px 0 var(--bl)' }}>
            App Store
          </a>
        )}
        {app.privacyPolicyUrl && (
          <a href={app.privacyPolicyUrl} target="_blank" rel="noopener noreferrer"
            style={{ ...btnStyle, padding: '6px 10px' }} title={t(lang, 'privacyPolicy')}>
            [i]
          </a>
        )}
        {app.websiteUrl && !isWeb && (
          <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer"
            style={{ ...btnStyle, padding: '6px 10px' }} title={t(lang, 'website')}>
            [&gt;]
          </a>
        )}
      </div>
    </div>
  );
};

const SkeletonCard: React.FC = () => (
  <div style={{ background: 'var(--of)', border: '2px solid var(--pn)', padding: '20px' }}>
    <div style={{ display: 'flex', alignItems: 'start', gap: '14px', marginBottom: '14px' }}>
      <div style={{ width: '56px', height: '56px', background: 'var(--pn)', border: '2px solid var(--pn)', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: '14px', background: 'var(--pn)', width: '66%', marginBottom: '6px' }} />
        <div style={{ height: '10px', background: 'var(--pn)', width: '50%' }} />
      </div>
    </div>
    <div style={{ height: '10px', background: 'var(--pn)', width: '100%', marginBottom: '6px' }} />
    <div style={{ height: '10px', background: 'var(--pn)', width: '80%', marginBottom: '14px' }} />
    <div style={{ height: '30px', background: 'var(--pn)', width: '100%' }} />
  </div>
);

const Portfolio: React.FC = () => {
  const { lang } = useLang();
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const snap = await getDocsFromServer(collection(db, 'portfolio'));
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AppData[];
        data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setApps(data);
      } catch (e) {
        console.error('포트폴리오 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const portfolioJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio | Mogee Development',
    description: 'Flutter 앱 및 웹 서비스 포트폴리오.',
    url: 'https://mogee.org/portfolio',
    author: { '@type': 'Person', name: 'Mogee Development', url: 'https://mogee.org' },
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--wh)' }}>
      <SEOHead
        title="Portfolio"
        description="Flutter 앱 및 웹 서비스 포트폴리오. Mogee Development가 만든 프로젝트들을 확인하세요."
        canonicalPath="/portfolio"
        jsonLd={portfolioJsonLd}
      />

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '112px 24px 80px' }}>
        {/* Window Frame Header */}
        <div style={{ border: '2px solid var(--dk)', boxShadow: '6px 6px 0 var(--dk)', marginBottom: '32px', background: 'var(--wh)' }}>
          {/* Title bar */}
          <div style={{ background: 'var(--bm)', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--dk)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--wh)', letterSpacing: '0.12em' }}>
                [#] PORTFOLIO.EXE
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

          {/* Body */}
          <div style={{ padding: '24px 28px' }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '0.18em', color: 'var(--bl)', textTransform: 'uppercase', marginBottom: '8px' }}>
              {'// APPS & SERVICES'}
            </div>
            <h1 style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: 'var(--dk)', lineHeight: 1.1, marginBottom: '8px' }}>
              {t(lang, 'portfolioTitle')}
            </h1>
            <p style={{ fontFamily: 'var(--fb)', fontSize: '14px', color: 'var(--dk)', opacity: 0.65 }}>
              {loading ? '...' : t(lang, 'portfolioSubtitle', apps.length)}
            </p>
          </div>

          {/* Status bar */}
          <div style={{ background: 'var(--of)', borderTop: '2px solid var(--dk)', padding: '4px 12px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', letterSpacing: '0.08em' }}>READY</span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--dk)', letterSpacing: '0.08em', opacity: 0.6 }}>
              {loading ? 'LOADING...' : `${apps.length} APPS`}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : apps.map((app) => <AppCard key={app.id} app={app} lang={lang} />)
          }
        </div>

        {/* Status badge */}
        {!loading && (
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              fontFamily: 'var(--fm)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              padding: '6px 16px',
              border: '2px solid var(--bm)',
              background: 'var(--bbg)',
              color: 'var(--bl)',
              boxShadow: '2px 2px 0 var(--bl)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--bm)', display: 'inline-block' }} />
              {t(lang, 'activelyDev')}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Portfolio;
