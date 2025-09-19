import React from 'react';
import { motion } from 'framer-motion';
import AppCard from './AppCard';

const appsData = [
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