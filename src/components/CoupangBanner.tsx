import React, { useEffect, useRef } from 'react';

const CoupangBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const script1 = document.createElement('script');
    script1.src = 'https://ads-partners.coupang.com/g.js';
    script1.async = true;

    script1.onload = () => {
      if ((window as any).PartnersCoupang && containerRef.current) {
        new (window as any).PartnersCoupang.G({
          id: 978790,
          template: 'carousel',
          trackingCode: 'AF6404367',
          subId: 'threadsmj',
          width: '680',
          height: '140',
          tsource: '',
        });
      }
    };

    containerRef.current.appendChild(script1);
  }, []);

  return (
    <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid var(--dk)' }}>
      <p
        style={{
          fontFamily: 'var(--fm)',
          fontSize: '10px',
          color: 'var(--bl)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        {'// SPONSORED'}
      </p>
      <div
        ref={containerRef}
        style={{
          border: '2px solid var(--dk)',
          boxShadow: '4px 4px 0 var(--dk)',
          padding: '12px',
          background: 'var(--of)',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default CoupangBanner;
