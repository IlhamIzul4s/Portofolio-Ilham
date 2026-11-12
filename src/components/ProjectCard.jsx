import { motion } from 'framer-motion';
import { Briefcase, Code, Calendar, FolderOpen, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const categoryIcons = {
  Administration: Briefcase,
  'Information Systems': Code,
  'Website & UI Design': Code,
  'Event Operations': Calendar,
  'Personal Projects': FolderOpen,
};

const categoryGradients = {
  Administration: 'from-emerald-500/30 to-teal-500/30',
  'Information Systems': 'from-blue-500/30 to-cyan-500/30',
  'Website & UI Design': 'from-purple-500/30 to-pink-500/30',
  'Event Operations': 'from-amber-500/30 to-orange-500/30',
  'Personal Projects': 'from-rose-500/30 to-red-500/30',
};

const categoryBadgeColors = {
  Administration: { dark: 'bg-emerald-500/20 text-emerald-400', light: 'bg-emerald-100 text-emerald-700' },
  'Information Systems': { dark: 'bg-blue-500/20 text-blue-400', light: 'bg-blue-100 text-blue-700' },
  'Website & UI Design': { dark: 'bg-purple-500/20 text-purple-400', light: 'bg-purple-100 text-purple-700' },
  'Event Operations': { dark: 'bg-amber-500/20 text-amber-400', light: 'bg-amber-100 text-amber-700' },
  'Personal Projects': { dark: 'bg-rose-500/20 text-rose-400', light: 'bg-rose-100 text-rose-700' },
};

export default function ProjectCard({ project, onClick }) {
  const { isDark } = useTheme();
  const Icon = categoryIcons[project.category] || FolderOpen;
  const gradient = categoryGradients[project.category] || 'from-gray-500/30 to-slate-500/30';
  const badge = categoryBadgeColors[project.category] || { dark: 'bg-gray-500/20 text-gray-400', light: 'bg-gray-100 text-gray-700' };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
        isDark
          ? 'bg-dark-card border-dark-border hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]'
          : 'bg-light-card border-light-border hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]'
      }`}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      aria-label={`Lihat proyek ${project.title}`}
      onKeyDown={e => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(project); } }}
    >
      {/* Thumbnail */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className={`w-full h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
          <Icon className={`w-12 h-12 relative z-10 ${isDark ? 'text-white/30' : 'text-black/20'}`} />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category & Year */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isDark ? badge.dark : badge.light}`}>
            {project.category}
          </span>
          <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {project.description}
        </p>

        {/* Tools */}
        {project.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tools.slice(0, 3).map((tool, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded-md ${
                  isDark
                    ? 'bg-white/5 text-gray-300 border border-white/10'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-xs px-2 py-0.5 text-gray-400">
                +{project.tools.length - 3}
              </span>
            )}
          </div>
        )}

        {/* View Details Button */}
        <button
          className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            isDark
              ? 'bg-primary/10 text-primary-light hover:bg-primary/20 border border-primary/20'
              : 'bg-primary/5 text-primary-dark hover:bg-primary/10 border border-primary/20'
          }`}
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
      </div>
    </motion.div>
  );
}
