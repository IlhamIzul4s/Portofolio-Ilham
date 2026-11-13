import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight, Coffee, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const categoryIcons = {
  Administration: Briefcase,
  'Customer Service': Coffee,
  'Event Operations': Users,
};

const typeBadgeColors = {
  'Full-time': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Freelance Remote': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  Freelance: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  Contract: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
};

const typeBadgeColorsLight = {
  'Full-time': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Freelance Remote': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  Freelance: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  Contract: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
};

export default function ExperienceCard({ experience, index, onClick }) {
  const { isDark } = useTheme();
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoCount = experience.documentation?.length || 0;

  useEffect(() => {
    if (photoCount < 2) return;
    const timer = window.setInterval(() => {
      setPhotoIndex(current => (current + 1) % photoCount);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [experience.id, photoCount]);

  const isEven = index % 2 === 0;
  const Icon = categoryIcons[experience.category] || Briefcase;
  const cover = experience.documentation?.[photoIndex % photoCount]?.thumbnail || experience.image;
  const badgeStyle = isDark
    ? (typeBadgeColors[experience.type] || typeBadgeColors['Full-time'])
    : (typeBadgeColorsLight[experience.type] || typeBadgeColorsLight['Full-time']);

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex w-full md:w-1/2 ${
        isEven ? 'md:pr-12 md:self-start' : 'md:pl-12 md:self-end md:ml-auto'
      } mb-8 md:mb-0`}
    >
      {/* Timeline dot */}
      <div
        className={`hidden md:block absolute top-6 w-4 h-4 rounded-full border-4 z-10 ${
          isDark
            ? 'border-primary bg-dark-bg'
            : 'border-primary bg-light-bg'
        } ${isEven ? 'right-[-8px]' : 'left-[-8px]'}`}
      />

      {/* Mobile timeline dot */}
      <div
        className={`md:hidden absolute left-[1.25rem] top-6 w-4 h-4 rounded-full border-4 z-10 -translate-x-1/2 ${
          isDark
            ? 'border-primary bg-dark-bg'
            : 'border-primary bg-light-bg'
        }`}
      />

      {/* Card */}
      <motion.div
        whileHover={{ y: -4 }}
        className={`ml-10 md:ml-0 w-full rounded-2xl p-6 border cursor-pointer transition-all duration-300 ${
          isDark
            ? 'bg-dark-card border-dark-border hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]'
            : 'bg-light-card border-light-border hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]'
        }`}
        onClick={() => onClick(experience)}
        role="button"
        tabIndex={0}
        aria-label={`Lihat pengalaman di ${experience.company}`}
        onKeyDown={e => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(experience); } }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-primary/20' : 'bg-primary/10'
              }`}
            >
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3
                className={`font-bold text-lg ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {experience.company}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
          >
            {experience.type}
          </span>
        </div>

        {/* Position & Period */}
        <p className={`font-semibold mb-1 ${isDark ? 'text-primary-light' : 'text-primary-dark'}`}>
          {experience.position}
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
          <Calendar className="w-3 h-3" />
          <span>{experience.period}</span>
        </div>

        {/* Description */}
        <ul className="space-y-2 mb-4">
          {experience.description.slice(0, 3).map((desc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-primary-light' : 'text-primary'}`} />
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{desc}</span>
            </li>
          ))}
          {experience.description.length > 3 && (
            <li className="text-sm text-gray-400 ml-6">
              +{experience.description.length - 3} more...
            </li>
          )}
        </ul>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.skills.slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className={`text-xs px-2.5 py-1 rounded-lg ${
                isDark
                  ? 'bg-white/5 text-gray-300 border border-white/10'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              {skill}
            </span>
          ))}
          {experience.skills.length > 4 && (
            <span className="text-xs px-2.5 py-1 text-gray-400">
              +{experience.skills.length - 4}
            </span>
          )}
        </div>

        {/* Photo placeholder */}
        {cover ? (
          <div className="experience-thumb-container">
            <img
              key={cover}
              src={cover}
              alt={`Dokumentasi ${experience.company}`}
              loading="lazy"
              decoding="async"
              className="experience-card-thumb animate-smooth"
            />
            {photoCount > 1 && (
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 backdrop-blur-md text-white/90 border border-white/10 pointer-events-none">
                {photoIndex + 1}/{photoCount}
              </div>
            )}
          </div>
        ) : (
          <div
            className={`w-full h-24 rounded-xl flex items-center justify-center mb-4 ${
              isDark
                ? 'bg-gradient-to-br from-primary/20 to-accent/20'
                : 'bg-gradient-to-br from-primary/10 to-accent/10'
            }`}
          >
            <Icon className={`w-8 h-8 ${isDark ? 'text-primary-light/50' : 'text-primary/40'}`} />
          </div>
        )}

        {/* View Documentation Button */}
        <button
          className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            isDark
              ? 'bg-primary/10 text-primary-light hover:bg-primary/20 border border-primary/20'
              : 'bg-primary/5 text-primary-dark hover:bg-primary/10 border border-primary/20'
          }`}
        >
          View Documentation
          {experience.documentation?.length > 0 && <span>({experience.documentation.length} foto)</span>}
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
