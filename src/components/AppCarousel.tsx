import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocsFromServer } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useLang, t, Lang } from '../contexts/LanguageContext';

interface AppData {
  id: string;
  title: string;
  packageName: string;
  logo?: string;
  icon?: string;
  primaryColor: string;
  description: Record<Lang, string>;
  features: Record<Lang, string[]>;
  websiteUrl?: string;
  appStoreUrl?: string;
  order?: number;
}

const INTERVAL = 3500;

const AppCarousel: React.FC = () => {
  const { lang } = useLang();
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const snap = await getDocsFromServer(collection(db, 'portfolio'));
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AppData[];
        data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setApps(data);
      } catch (e) {
        console.error('carousel 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const go = useCallback((next: number) => {
    setIndex((next + apps.length) % apps.length);
    setProgress(0);
  }, [apps.length]);

  /* Auto-advance + progress */
  useEffect(() => {
    if (paused || apps.length === 0) return;
    const step = 50;
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + (step / INTERVAL) * 100;
        if (next >= 100) {
          go(index + 1);
          return 0;
        }
        return next;
      });
    }, step);
    return () => clearInterval(timer);
  }, [index, paused, go, apps.length]);

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
  };

  if (loading) {
    return (
      <section style={{ marginTop: '60px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--bl)', textTransform: 'uppercase' }}>
            [#] {t(lang, 'portfolio')}
          </span>
        </div>
        <div style={{ border: '2px solid var(--pn)', background: 'var(--of)', height: '176px' }} />
      </section>
    );
  }

  if (apps.length === 0) return null;

  const app = apps[index];
  const isWeb = !app.packageName.startsWith('com.');
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${app.packageName}`;
  const desc = app.description?.[lang] ?? app.description?.ko ?? '';

  return (
    <section style={{ marginTop: '60px', marginBottom: '16px' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--bl)', textTransform: 'uppercase' }}>
            [#] {t(lang, 'portfolio')}
          </span>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--dk)', opacity: 0.5 }}>
            {t(lang, 'portfolioSubtitle', apps.length)}
          </span>
        </div>
        <Link
          to="/portfolio"
          style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--or)', textDecoration: 'none', letterSpacing: '0.06em' }}
        >
          {t(lang, 'viewAll')} {'>>'}
        </Link>
      </div>

      {/* Carousel card */}
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            border: '2px solid var(--dk)',
            boxShadow: '5px 5px 0 var(--dk)',
            background: 'var(--wh)',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'start', gap: '14px' }}>
            {/* Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                border: '2px solid var(--dk)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                overflow: 'hidden',
                backgroundColor: app.logo ? 'transparent' : `${app.primaryColor}22`,
              }}
            >
              {app.logo ? (
                <img src={app.logo} alt={app.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                app.icon
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '18px', color: 'var(--dk)', lineHeight: 1.2 }}>
                {app.title}
              </h3>
              <p style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', marginTop: '2px', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {app.packageName}
              </p>
              <p style={{ fontFamily: 'var(--fb)', fontSize: '13px', color: 'var(--dk)', opacity: 0.7, marginTop: '10px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {desc}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
            {isWeb && app.websiteUrl ? (
              <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer"
                style={{ ...btnBase, background: app.primaryColor, color: 'var(--wh)', borderColor: 'var(--dk)', boxShadow: '3px 3px 0 var(--dk)' }}>
                [&gt;] {t(lang, 'website')}
              </a>
            ) : (
              <a href={playStoreUrl} target="_blank" rel="noopener noreferrer"
                style={{ ...btnBase, background: app.primaryColor, color: 'var(--wh)', borderColor: 'var(--dk)', boxShadow: '3px 3px 0 var(--dk)' }}>
                [v] Google Play
              </a>
            )}
            {app.websiteUrl && !isWeb && (
              <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer"
                style={{ ...btnBase, boxShadow: '3px 3px 0 var(--dk)' }}>
                [&gt;] {t(lang, 'website')}
              </a>
            )}
            {app.appStoreUrl && (
              <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer"
                style={{ ...btnBase, background: 'var(--dk)', color: 'var(--wh)', boxShadow: '3px 3px 0 var(--bl)' }}>
                App Store
              </a>
            )}
          </div>
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={() => go(index - 1)}
          style={{
            position: 'absolute',
            left: '-12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            border: '2px solid var(--dk)',
            background: 'var(--wh)',
            fontFamily: 'var(--fm)',
            fontSize: '12px',
            color: 'var(--dk)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 2px 0 var(--dk)',
          }}
        >
          {'<<'}
        </button>
        <button
          onClick={() => go(index + 1)}
          style={{
            position: 'absolute',
            right: '-12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            border: '2px solid var(--dk)',
            background: 'var(--wh)',
            fontFamily: 'var(--fm)',
            fontSize: '12px',
            color: 'var(--dk)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 2px 0 var(--dk)',
          }}
        >
          {'>>'}
        </button>
      </div>

      {/* Square indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
        {apps.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === index ? '20px' : '8px',
              height: '8px',
              border: '2px solid var(--dk)',
              background: i === index ? 'var(--bm)' : 'var(--of)',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.2s',
            }}
          />
        ))}
      </div>

      {/* RETRO progress bar */}
      {!paused && (
        <div style={{ marginTop: '8px', height: '6px', border: '2px solid var(--dk)', background: 'var(--of)', marginLeft: '4px', marginRight: '4px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: `repeating-linear-gradient(
                -45deg,
                var(--bm),
                var(--bm) 3px,
                var(--bl3) 3px,
                var(--bl3) 6px
              )`,
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      )}
    </section>
  );
};

export default AppCarousel;
