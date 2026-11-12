import Linkedin from '../components/LinkedInIcon';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Mail,

  Briefcase,
  Calendar,
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part from target
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
      // ease-out cubic
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

function About() {
  const { isDark } = useTheme();

  const infoItems = [
    {
      icon: <GraduationCap size={18} />,
      label: 'Pendidikan',
      value: `${personalInfo.degree} — ${personalInfo.university}`,
    },
    {
      icon: <MapPin size={18} />,
      label: 'Lokasi',
      value: personalInfo.location,
    },
    {
      icon: <Briefcase size={18} />,
      label: 'IPK',
      value: personalInfo.gpa,
    },
    {
      icon: <Calendar size={18} />,
      label: 'Lulus',
      value: personalInfo.graduationYear,
    },
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
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
          subtitle="Mengenal lebih dekat tentang latar belakang dan pengalaman saya"
        />

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

              {/* Photo placeholder */}
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

            {/* Info grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
              variants={containerVariants}
            >
              {infoItems.map((item, index) => (
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
                  <div
                    className="text-2xl sm:text-3xl font-bold mb-1 gradient-text"
                  >
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
      </div>
    </section>
  );
}

export default About;

