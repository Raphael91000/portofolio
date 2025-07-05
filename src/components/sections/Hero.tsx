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

  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-orange-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left">
            {/* Welcome title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-orange-500 mb-6"
            >
              {t('hero.welcome')}
            </motion.h1>

            {/* Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
            >
              {t('hero.intro')}
            </motion.p>

            {/* Typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-2">
                Je suis un
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-orange-600 dark:text-orange-400 h-12 flex items-center">
                <span className="min-w-[300px]">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
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
                className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
              >
                <FileText className="h-5 w-5" />
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
                    className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-400 ${link.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - AI Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              {/* Central AI circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl"
              >
                <span className="text-4xl font-bold text-white">A.I.</span>
              </motion.div>

              {/* Orbiting circles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-orange-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: `${80 + i * 20}px 0px`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Connecting lines */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-20 bg-gradient-to-t from-orange-500/50 to-transparent"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${i * 60}deg)`,
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
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