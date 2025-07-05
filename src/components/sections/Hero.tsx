import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Linkedin, Github, ExternalLink, FileText } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';

const Hero: React.FC = () => {
  const { t } = useTranslation();
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left">
            {/* Welcome title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-orange-500 mb-3 sm:mb-6"
            >
              {t('hero.welcome')}
            </motion.h1>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-8 leading-relaxed"
            >
              {t('hero.intro')}
            </motion.p>

            {/* Typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 sm:mb-12"
            >
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-400 mb-2">
                intelligence artificielle
              </div>
            </motion.div>

            {/* Social links and CV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8"
            >
              {/* CV Button */}
              <a
                href="/cv-raphael-theuillon.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium text-sm sm:text-base"
              >
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{t('hero.cv')}</span>
              </a>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-orange-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - AI Animation comme sur l'image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center items-center"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              {/* Cercles concentriques - avec rotation */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-orange-500/50 rounded-full"
                  style={{
                    width: `${60 + i * 15}px`,
                    height: `${60 + i * 15}px`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25 + i * 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Cercle central A.I. - avec rotation */}
              <motion.div 
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-white">A.I.</span>
              </motion.div>

              {/* Points animés qui orbitent autour des cercles */}
              {[...Array(8)].map((_, i) => {
                const radius = 30 + i * 12; // Adapté au responsive
                const angle = (i * 45) * (Math.PI / 180);
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-orange-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-2px',
                      marginTop: '-2px',
                    }}
                    animate={{
                      x: [
                        Math.cos(angle) * radius,
                        Math.cos(angle + Math.PI) * radius,
                        Math.cos(angle + 2 * Math.PI) * radius,
                      ],
                      y: [
                        Math.sin(angle) * radius,
                        Math.sin(angle + Math.PI) * radius,
                        Math.sin(angle + 2 * Math.PI) * radius,
                      ],
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                );
              })}
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