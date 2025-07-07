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
import Contact from './components/sections/Contact';

// Composant de debug temporaire intégré
const ThemeDebug: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const checkThemeStatus = () => {
    const html = document.documentElement;
    console.log('🔍 Theme Check:', {
      theme,
      htmlClasses: html.classList.toString(),
      localStorage: localStorage.getItem('theme')
    });
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 border rounded shadow text-sm z-50">
      <div>Theme: <strong>{theme}</strong></div>
      <button onClick={toggleTheme} className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-xs">
        Toggle
      </button>
      <button onClick={checkThemeStatus} className="mt-2 ml-2 px-2 py-1 bg-green-500 text-white rounded text-xs">
        Check
      </button>
    </div>
  );
};

function App() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ThemeDebug />
    </div>
  );
}

export default App;