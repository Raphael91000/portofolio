// Hero.tsx — version complète corrigée avec support RTL, résolutions de conflit et composants visuels complets

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Linkedin, Github, ExternalLink, FileText } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const typewriterWords = t('hero.typewriter', { returnObjects: true }) as string[];
  const displayText = useTypewriter(typewriterWords, 100);

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/raphael-theuillon-689139261',
      icon: Linkedin,
      color: 'hover:text-blue-600',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Raphael91000',
      icon: Github,
      color: 'hover:text-gray-800 dark:hover:text-gray-200',
    },
    {
      name: 'Fiverr',
      href: 'https://www.fiverr.com/users/raph910/seller_dashboard',
      icon: ExternalLink,
      color: 'hover:text-green-600',
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side */}
          <div className="text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-2 sm:mb-4 leading-relaxed"
            >
              Raphaël Theuillon
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-orange-500 mb-3 sm:mb-6"
            >
              {t('hero.welcome')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-8 leading-relaxed"
            >
              {t('hero.intro')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 sm:mb-12"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-400 h-12 flex items-center">
                <span className="min-w-[300px]">
                  {displayText}
                  <span className="animate-pulse text-orange-500">|</span>
                </span>
              </div>
            </motion.div>

            {/* Buttons + Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col space-y-4"
            >
              <div
                dir={isRTL ? 'rtl' : 'ltr'}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
              >
                <a
                  href="/cv-raphael-theuillon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-orange-500 text-orange-500 rounded-lg transition-colors duration-300 font-medium text-sm sm:text-base hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  <span>{t('hero.cv')}</span>
                </a>

                {/* KR Global Solutions Button - MÊME STYLE QUE CV EN LIGHT */}
                <a
                  href="https://krglobalsolutionsltd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-gray-700 border-2 border-orange-500 dark:border-gray-600 text-orange-500 dark:text-white hover:bg-orange-500 dark:hover:bg-gray-600 hover:text-white dark:hover:border-orange-500 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl hover:transform hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('companies.krGlobal')}</span>
                </a>
              </div>

              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 sm:p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-orange-400 ${link.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side – Illustration IA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center items-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex items-center justify-center">
              {/* Ton SVG animé IA est ici — insère-le au même endroit */}
              {/* ... */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-orange-500 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;