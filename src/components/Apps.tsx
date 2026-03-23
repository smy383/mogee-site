import React from 'react';
import { motion } from 'framer-motion';
import AppCard from './AppCard';

const appsData = [
  {
    title: 'ttapp',
    packageName: 'com.ttapp.app',
    icon: '📱',
    primaryColor: '#7C6FFF',
    description: '모바일에서 Claude Code를 원격 제어하는 앱. 어디서든 AI 코딩 어시스턴트를 손안에서 사용하세요. 실시간 채팅, 자동화 워크플로우, 팀 협업까지.',
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
    description: 'AI로 똑똑한 메모쓰기! 일상의 모든 순간을 기록하고, AI가 자동으로 정리해주는 메모 앱입니다.',
    features: [
      'AI 자동 분석 기능으로 핵심 키워드 추출',
      '중요도와 감정 분석으로 메모의 중요성 파악',
      '자동 제목 생성으로 메모 관리가 더욱 체계적',
      '연관된 메모들을 자동으로 그룹화하여 정보 연결'
    ]
  },
  {
    title: '마인드M',
    packageName: 'com.mindm.app',
    icon: '🧠',
    primaryColor: '#4299E1',
    description: 'AI 기반 개인 감정 분석 앱입니다. 매일의 감정을 기록하고, 인공지능이 이를 분석하여 사용자의 감정 패턴과 변화를 깊이 있게 이해할 수 있도록 돕습니다.',
    features: [
      '감정 기록 시스템 - 다양한 입력 방식으로 텍스트, 이미지 첨부 지원',
      'AI 기반 분석 - 고도화된 감정 분석으로 정확한 인사이트 제공',
      '사용자 친화적 디자인 - 글래스모피즘 UI로 아름답고 직관적인 경험',
      '지속적인 성장 - 규칙적인 기록을 통한 자기 이해와 발전'
    ]
  },
  {
    title: '메모야',
    packageName: 'com.memoyaapp',
    icon: '📝',
    primaryColor: '#48BB78',
    description: 'AI 채팅형 메모 관리 앱! Gemini AI와 자연스러운 대화로 메모 검색, 정리, 분석을 "이번 주 중요한 일정 알려줘" 등 자연어로 메모 관리가 가능합니다.',
    features: [
      'AI 채팅 메모 관리 - Gemini AI와 대화로 메모 검색, 정리, 분석',
      '다중 채팅방 시스템 - 주제별로 채팅방을 만들어 메모를 체계적으로 분류',
      '완벽한 프라이버시 - 모든 데이터는 기기에만 저장',
      '다국어 지원 - 한국어, 영어, 일본어, 중국어, 스페인어, 독일어 지원'
    ]
  },
  {
    title: 'ALL SMS',
    packageName: 'com.smsforwarder.app',
    icon: '📱',
    primaryColor: '#FF6B6B',
    description: '안드로이드 기기에서 수신된 SMS 메시지를 설정한 조건에 따라 자동으로 다른 번호나 이메일로 전달하는 스마트 메시지 포워딩 앱입니다.',
    features: [
      '자동 SMS 전달 - 설정한 조건에 맞는 메시지를 자동으로 다른 번호로 전달',
      '이메일 백업 - 중요한 SMS를 Gmail 등으로 자동 백업',
      '조건별 필터링 - 발신자, 메시지 내용에 따른 선택적 전달',
      '24시간 백그라운드 작동 - 앱 종료 후에도 안정적 작동'
    ],
    privacyPolicyUrl: 'https://smy383.github.io/sms-forwarder-privacy/'
  },
  {
    title: '웹빵',
    packageName: 'com.esc.app.escape_story_community',
    icon: '🎮',
    primaryColor: '#F59E0B',
    description: '개인 개발자가 설계부터 배포까지 완성한 풀스택 모바일 플랫폼. 크리에이터 경제 시스템과 AI 자동 채점 기능을 갖춘 혁신적인 UGC 플랫폼.',
    features: [
      '방탈출 게임 제작 및 공유 - 누구나 쉽게 방탈출 게임 제작',
      'Gemini AI 자동 채점 - 서술형 퍼즐의 정답을 AI가 자동 판정',
      '크리에이터 수익 창출 - 제작한 게임으로 수익 창출 가능',
      '96,000+ 라인의 풀스택 앱 - Flutter + Firebase + Cloud Functions'
    ],
    websiteUrl: 'https://webbang.co.kr'
  },
  {
    title: '방탈출 다이어리',
    packageName: 'com.mogee.escdiary',
    icon: '🔐',
    primaryColor: '#6750A4',
    description: '나만의 방탈출 기록장! 플레이한 테마를 기록하고, 6가지 항목으로 평점을 매기며, 나의 방탈출 히스토리를 체계적으로 관리하세요.',
    features: [
      '6가지 평점 시스템 - 인테리어, 만족도, 퍼즐, 스토리, 연출, 공포도',
      '상세 기록 관리 - 테마명, 매장, 클리어 시간, 힌트 사용 횟수',
      '완벽한 프라이버시 - 모든 데이터는 기기에만 저장 (SQLite)',
      '다크/라이트 모드 - 취향에 맞는 테마 선택'
    ]
  },
  {
    title: '링크다 (웹)',
    packageName: 'linkda.kr',
    icon: '🔗',
    primaryColor: '#3B82F6',
    description: '키워드 기반 URL 단축 서비스. "기관명.키워드" 형태로 URL을 등록하고 쉽게 공유하세요. 복잡한 URL을 기억하기 쉬운 키워드로 관리할 수 있습니다.',
    features: [
      '키워드 URL 등록 - 카테고리.키워드 형태로 URL 연결',
      'URL 안전성 검사 - Google Safe Browsing API 연동',
      '소셜 로그인 - Google, 카카오 로그인 지원',
      'OG 메타데이터 - 등록된 URL의 미리보기 정보 자동 표시'
    ],
    websiteUrl: 'https://linkda.kr'
  },
  {
    title: 'SpacePlus',
    packageName: 'com.spaceplus.drawing',
    icon: '✏️',
    primaryColor: '#00D4FF',
    description: 'Android 태블릿용 3D 드로잉 앱. 스타일러스로 3차원 공간에서 그림을 그리고, 작업 과정을 비디오로 내보낼 수 있습니다.',
    features: [
      '5가지 펜 타입 - 볼펜, 만년필, 마커, 형광펜, 브러시',
      '퀵 셰이프 인식 - 원, 삼각형, 사각형 등 자동 인식',
      '비디오 내보내기 - 720p/1080p H.264 인코딩',
      '스타일러스 압력 감지 - 필압에 따른 선 굵기 변화'
    ],
    privacyPolicyUrl: 'https://smy383.github.io/spaceplus-privacy/'
  }
];

const Apps: React.FC = () => {
  return (
    <section id="apps" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            출시된 앱
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Google Play에서 만나볼 수 있는 Mogee의 앱들입니다.
            사용자 중심의 디자인과 강력한 기능을 제공합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appsData.map((app, index) => (
            <AppCard
              key={app.packageName}
              {...app}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gray-900/50 border border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">현재 활발히 개발 중</span>
            </div>
            <div className="text-gray-600">|</div>
            <span className="text-gray-400">더 많은 앱 준비 중</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Apps;