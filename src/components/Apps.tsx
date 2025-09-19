import React from 'react';
import { motion } from 'framer-motion';
import AppCard from './AppCard';

const appsData = [
  {
    title: 'MemoBee',
    packageName: 'com.memobeeapp',
    icon: '🐝',
    primaryColor: '#FFC107',
    description: '간편하고 직관적인 메모 관리 앱. 일상의 모든 아이디어를 빠르게 기록하고 정리하세요.',
    features: [
      '빠른 메모 작성 및 편집',
      '카테고리별 분류 기능',
      '검색 및 필터링',
      '위젯 지원'
    ]
  },
  {
    title: 'MemoYa',
    packageName: 'com.memoyaapp',
    icon: '📝',
    primaryColor: '#4CAF50',
    description: '스마트한 메모 작성을 위한 앱. 텍스트, 이미지, 체크리스트를 한 곳에서 관리하세요.',
    features: [
      '리치 텍스트 에디터',
      '이미지 첨부 기능',
      '체크리스트 관리',
      '클라우드 동기화'
    ]
  },
  {
    title: 'MindM',
    packageName: 'com.mindm.app',
    icon: '🧠',
    primaryColor: '#9C27B0',
    description: '마인드맵과 아이디어 정리를 위한 혁신적인 도구. 생각을 시각화하고 체계적으로 관리하세요.',
    features: [
      '직관적인 마인드맵 생성',
      '다양한 노드 스타일',
      '협업 기능',
      '내보내기 지원'
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