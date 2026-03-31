import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';
import { useLang, t } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { lang } = useLang();
  return (
    <footer className="border-t border-gray-100 bg-white/60 backdrop-blur-sm mt-24">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="font-bold text-gray-900 text-lg">mogee<span className="text-indigo-500">.</span></span>
          <p className="text-sm text-gray-400 mt-1">Flutter 기반 모바일 앱 개발자의 블로그</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <Link to="/" className="hover:text-gray-700 transition-colors">{t(lang, 'blog')}</Link>
          <Link to="/portfolio" className="hover:text-gray-700 transition-colors">{t(lang, 'portfolio')}</Link>
          <Link to="/privacy" className="hover:text-gray-700 transition-colors">{t(lang, 'privacyPolicy')}</Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/smy383"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:thewinnerple@gmail.com"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-50 py-4 text-center">
        <p className="text-xs text-gray-300">© {new Date().getFullYear()} Mogee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
