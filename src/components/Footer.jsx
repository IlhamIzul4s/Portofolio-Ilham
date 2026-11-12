import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/personal';
import FaLinkedinIn from './LinkedInIcon';
import { Mail } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`py-12 px-6 border-t ${
        isDark
          ? 'bg-dark-surface border-dark-border'
          : 'bg-light-surface border-light-border'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold gradient-text">
            ILHAM
          </a>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-300 hover:text-primary ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-2 rounded-full transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className={`p-2 rounded-full transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-8 pt-6 border-t text-center text-sm ${
            isDark
              ? 'border-dark-border text-gray-500'
              : 'border-light-border text-gray-400'
          }`}
        >
          © 2026 Ilham Izulhaq. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


