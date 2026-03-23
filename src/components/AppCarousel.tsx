import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, ExternalLink, Briefcase } from 'lucide-react';

const appsData = [
  {
    title: 'ttapp',
    packageName: 'com.ttapp.app',
    icon: '📱',
    primaryColor: '#7C6FFF',
    bg: 'from-violet-50 to-indigo-50',
    description: '모바일에서 Claude Code를 원격 제어하는 앱. 어디서든 AI 코딩 어시스턴트를 손안에서 사용하세요.',
    tags: ['AI', 'Remote', 'Flutter'],
    websiteUrl: 'https://ttapp-remote.com',
    appStoreUrl: 'https://apps.apple.com/kr/app/ttapp/id6759002810',
  },
  {
    title: '메모비 AI',
    packageName: 'com.memobeeapp',
    icon: '🐝',
    primaryColor: '#9F7AEA',
    bg: 'from-purple-50 to-pink-50',
    description: 'AI로 똑똑한 메모쓰기! 일상의 모든 순간을 기록하고 AI가 자동으로 정리해주는 메모 앱.',
    tags: ['AI', 'Memo', 'Flutter'],
  },
  {
    title: '마인드M',
    packageName: 'com.mindm.app',
    icon: '🧠',
    primaryColor: '#4299E1',
    bg: 'from-blue-50 to-cyan-50',
    description: 'AI 기반 개인 감정 분석 앱. 매일의 감정을 기록하고 AI가 패턴을 분석해 자기 이해를 돕습니다.',
    tags: ['AI', '감정분석', 'Flutter'],
  },
  {
    title: '메모야',
    packageName: 'com.memoyaapp',
    icon: '📝',
    primaryColor: '#48BB78',
    bg: 'from-green-50 to-emerald-50',
    description: 'Gemini AI와 자연스러운 대화로 메모를 검색하고 정리하는 AI 채팅형 메모 앱.',
    tags: ['Gemini', 'Memo', 'Flutter'],
  },
  {
    title: 'ALL SMS',
    packageName: 'com.smsforwarder.app',
    icon: '💬',
    primaryColor: '#FC8181',
    bg: 'from-red-50 to-orange-50',
    description: '안드로이드 SMS를 조건에 따라 자동으로 다른 번호나 이메일로 전달하는 스마트 포워딩 앱.',
    tags: ['SMS', 'Automation', 'Android'],
  },
  {
    title: '웹빵',
    packageName: 'com.esc.app.escape_story_community',
    icon: '🎮',
    primaryColor: '#F6AD55',
    bg: 'from-amber-50 to-yellow-50',
    description: '개인 개발자가 설계부터 배포까지 완성한 96,000+ 라인 풀스택 모바일 UGC 플랫폼.',
    tags: ['Fullstack', 'Firebase', 'Flutter'],
    websiteUrl: 'https://webbang.co.kr',
  },
  {
    title: '방탈출 다이어리',
    packageName: 'com.mogee.escdiary',
    icon: '🔐',
    primaryColor: '#9F7AEA',
    bg: 'from-violet-50 to-purple-50',
    description: '나만의 방탈출 기록장! 6가지 항목 평점 시스템으로 플레이 기록을 체계적으로 관리하세요.',
    tags: ['다이어리', 'SQLite', 'Flutter'],
  },
  {
    title: '링크다',
    packageName: 'linkda.kr',
    icon: '🔗',
    primaryColor: '#4299E1',
    bg: 'from-sky-50 to-blue-50',
    description: '"카테고리.키워드" 형태로 URL을 등록하고 쉽게 공유하는 키워드 기반 URL 단축 서비스.',
    tags: ['Web', 'URL', 'React'],
    websiteUrl: 'https://linkda.kr',
  },
  {
    title: 'SpacePlus',
    packageName: 'com.spaceplus.drawing',
    icon: '✏️',
    primaryColor: '#00D4FF',
    bg: 'from-cyan-50 to-teal-50',
    description: 'Android 태블릿용 3D 드로잉 앱. 스타일러스로 3차원 공간에서 그림을 그리고 비디오로 내보내세요.',
    tags: ['Drawing', '3D', 'Android'],
  },
];

const INTERVAL = 3500;

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.97,
  }),
};

const AppCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number, d: number) => {
    setDir(d);
    setIndex((next + appsData.length) % appsData.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(index + 1, 1), INTERVAL);
    return () => clearInterval(timer);
  }, [index, paused, go]);

  const app = appsData[index];
  const isWeb = !app.packageName.startsWith('com.');
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${app.packageName}`;

  return (
    <section className="mt-20 mb-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-indigo-500 flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-700">포트폴리오</span>
          <span className="text-xs text-gray-400 ml-1">{appsData.length}개 앱</span>
        </div>
        <Link
          to="/portfolio"
          className="text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
        >
          전체 보기 →
        </Link>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`bg-gradient-to-br ${app.bg} border border-white/80 rounded-2xl p-6`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: `${app.primaryColor}18` }}
                >
                  {app.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{app.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {app.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full font-medium text-white/90"
                            style={{ backgroundColor: app.primaryColor }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{app.description}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-5">
                {isWeb && app.websiteUrl ? (
                  <a
                    href={app.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 shadow-sm"
                    style={{ backgroundColor: app.primaryColor }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    웹사이트 방문
                  </a>
                ) : (
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 shadow-sm"
                    style={{ backgroundColor: app.primaryColor }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Google Play
                  </a>
                )}
                {app.websiteUrl && !isWeb && (
                  <a
                    href={app.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white/80 text-gray-700 border border-gray-200 hover:bg-white transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    웹사이트
                  </a>
                )}
                {app.appStoreUrl && (
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={() => go(index - 1, -1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => go(index + 1, 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {appsData.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > index ? 1 : -1)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === index ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === index ? app.primaryColor : '#d1d5db',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="mt-3 h-0.5 bg-gray-100 rounded-full overflow-hidden mx-1">
          <motion.div
            key={index}
            className="h-full rounded-full"
            style={{ backgroundColor: app.primaryColor }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
          />
        </div>
      )}
    </section>
  );
};

export default AppCarousel;
