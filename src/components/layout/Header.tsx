import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Code2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '../common/LanguageSelector';
import ThemeToggle from '../common/ThemeToggle';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRTL = i18n.dir() === 'rtl';
  
  // Refs pour détecter les clics en dehors
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      
      // Si le menu n'est pas ouvert, ne rien faire
      if (!isMobileMenuOpen) return;
      
      // Si on clique sur le bouton hamburger, laisser le bouton gérer l'événement
      if (hamburgerRef.current && hamburgerRef.current.contains(target)) {
        return;
      }
      
      // Si on clique dans le menu, ne pas fermer
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      
      // Sinon, fermer le menu
      setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'timeline', href: '#timeline' },
    { key: 'skills', href: '#skills' },
    { key: 'blog', href: '#blog' },
    { key: 'contact', href: '#contact' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const scrollToSection = (href: string) => {
    // Fermer le menu mobile d'abord
    setIsMobileMenuOpen(false);
    
    // Attendre que l'animation de fermeture soit terminée
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        // Calculer l'offset pour compenser la hauteur du header fixe
        const headerHeight = 64; // h-16 = 64px
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Section ${href} not found`);
      }
    }, 300); // Délai correspondant à l'animation de fermeture du menu
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsMobileLangOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className={`flex items-center gap-2 ${isRTL ? 'order-3' : 'order-1'}`}>
            <Code2 className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              RT
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex gap-8 ${isRTL ? 'order-2' : 'order-2'}`}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div 
            className={`hidden md:flex items-center gap-4 ${
              isRTL ? 'order-1 flex-row-reverse' : 'order-3'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* Mobile Controls */}
          <div className={`md:hidden flex items-center gap-2 ${
            isRTL ? 'order-1' : 'order-4'
          }`}>
            {/* Mobile Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
                aria-label={t('language')}
              >
                <Globe className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {getCurrentLanguage().flag}
                </span>
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {isMobileLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-2 ${
                      isRTL ? 'left-0' : 'right-0'
                    } bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-3 min-w-[180px] z-50`}
                  >
                    <div className="px-3 pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {t('language')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1 px-2">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => changeLanguage(language.code)}
                          className={`w-full p-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-left ${
                            i18n.language === language.code
                              ? 'bg-orange-500 text-white shadow-md transform scale-105'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className="text-lg flex-shrink-0">{language.flag}</span>
                          <span className="text-xs font-medium truncate">{language.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger Menu Button */}
            <button
              ref={hamburgerRef}
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label={isMobileMenuOpen ? t('menu.close') : t('menu.open')}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg relative z-50"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-200 font-medium text-lg border-l-4 border-transparent hover:border-orange-500"
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay pour fermer le dropdown de langue mobile */}
      <AnimatePresence>
        {isMobileLangOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-30"
            onClick={() => setIsMobileLangOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;