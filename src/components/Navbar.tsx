import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLang, t, Lang } from '../contexts/LanguageContext';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JA' },
];

const nbStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  background: 'var(--of)',
  borderBottom: '3px solid var(--dk)',
  boxShadow: '0 4px 0 var(--bm)',
};

const logoStyle: React.CSSProperties = {
  fontFamily: 'var(--fh)',
  fontSize: '22px',
  fontWeight: 700,
  color: 'var(--dk)',
  textTransform: 'uppercase',
  letterSpacing: '-0.5px',
  textDecoration: 'none',
};

const navLinkBase: React.CSSProperties = {
  fontFamily: 'var(--fh)',
  fontSize: '13px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  padding: '6px 14px',
  textDecoration: 'none',
  transition: 'background 0.1s, color 0.1s',
  cursor: 'pointer',
  display: 'inline-block',
};

const navLinkActive: React.CSSProperties = {
  ...navLinkBase,
  background: 'var(--bm)',
  color: 'var(--wh)',
  border: '2px solid var(--bl)',
};

const navLinkInactive: React.CSSProperties = {
  ...navLinkBase,
  background: 'transparent',
  color: 'var(--dk)',
  border: '2px solid transparent',
};

const btnStyle: React.CSSProperties = {
  fontFamily: 'var(--fm)',
  fontSize: '10px',
  letterSpacing: '0.06em',
  padding: '5px 10px',
  border: '2px solid var(--dk)',
  background: 'transparent',
  color: 'var(--dk)',
  cursor: 'pointer',
  transition: 'background 0.1s, color 0.1s',
};

const btnActiveStyle: React.CSSProperties = {
  ...btnStyle,
  background: 'var(--bm)',
  color: 'var(--wh)',
  borderColor: 'var(--bl)',
};

const adminBtnStyle: React.CSSProperties = {
  fontFamily: 'var(--fh)',
  fontSize: '13px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  padding: '6px 14px',
  background: 'var(--bm)',
  color: 'var(--wh)',
  border: '2px solid var(--bl)',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  boxShadow: '1px 0 0 0 var(--dk), 0 1px 0 0 var(--dk), 2px 1px 0 0 var(--dk), 1px 2px 0 0 var(--dk), 4px 4px 0 0 var(--dk)',
};

const iconBtnStyle: React.CSSProperties = {
  fontFamily: 'var(--fm)',
  fontSize: '12px',
  padding: '5px 10px',
  background: 'transparent',
  color: 'var(--dk)',
  border: '2px solid var(--dk)',
  cursor: 'pointer',
};

const hamburgerStyle: React.CSSProperties = {
  fontFamily: 'var(--fm)',
  fontSize: '14px',
  padding: '5px 10px',
  background: 'transparent',
  color: 'var(--dk)',
  border: '2px solid var(--dk)',
  cursor: 'pointer',
};

const mobileMenuStyle: React.CSSProperties = {
  background: 'var(--of)',
  border: '2px solid var(--dk)',
  borderTop: 'none',
  boxShadow: '4px 4px 0 var(--dk)',
  padding: '12px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/', label: t(lang, 'blog') },
    { href: '/portfolio', label: t(lang, 'portfolio') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header style={nbStyle}>
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={logoStyle}>
          mogee<span style={{ color: 'var(--bm)' }}>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '4px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              style={isActive(link.href) ? navLinkActive : navLinkInactive}
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: '8px', marginRight: '8px' }}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={lang === l.code ? btnActiveStyle : btnStyle}
              >
                {l.label}
              </button>
            ))}
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Link to="/admin" style={adminBtnStyle}>
                <span>[+]</span>
                {t(lang, 'write')}
              </Link>
              <button onClick={logout} style={iconBtnStyle} title={t(lang, 'logout')}>
                [&lt;]
              </button>
            </div>
          ) : (
            <Link to="/login" style={iconBtnStyle} title={t(lang, 'adminLogin')}>
              [&gt;]
            </Link>
          )}
        </nav>

        {/* Mobile right side */}
        <div className="md:hidden" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={lang === l.code ? btnActiveStyle : btnStyle}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '[X]' : '[=]'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.12 }}
            className="md:hidden"
            style={mobileMenuStyle}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={isActive(link.href) ? { ...navLinkActive, display: 'block' } : { ...navLinkInactive, display: 'block' }}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/admin" style={{ ...adminBtnStyle, justifyContent: 'flex-start' }}>
                  <span>[+]</span>
                  {t(lang, 'write')}
                </Link>
                <button
                  onClick={logout}
                  style={{ ...iconBtnStyle, textAlign: 'left', width: '100%' }}
                >
                  [&lt;] {t(lang, 'logout')}
                </button>
              </>
            ) : (
              <Link to="/login" style={{ ...iconBtnStyle, display: 'block' }}>
                [&gt;] {t(lang, 'adminLogin')}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
