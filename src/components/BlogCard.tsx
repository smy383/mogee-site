import React from 'react';
import { Link } from 'react-router-dom';
import { useLang, t } from '../contexts/LanguageContext';

export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  createdAt: any;
  updatedAt?: any;
  views?: number;
  likes?: number;
  // multilingual
  title_en?: string;
  summary_en?: string;
  content_en?: string;
  tags_en?: string[];
  title_ja?: string;
  summary_ja?: string;
  content_ja?: string;
  tags_ja?: string[];
}

interface BlogCardProps {
  post: Post;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
  const { lang } = useLang();

  const displayTitle =
    lang === 'en' && post.title_en ? post.title_en :
    lang === 'ja' && post.title_ja ? post.title_ja :
    post.title;

  const displaySummary =
    lang === 'en' && post.summary_en ? post.summary_en :
    lang === 'ja' && post.summary_ja ? post.summary_ja :
    post.summary;

  const displayContent =
    lang === 'en' && post.content_en ? post.content_en :
    lang === 'ja' && post.content_ja ? post.content_ja :
    post.content;

  const displayTags =
    lang === 'en' && post.tags_en?.length ? post.tags_en :
    lang === 'ja' && post.tags_ja?.length ? post.tags_ja :
    post.tags;

  const formatDate = (ts: any) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    const locale = lang === 'en' ? 'en-US' : lang === 'ja' ? 'ja-JP' : 'ko-KR';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const readingTime = Math.max(1, Math.ceil(displayContent.length / 500));
  const readLabel = lang === 'en'
    ? `${readingTime} min read`
    : lang === 'ja'
    ? `${readingTime}${t(lang, 'minRead')}`
    : `${readingTime}${t(lang, 'minRead')}`;

  const cardStyle: React.CSSProperties = {
    border: '2px solid var(--dk)',
    boxShadow: '5px 5px 0 var(--dk)',
    background: 'var(--wh)',
    padding: '16px',
    transition: 'transform 0.12s, box-shadow 0.12s',
    display: 'block',
    textDecoration: 'none',
  };

  return (
    <article style={{ animationDelay: `${index * 80}ms` }}>
      <Link
        to={`/post/${post.id}`}
        className="group"
        style={cardStyle}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translate(-3px, -3px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0 var(--dk)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 var(--dk)';
        }}
      >
        {/* Tags */}
        {displayTags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {displayTags.slice(0, 3).map((tag) => (
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
        <h2
          className="group-hover:text-blue-600"
          style={{
            fontFamily: 'var(--fh)',
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--dk)',
            marginBottom: '6px',
            lineHeight: 1.25,
            transition: 'color 0.1s',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {displayTitle}
        </h2>

        {/* Summary */}
        <p
          style={{
            fontFamily: 'var(--fb)',
            fontSize: '13px',
            color: 'var(--dk)',
            opacity: 0.7,
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {displaySummary}
        </p>

        {/* Divider */}
        <div style={{ borderTop: '2px solid var(--pn)', marginTop: '12px', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', letterSpacing: '0.06em' }}>
              {formatDate(post.createdAt)}
            </span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--bl)', letterSpacing: '0.06em' }}>
              {readLabel}
            </span>
          </div>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '13px', color: 'var(--or)', letterSpacing: '0.04em' }}>
            &gt;&gt;
          </span>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
