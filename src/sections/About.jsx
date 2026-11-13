import Linkedin from '../components/LinkedInIcon';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Mail,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { personalInfo, education } from '../data/personal';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericStr = String(target).replace(/[^0-9.]/g, '');
    const numericTarget = parseFloat(numericStr);

    if (isNaN(numericTarget)) {
      setCount(target);
      return;
    }

    const isFloat = numericStr.includes('.');
    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = Math.min(current / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * numericTarget;

      setCount(isFloat ? value.toFixed(2) : Math.floor(value));

      if (current >= steps) {
        setCount(isFloat ? numericTarget.toFixed(2) : numericTarget);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const { isDark } = useTheme();

  // Contact & Quick Info (Tanpa duplikasi informasi pendidikan)
  const contactItems = [
    {
      icon: <MapPin size={18} />,
      label: 'Lokasi',
      value: personalInfo.location,
    },
    {
      icon: <Sparkles size={18} />,
      label: 'Status',
      value: 'Available for Opportunities',
    },
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <WhatsAppIcon size={18} />,
      label: 'WhatsApp',
      value: personalInfo.whatsappDisplay,
      href: personalInfo.whatsapp,
    },
    {
      icon: <Linkedin size={18} />,
      label: 'LinkedIn',
      value: personalInfo.linkedinDisplay,
      href: personalInfo.linkedin,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="Mengenal lebih dekat profil pribadi, latar belakang pendidikan, dan pengalaman saya"
        />

        {/* Bio & Profile Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mt-16">
          {/* Left Column — Photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Decorative border frame */}
              <div
                className="absolute -inset-3 rounded-2xl opacity-50"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                }}
              />
              <div
                className={`absolute -inset-2 rounded-2xl ${
                  isDark ? 'bg-dark-bg' : 'bg-light-bg'
                }`}
              />

              {/* Photo */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-[22rem] rounded-2xl overflow-hidden">
                {personalInfo.aboutImage ? (
                  <img
                    src={personalInfo.aboutImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-6xl font-bold ${
                      isDark
                        ? 'bg-dark-card text-gray-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.15))`
                        : `linear-gradient(135deg, rgba(124,58,237,0.08), rgba(59,130,246,0.08))`,
                    }}
                  >
                    II
                  </div>
                )}
              </div>

              {/* Decorative dots */}
              <div
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-lg opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, var(--color-primary) 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px',
                }}
              />
            </div>
          </motion.div>

          {/* Right Column — Info */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              className={`text-2xl sm:text-3xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              variants={itemVariants}
            >
              {personalInfo.name}
            </motion.h3>

            <motion.p
              className={`text-base leading-relaxed mb-8 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
              variants={itemVariants}
            >
              {personalInfo.aboutDescription}
            </motion.p>

            {/* Quick Contact & Status Items */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
              variants={containerVariants}
            >
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                    isDark
                      ? 'bg-dark-card/50 hover:bg-dark-card'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  variants={itemVariants}
                >
                  <span
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--color-primary-light)' }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p
                      className={`text-xs font-medium uppercase tracking-wider mb-0.5 ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                        style={{ color: 'var(--color-primary-light)' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        className={`text-sm font-medium ${
                          isDark ? 'text-gray-200' : 'text-gray-800'
                        }`}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              variants={containerVariants}
            >
              {personalInfo.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-4 rounded-xl border ${
                    isDark
                      ? 'bg-dark-card/50 border-dark-border'
                      : 'bg-white border-gray-200'
                  }`}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-1 gradient-text">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.value.includes('+') ? '+' : ''}
                    />
                  </div>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Integrated Education Sub-Section */}
        <motion.div
          className="mt-16 pt-12 border-t border-dark-border/40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'
              }`}
            >
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Latar Belakang Pendidikan
              </h3>
              <p className="text-xs text-gray-400">
                Pendidikan formal dan pengalaman keorganisasian kampus
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isDark
                    ? 'bg-dark-card border-dark-border hover:border-primary/40'
                    : 'bg-white border-gray-200 hover:border-primary/40 shadow-sm'
                }`}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header gradient line */}
                <div
                  className="h-1.5"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  }}
                />

                <div className="p-6 sm:p-8">
                  {/* Institution & Degree */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4
                        className={`text-xl font-bold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {edu.institution}
                      </h4>
                      <p
                        className="text-base font-semibold"
                        style={{ color: 'var(--color-primary-light)' }}
                      >
                        {edu.degree}
                      </p>
                    </div>

                    {/* Meta Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? 'bg-white/5 text-gray-300 border border-white/10'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <MapPin size={12} />
                        {edu.location}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? 'bg-white/5 text-gray-300 border border-white/10'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <Calendar size={12} />
                        {edu.period}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: isDark
                            ? 'rgba(124,58,237,0.2)'
                            : 'rgba(124,58,237,0.1)',
                          color: 'var(--color-primary-light)',
                          border: '1px solid rgba(124,58,237,0.3)',
                        }}
                      >
                        <Award size={12} />
                        IPK: {edu.gpa}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {edu.description}
                  </p>

                  {/* Organizational Activities */}
                  {edu.activities && edu.activities.length > 0 && (
                    <div
                      className={`pt-5 border-t ${
                        isDark ? 'border-white/5' : 'border-gray-100'
                      }`}
                    >
                      <h5
                        className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <BookOpen size={14} className="text-primary-light" />
                        Pengalaman Organisasi & Kontribusi Kampus
                      </h5>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {edu.activities.map((activity, idx) => (
                          <div
                            key={idx}
                            className={`flex items-start gap-2.5 p-3 rounded-xl text-sm ${
                              isDark
                                ? 'bg-white/[0.03] text-gray-300 border border-white/5'
                                : 'bg-gray-50 text-gray-700 border border-gray-100'
                            }`}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ background: 'var(--color-primary)' }}
                            />
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
