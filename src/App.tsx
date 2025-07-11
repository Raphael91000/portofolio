import React from 'react';
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

function App() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  // Plus besoin de logique RTL puisqu'on a supprimé l'arabe
  // useEffect supprimé car plus nécessaire

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
    </div>
  );
}

export default App;