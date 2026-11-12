import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { education } from '../data/personal';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';

function Education() {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="education" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Education"
          subtitle="Latar belakang pendidikan dan kegiatan akademik saya"
        />

        <motion.div
          className="relative mt-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline line */}
          <div className="timeline-line" />

          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="relative pl-12 md:pl-0 mb-12 last:mb-0"
              variants={itemVariants}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-3 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 z-10"
                style={{
                  borderColor: 'var(--color-primary)',
                  background: isDark
                    ? 'var(--color-dark-bg)'
                    : 'var(--color-light-bg)',
                }}
              />

              {/* Card — alternates sides on desktop */}
              <div
                className={`md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                <motion.div
                  className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-card border-dark-border hover:border-primary/40'
                      : 'bg-white border-gray-200 hover:border-primary/40 shadow-sm'
                  }`}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  {/* Card header with gradient stripe */}
                  <div
                    className="h-1.5"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                    }}
                  />

                  <div className="p-6">
                    {/* Top row: image + info */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Institution image / placeholder */}
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                          isDark ? 'bg-white/5' : 'bg-gray-50'
                        }`}
                        style={
                          !edu.image
                            ? {
                                background: isDark
                                  ? 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.2))'
                                  : 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1))',
                              }
                            : undefined
                        }
                      >
                        {edu.image ? (
                          <img
                            src={edu.image}
                            alt={edu.institution}
                            className="w-full h-full rounded-xl object-cover"
                          />
                        ) : (
                          <GraduationCap
                            size={28}
                            style={{ color: 'var(--color-primary)' }}
                          />
                        )}
                      </div>

                      {/* Institution info */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-lg font-bold mb-1 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {edu.institution}
                        </h3>
                        <p
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-primary-light)' }}
                        >
                          {edu.degree}
                        </p>
                      </div>
                    </div>

                    {/* Meta badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? 'bg-white/5 text-gray-400'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <MapPin size={12} />
                        {edu.location}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? 'bg-white/5 text-gray-400'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Calendar size={12} />
                        {edu.period}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: isDark
                            ? 'rgba(124,58,237,0.15)'
                            : 'rgba(124,58,237,0.08)',
                          color: 'var(--color-primary-light)',
                        }}
                      >
                        <Award size={12} />
                        IPK: {edu.gpa}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {edu.description}
                    </p>

                    {/* Activities */}
                    {edu.activities && edu.activities.length > 0 && (
                      <div>
                        <h4
                          className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          <BookOpen size={14} />
                          Kegiatan
                        </h4>
                        <ul className="space-y-1.5">
                          {edu.activities.map((activity, actIdx) => (
                            <li
                              key={actIdx}
                              className={`flex items-start gap-2 text-sm ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              <span
                                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: 'var(--color-primary)' }}
                              />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Education;
