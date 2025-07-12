import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Code2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '../common/LanguageSelector';
import ThemeToggle from '../common/ThemeToggle';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const isRTL = i18n.dir() === 'rtl';

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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsMobileLangOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Avec support RTL */}
          <div className={`flex items-center gap-2 ${isRTL ? 'order-3' : 'order-1'}`}>
            <Code2 className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              RT
            </span>
          </div>

          {/* Desktop Navigation - Centre */}
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

          {/* Desktop Controls - CORRECTION RTL */}
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
            {/* Mobile Language Selector - Menu déroulant avec toutes les langues */}
            <div className="relative">
              <button
                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
              >
                <Globe className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {getCurrentLanguage().flag}
                </span>
              </button>

              {/* Mobile Language Dropdown - Toutes les langues visibles */}
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
                    
                    {/* Grille de toutes les langues */}
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

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay pour fermer le dropdown de langue mobile */}
      {isMobileLangOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          onClick={() => setIsMobileLangOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-black/50"
            onClick={handleOutsideClick}
          >
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className={`absolute ${
                isRTL ? 'left-0' : 'right-0'
              } top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div className="p-6 space-y-6">
                <div className={`flex items-center justify-between ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`flex items-center gap-2 ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}>
                    <Code2 className="h-6 w-6 text-orange-500" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">RT</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>

                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}
                    >
                      {t(`nav.${item.key}`)}
                    </button>
                  ))}
                </nav>

                <div className="space-y-4">
                  <div className={`flex items-center justify-between ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t('theme')}
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;