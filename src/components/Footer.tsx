import React from 'react';
import { Github, Mail, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Mogee
            </h3>
            <p className="text-gray-400 text-sm">Flutter Mobile App Developer</p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/smy383"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:thewinnerple@gmail.com"
              className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Mogee Development. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;