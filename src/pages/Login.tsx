import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate('/admin');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않아요.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--fb)',
    fontSize: '13px',
    padding: '10px 14px',
    border: '2px solid var(--dk)',
    background: 'var(--wh)',
    color: 'var(--dk)',
    boxShadow: 'inset 2px 2px 0 var(--pn)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--wh)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        {/* Window frame */}
        <div style={{ border: '3px solid var(--dk)', boxShadow: '6px 6px 0 var(--dk)', background: 'var(--wh)' }}>
          {/* Title bar */}
          <div style={{ background: 'var(--bm)', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid var(--dk)' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--wh)', letterSpacing: '0.12em' }}>
              ADMIN LOGIN
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['_', '[ ]', 'X'].map((sym) => (
                <span key={sym} style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--wh)', padding: '1px 6px', border: '1px solid rgba(255,255,255,0.4)', cursor: 'default' }}>
                  {sym}
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '28px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                fontFamily: 'var(--fm)',
                fontSize: '28px',
                color: 'var(--bm)',
                marginBottom: '8px',
                letterSpacing: '0.04em',
              }}>
                [*]
              </div>
              <h1 style={{ fontFamily: 'var(--fh)', fontSize: '22px', fontWeight: 700, color: 'var(--dk)', marginBottom: '4px' }}>
                관리자 로그인
              </h1>
              <p style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--dk)', opacity: 0.5, letterSpacing: '0.04em' }}>
                블로그 관리자만 접근할 수 있어요
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--bl)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--bm)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--dk)'; }}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--bl)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  PASSWORD
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{ ...inputStyle, paddingRight: '42px' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--bm)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--dk)'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontFamily: 'var(--fm)',
                      fontSize: '10px',
                      color: 'var(--bl)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    {showPw ? '[X]' : '[O]'}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '11px',
                  padding: '10px 14px',
                  border: '2px solid var(--or)',
                  background: 'var(--obg)',
                  color: 'var(--or)',
                }}>
                  [!] {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  padding: '12px',
                  border: '2px solid var(--bl)',
                  background: 'var(--bm)',
                  color: 'var(--wh)',
                  boxShadow: '4px 4px 0 var(--bl)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  width: '100%',
                  textTransform: 'uppercase',
                }}
              >
                {loading ? 'LOGGING IN...' : 'LOGIN >>'}
              </button>
            </form>
          </div>

          {/* Status bar */}
          <div style={{ background: 'var(--pn)', borderTop: '3px solid var(--dk)', padding: '4px 12px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--dk)', letterSpacing: '0.08em', opacity: 0.7 }}>
              SECURE CONNECTION
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', letterSpacing: '0.08em' }}>
              [*] HTTPS
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
