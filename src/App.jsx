import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

// Layout & Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';

// Section Components
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Langsung ke konten</a>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <>
          <Navbar />
          <main id="main">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
          <MusicPlayer />
          <ScrollToTop />
        </>
      )}
      </MotionConfig>
    </ThemeProvider>
  );
}
