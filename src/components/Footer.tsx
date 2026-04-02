import React from 'react';
import { Link } from 'react-router-dom';
import { useLang, t } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '3px solid var(--dk)', background: 'var(--pn)', marginTop: '96px' }}>
      {/* Main area */}
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '32px 24px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          {/* Left: logo + description */}
          <div>
            <div style={{ fontFamily: 'var(--fh)', fontSize: '20px', fontWeight: 700, color: 'var(--dk)', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
              mogee<span style={{ color: 'var(--bm)' }}>.</span>
            </div>
            <p style={{ fontFamily: 'var(--fb)', fontSize: '12px', color: 'var(--dk)', opacity: 0.6, marginTop: '6px', maxWidth: '200px' }}>
              Flutter 기반 모바일 앱 개발자의 블로그
            </p>
          </div>

          {/* Center: nav links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            {[
              { to: '/', label: t(lang, 'blog') },
              { to: '/portfolio', label: t(lang, 'portfolio') },
              { to: '/privacy', label: t(lang, 'privacyPolicy') },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  fontFamily: 'var(--fh)',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '4px 12px',
                  border: '2px solid var(--dk)',
                  background: 'transparent',
                  color: 'var(--dk)',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: social buttons */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <a
              href="https://github.com/smy383"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--fm)',
                fontSize: '11px',
                padding: '5px 12px',
                border: '2px solid var(--dk)',
                background: 'var(--wh)',
                color: 'var(--dk)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '2px 2px 0 var(--dk)',
              }}
            >
              [GH] GitHub
            </a>
            <a
              href="mailto:thewinnerple@gmail.com"
              style={{
                fontFamily: 'var(--fm)',
                fontSize: '11px',
                padding: '5px 12px',
                border: '2px solid var(--dk)',
                background: 'var(--wh)',
                color: 'var(--dk)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '2px 2px 0 var(--dk)',
              }}
            >
              [E] Email
            </a>
          </div>
        </div>
      </div>

      {/* Stripe divider */}
      <div style={{ height: '4px', background: 'repeating-linear-gradient(90deg, var(--dk) 0, var(--dk) 8px, var(--bm) 8px, var(--bm) 16px)' }} />

      {/* Status bar */}
      <div style={{ background: 'var(--dk)', color: 'var(--bm)', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '0.08em' }}>
          C:\&gt; MOGEE.ORG
        </span>
        <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', letterSpacing: '0.08em' }}>
          &copy; {year} MOGEE.DEV
        </span>
      </div>
    </footer>
  );
};

export default Footer;
