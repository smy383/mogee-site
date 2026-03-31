import React from 'react';
import { useLang } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';

const content = {
  ko: {
    title: '개인정보처리방침',
    updated: '최종 업데이트: 2026년 3월 31일',
    sections: [
      {
        heading: '1. 개요',
        body: 'Mogee Development(이하 "본 사이트")는 mogee.org를 운영하며, 방문자의 개인정보를 소중히 여깁니다. 이 개인정보처리방침은 본 사이트 방문 시 수집되는 정보와 그 사용 방법을 설명합니다.',
      },
      {
        heading: '2. 수집하는 정보',
        body: '본 사이트는 다음과 같은 정보를 수집할 수 있습니다:\n- 방문자가 댓글 작성 시 입력한 닉네임\n- Google Analytics를 통한 방문 통계 (익명 처리된 IP, 브라우저 정보, 페이지 방문 기록)\n- Google AdSense를 통한 광고 쿠키 및 사용자 관심사 데이터',
      },
      {
        heading: '3. Google AdSense 및 광고',
        body: '본 사이트는 Google AdSense를 통해 광고를 게재합니다. Google은 쿠키를 사용하여 방문자의 이전 방문 기록을 기반으로 관련 광고를 표시할 수 있습니다. Google의 광고 쿠키 사용은 Google 개인정보처리방침(https://policies.google.com/privacy)에 따릅니다. 방문자는 Google 광고 설정(https://adssettings.google.com)에서 개인 맞춤 광고를 비활성화할 수 있습니다.',
      },
      {
        heading: '4. 쿠키 사용',
        body: '본 사이트는 쿠키를 사용합니다. 쿠키는 방문자의 브라우저에 저장되는 소량의 데이터 파일입니다. 브라우저 설정을 통해 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.',
      },
      {
        heading: '5. 제3자 서비스',
        body: '본 사이트는 다음 제3자 서비스를 사용합니다:\n- Google Analytics: 방문 통계 분석\n- Google AdSense: 광고 게재\n- Firebase (Google): 데이터 저장 및 호스팅\n각 서비스는 자체 개인정보처리방침을 보유하고 있습니다.',
      },
      {
        heading: '6. 개인정보 보호 (GDPR / CPRA)',
        body: 'EU/EEA 거주자(GDPR) 및 캘리포니아 거주자(CPRA)는 자신의 개인정보에 대한 접근, 수정, 삭제를 요청할 권리가 있습니다. 이와 관련된 문의는 아래 이메일로 연락해 주시기 바랍니다.',
      },
      {
        heading: '7. 문의',
        body: '개인정보처리방침에 관한 문의사항은 thewinnerple@gmail.com으로 연락해 주세요.',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: March 31, 2026',
    sections: [
      {
        heading: '1. Overview',
        body: 'Mogee Development ("this site") operates mogee.org and values the privacy of its visitors. This Privacy Policy explains what information is collected when you visit this site and how it is used.',
      },
      {
        heading: '2. Information We Collect',
        body: 'This site may collect the following information:\n- Nicknames entered by visitors when posting comments\n- Visit statistics via Google Analytics (anonymized IP, browser info, page visit history)\n- Ad cookies and user interest data via Google AdSense',
      },
      {
        heading: '3. Google AdSense & Advertising',
        body: 'This site displays ads through Google AdSense. Google may use cookies to show relevant ads based on your prior visits to this site. Google\'s use of advertising cookies is governed by the Google Privacy Policy (https://policies.google.com/privacy). You can opt out of personalized advertising at Google Ad Settings (https://adssettings.google.com).',
      },
      {
        heading: '4. Use of Cookies',
        body: 'This site uses cookies — small data files stored in your browser. You may disable cookies through your browser settings, though some features may become limited as a result.',
      },
      {
        heading: '5. Third-Party Services',
        body: 'This site uses the following third-party services:\n- Google Analytics: visit statistics\n- Google AdSense: ad serving\n- Firebase (Google): data storage and hosting\nEach service maintains its own privacy policy.',
      },
      {
        heading: '6. Privacy Rights (GDPR / CPRA)',
        body: 'EU/EEA residents (GDPR) and California residents (CPRA) have the right to access, correct, or delete their personal data. Please contact us at the email below for such requests.',
      },
      {
        heading: '7. Contact',
        body: 'For questions about this Privacy Policy, please contact us at thewinnerple@gmail.com.',
      },
    ],
  },
  ja: {
    title: 'プライバシーポリシー',
    updated: '最終更新日: 2026年3月31日',
    sections: [
      {
        heading: '1. 概要',
        body: 'Mogee Development（以下「本サイト」）はmogee.orgを運営しており、訪問者のプライバシーを大切にしています。このプライバシーポリシーでは、本サイト訪問時に収集される情報とその使用方法について説明します。',
      },
      {
        heading: '2. 収集する情報',
        body: '本サイトでは以下の情報を収集する場合があります：\n- 訪問者がコメント投稿時に入力したニックネーム\n- Google Analyticsによる訪問統計（匿名化されたIP、ブラウザ情報、ページ訪問履歴）\n- Google AdSenseによる広告クッキーおよびユーザーの興味データ',
      },
      {
        heading: '3. Google AdSenseと広告',
        body: '本サイトはGoogle AdSenseを通じて広告を掲載しています。Googleはクッキーを使用して、過去の訪問履歴に基づいた関連広告を表示する場合があります。Googleの広告クッキー使用はGoogleプライバシーポリシー（https://policies.google.com/privacy）に従います。訪問者はGoogle広告設定（https://adssettings.google.com）でパーソナライズ広告を無効にできます。',
      },
      {
        heading: '4. クッキーの使用',
        body: '本サイトはクッキーを使用します。クッキーはブラウザに保存される小さなデータファイルです。ブラウザの設定でクッキーを無効にすることができますが、一部の機能が制限される場合があります。',
      },
      {
        heading: '5. サードパーティサービス',
        body: '本サイトは以下のサードパーティサービスを使用しています：\n- Google Analytics：訪問統計の分析\n- Google AdSense：広告配信\n- Firebase（Google）：データの保存とホスティング\n各サービスは独自のプライバシーポリシーを持っています。',
      },
      {
        heading: '6. プライバシー権（GDPR / CPRA）',
        body: 'EU/EEA在住者（GDPR）およびカリフォルニア州在住者（CPRA）は、個人データへのアクセス、修正、削除を要求する権利があります。これらに関するお問い合わせは、下記メールアドレスまでご連絡ください。',
      },
      {
        heading: '7. お問い合わせ',
        body: 'プライバシーポリシーに関するご質問は thewinnerple@gmail.com までお問い合わせください。',
      },
    ],
  },
};

const Privacy: React.FC = () => {
  const { lang } = useLang();
  const c = content[lang];

  return (
    <>
      <SEOHead
        title={`${c.title} | Mogee Development`}
        description="Mogee Development 개인정보처리방침 — Google AdSense, 쿠키, 데이터 수집 및 이용에 관한 안내입니다."
        canonicalPath="/privacy"
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{c.title}</h1>
        <p className="text-sm text-gray-400 mb-10">{c.updated}</p>

        <div className="space-y-8">
          {c.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{section.heading}</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default Privacy;
