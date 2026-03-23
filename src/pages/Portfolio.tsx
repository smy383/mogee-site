import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Star, Shield, Briefcase } from 'lucide-react';

const appsData = [
  {
    title: 'ttapp',
    packageName: 'com.ttapp.app',
    icon: '📱',
    primaryColor: '#7C6FFF',
    description: '모바일에서 Claude Code를 원격 제어하는 앱. 어디서든 AI 코딩 어시스턴트를 손안에서 사용하세요.',
    features: [
      '모바일 → 데스크톱 Claude Code 원격 제어',
      'AI 자동화 워크플로우 (웹훅/스케줄 트리거)',
      '팀 협업 — 게스트 초대 및 다중 데스크톱 지원',
      'Android & iOS 동시 출시'
    ],
    websiteUrl: 'https://ttapp-remote.com',
    appStoreUrl: 'https://apps.apple.com/kr/app/ttapp/id6759002810'
  },
  {
    title: '메모비 AI',
    packageName: 'com.memobeeapp',
    icon: '🐝',
    primaryColor: '#B794F6',
    description: 'AI로 똑똑한 메모쓰기! 일상의 모든 순간을 기록하고, AI가 자동으로 정리해주는 메모 앱.',
    features: [
      'AI 자동 분석으로 핵심 키워드 추출',
      '중요도와 감정 분석으로 메모의 중요성 파악',
      '자동 제목 생성으로 메모 관리 체계화',
      '연관 메모 자동 그룹화'
    ]
  },
  {
    title: '마인드M',
    packageName: 'com.mindm.app',
    icon: '🧠',
    primaryColor: '#4299E1',
    description: 'AI 기반 개인 감정 분석 앱. 매일의 감정을 기록하고 AI가 패턴을 분석해 자기 이해를 돕습니다.',
    features: [
      '감정 기록 시스템 — 텍스트, 이미지 첨부 지원',
      'AI 기반 감정 분석으로 정확한 인사이트',
      '글래스모피즘 UI로 아름다운 경험',
      '규칙적인 기록을 통한 자기 성장'
    ]
  },
  {
    title: '메모야',
    packageName: 'com.memoyaapp',
    icon: '📝',
    primaryColor: '#48BB78',
    description: 'AI 채팅형 메모 관리 앱! Gemini AI와 자연스러운 대화로 메모를 검색하고 정리하세요.',
    features: [
      'Gemini AI와 대화로 메모 검색/정리/분석',
      '다중 채팅방으로 주제별 메모 분류',
      '완벽한 프라이버시 — 기기에만 저장',
      '한국어, 영어 등 6개 언어 지원'
    ]
  },
  {
    title: 'ALL SMS',
    packageName: 'com.smsforwarder.app',
    icon: '💬',
    primaryColor: '#FF6B6B',
    description: '안드로이드 SMS를 조건에 따라 자동으로 다른 번호나 이메일로 전달하는 스마트 포워딩 앱.',
    features: [
      '자동 SMS 전달 — 조건에 맞는 메시지 자동 전달',
      '이메일 백업 — Gmail 등으로 자동 백업',
      '발신자/내용 기반 선택적 필터링',
      '24시간 백그라운드 안정 작동'
    ],
    privacyPolicyUrl: 'https://smy383.github.io/sms-forwarder-privacy/'
  },
  {
    title: '웹빵',
    packageName: 'com.esc.app.escape_story_community',
    icon: '🎮',
    primaryColor: '#F59E0B',
    description: '개인 개발자가 설계부터 배포까지 완성한 풀스택 모바일 플랫폼. AI 자동 채점 기능의 UGC 플랫폼.',
    features: [
      '방탈출 게임 제작 및 공유',
      'Gemini AI 자동 채점',
      '크리에이터 수익 창출',
      '96,000+ 라인 Flutter 풀스택'
    ],
    websiteUrl: 'https://webbang.co.kr'
  },
  {
    title: '방탈출 다이어리',
    packageName: 'com.mogee.escdiary',
    icon: '🔐',
    primaryColor: '#6750A4',
    description: '나만의 방탈출 기록장! 플레이한 테마를 6가지 항목으로 평점 매기고 체계적으로 관리하세요.',
    features: [
      '6가지 평점 시스템 (인테리어, 만족도 등)',
      '클리어 시간, 힌트 횟수 상세 기록',
      '완벽한 프라이버시 — SQLite 로컬 저장',
      '다크/라이트 모드 지원'
    ]
  },
  {
    title: '링크다 (웹)',
    packageName: 'linkda.kr',
    icon: '🔗',
    primaryColor: '#3B82F6',
    description: '키워드 기반 URL 단축 서비스. "기관명.키워드" 형태로 URL을 등록하고 쉽게 공유하세요.',
    features: [
      '카테고리.키워드 형태로 URL 연결',
      'Google Safe Browsing URL 안전성 검사',
      'Google, 카카오 소셜 로그인',
      'OG 메타데이터 자동 미리보기'
    ],
    websiteUrl: 'https://linkda.kr'
  },
  {
    title: 'SpacePlus',
    packageName: 'com.spaceplus.drawing',
    icon: '✏️',
    primaryColor: '#00D4FF',
    description: 'Android 태블릿용 3D 드로잉 앱. 스타일러스로 3차원 공간에서 그림을 그리고 비디오로 내보내세요.',
    features: [
      '5가지 펜 타입 (볼펜, 마커, 브러시 등)',
      '원/삼각형/사각형 자동 인식',
      '720p/1080p 비디오 내보내기',
      '스타일러스 압력 감지'
    ],
    privacyPolicyUrl: 'https://smy383.github.io/spaceplus-privacy/'
  }
];

interface AppData {
  title: string;
  packageName: string;
  icon: string;
  primaryColor: string;
  description: string;
  features: string[];
  privacyPolicyUrl?: string;
  websiteUrl?: string;
  appStoreUrl?: string;
}

const AppCard: React.FC<{ app: AppData; index: number }> = ({ app, index }) => {
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${app.packageName}`;
  const isWeb = !app.packageName.startsWith('com.');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      viewport={{ once: true }}
      className="group bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/60 hover:border-gray-200 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
          style={{ backgroundColor: `${app.primaryColor}18` }}
        >
          {app.icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">{app.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{app.packageName}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{app.description}</p>

      {/* Features */}
      <ul className="space-y-1.5 mb-5">
        {app.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
            <Star className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: app.primaryColor }} fill="currentColor" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        {isWeb && app.websiteUrl ? (
          <a
            href={app.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ backgroundColor: app.primaryColor }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            웹사이트
          </a>
        ) : (
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ backgroundColor: app.primaryColor }}
          >
            <Download className="w-3.5 h-3.5" />
            Google Play
          </a>
        )}
        {app.appStoreUrl && (
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </a>
        )}
        {app.privacyPolicyUrl && (
          <a
            href={app.privacyPolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            title="개인정보처리방침"
          >
            <Shield className="w-4 h-4" />
          </a>
        )}
        {app.websiteUrl && !isWeb && (
          <a
            href={app.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            title="웹사이트"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Decorative blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-indigo-500">포트폴리오</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">출시된 앱 & 서비스</h1>
          <p className="text-gray-500">
            Flutter로 만든 {appsData.length}개의 앱과 서비스입니다.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appsData.map((app, i) => (
            <AppCard key={app.packageName} app={app} index={i} />
          ))}
        </div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            현재 활발히 개발 중 · 더 많은 앱 준비 중
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Portfolio;
