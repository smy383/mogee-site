import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useLang, t } from '../contexts/LanguageContext';

interface Comment {
  id: string;
  nickname: string;
  content: string;
  createdAt: any;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { lang } = useLang();
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, 'posts', postId, 'comments'),
          orderBy('createdAt', 'asc')
        );
        const snap = await getDocs(q);
        setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment)));
      } catch {}
    };
    fetchComments();
  }, [postId]);

  const formatDate = (ts: any) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    const locale = lang === 'en' ? 'en-US' : lang === 'ja' ? 'ja-JP' : 'ko-KR';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !content.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const docRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
        nickname: nickname.trim(),
        content: content.trim(),
        createdAt: serverTimestamp(),
      });
      setComments((prev) => [
        ...prev,
        { id: docRef.id, nickname: nickname.trim(), content: content.trim(), createdAt: new Date() },
      ]);
      setContent('');
    } catch {
      setError(t(lang, 'commentError'));
    } finally {
      setSubmitting(false);
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
    <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid var(--dk)' }}>
      {/* Header */}
      <h3 style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--fm)',
        fontSize: '12px',
        letterSpacing: '0.08em',
        color: 'var(--dk)',
        marginBottom: '16px',
      }}>
        <span style={{ color: 'var(--bl)' }}>[&gt;]</span>
        {t(lang, 'comments')}
        {comments.length > 0 && (
          <span style={{
            fontFamily: 'var(--fm)',
            fontSize: '10px',
            padding: '2px 8px',
            border: '2px solid var(--bl)',
            background: 'var(--bm)',
            color: 'var(--wh)',
            boxShadow: '2px 2px 0 var(--bl)',
          }}>
            {comments.length}
          </span>
        )}
      </h3>

      {/* Comment list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {comments.length === 0 ? (
          <p style={{ fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--dk)', opacity: 0.5 }}>
            {t(lang, 'commentEmpty')}
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              style={{
                border: '2px solid var(--pn)',
                background: 'var(--of)',
                padding: '12px 14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--fh)', fontSize: '14px', fontWeight: 700, color: 'var(--dk)' }}>
                  {c.nickname}
                </span>
                <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', letterSpacing: '0.04em' }}>
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--fb)', fontSize: '13px', color: 'var(--dk)', opacity: 0.85, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {c.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t(lang, 'nicknamePlaceholder')}
          maxLength={20}
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--bm)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--dk)';
          }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t(lang, 'commentPlaceholder')}
            rows={3}
            maxLength={500}
            style={{ ...inputStyle, resize: 'none', flex: 1 }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--bm)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--dk)';
            }}
          />
          <button
            type="submit"
            disabled={submitting || !nickname.trim() || !content.trim()}
            style={{
              alignSelf: 'flex-end',
              fontFamily: 'var(--fm)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              padding: '10px 16px',
              border: '2px solid var(--bl)',
              background: 'var(--bm)',
              color: 'var(--wh)',
              boxShadow: '3px 3px 0 var(--bl)',
              cursor: submitting || !nickname.trim() || !content.trim() ? 'not-allowed' : 'pointer',
              opacity: submitting || !nickname.trim() || !content.trim() ? 0.4 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            [&gt;] {t(lang, 'commentSubmit')}
          </button>
        </div>
        {error && (
          <p style={{
            fontFamily: 'var(--fm)',
            fontSize: '11px',
            padding: '8px 12px',
            border: '2px solid var(--or)',
            background: 'var(--obg)',
            color: 'var(--or)',
          }}>
            [!] {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default CommentSection;
