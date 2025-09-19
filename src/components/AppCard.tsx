import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Star } from 'lucide-react';

interface AppCardProps {
  title: string;
  description: string;
  packageName: string;
  icon: string;
  primaryColor: string;
  features: string[];
  index: number;
}

const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  packageName,
  icon,
  primaryColor,
  features,
  index
}) => {
  const playStoreUrl = `https://play.google.com/store/apps/details?id=${packageName}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
              style={{ background: `linear-gradient(135deg, ${primaryColor}88, ${primaryColor}44)` }}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
              <p className="text-gray-400 text-sm">{packageName}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-300 mb-6 line-clamp-2">{description}</p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">주요 기능</h4>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-300">
                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Google Play</span>
          </a>
          <button className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AppCard;