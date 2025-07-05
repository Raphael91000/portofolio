import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { useTheme } from './hooks/useTheme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Timeline from './components/sections/Timeline';
import Skills from './components/sections/Skills';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';

function App() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  return (
    <div className={`min-h-screen ${theme}`}>
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;