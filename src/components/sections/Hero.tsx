import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Linkedin, Github, ExternalLink, FileText } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';

// Composant pour l'effet machine à écrire
const TypewriterText: React.FC = () => {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = t('hero.typewriter', { returnObjects: true }) as string[];

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Écriture
        if (currentCharIndex < currentWord.length) {
          setDisplayText(currentWord.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        } else {
          // Petite pause avant suppression (800ms)
          setTimeout(() => setIsDeleting(true), 800);
        }
      } else {
        // Suppression
        if (currentCharIndex > 0) {
          setDisplayText(currentWord.slice(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        } else {
          // Passer au mot suivant immédiatement
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100); // Écriture et suppression rapides

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentWordIndex, isDeleting, words]);

  return (
    <span className="min-w-[300px]">
      {displayText}
      <span className="animate-pulse text-orange-500">|</span>
    </span>
  );
};

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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left">
            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-2 sm:mb-4 leading-relaxed"
            >
              Raphaël Theuillon
            </motion.p>

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
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-2">
      
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-400 h-12 flex items-center">
                <TypewriterText />
              </div>
            </motion.div>

            {/* Social links and CV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col space-y-4"
            >
              {/* Buttons container */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3 sm:gap-y-0 sm:gap-x-4">
                {/* CV Button */}
                <a
                  href="/cv-raphael-theuillon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-orange-500 text-orange-500 rounded-lg transition-colors duration-300 font-medium text-sm sm:text-base hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  <span>{t('hero.cv')}</span>
                </a>

                {/* KR Global Solutions Button */}
                <a
                  href="https://krglobalsolutionsltd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm sm:text-base border border-gray-600 hover:border-orange-500"
                >
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('companies.krGlobal')}</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
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
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex items-center justify-center">
              {/* Circuit imprimé style IA */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 400"
                className="absolute inset-0"
              >
                {/* Tracés de circuit - lignes principales */}
                <g stroke="rgb(59 130 246)" strokeWidth="2" fill="none" opacity="0.6">
                  {/* Lignes horizontales principales */}
                  <line x1="50" y1="150" x2="350" y2="150" />
                  <line x1="50" y1="200" x2="350" y2="200" />
                  <line x1="50" y1="250" x2="350" y2="250" />
                  
                  {/* Lignes verticales principales */}
                  <line x1="150" y1="50" x2="150" y2="350" />
                  <line x1="200" y1="50" x2="200" y2="350" />
                  <line x1="250" y1="50" x2="250" y2="350" />
                </g>

                {/* Tracés secondaires */}
                <g stroke="rgb(59 130 246)" strokeWidth="1" fill="none" opacity="0.4">
                  {/* Diagonales */}
                  <line x1="100" y1="100" x2="300" y2="300" />
                  <line x1="300" y1="100" x2="100" y2="300" />
                  
                  {/* Circuits en L */}
                  <path d="M50,100 L120,100 L120,170" />
                  <path d="M280,100 L350,100 L350,170" />
                  <path d="M50,300 L120,300 L120,230" />
                  <path d="M280,300 L350,300 L350,230" />
                </g>

                {/* Processeur central "AI" */}
                <motion.g>
                  <rect
                    x="170"
                    y="170"
                    width="60"
                    height="60"
                    fill="rgb(59 130 246)"
                    stroke="rgb(147 197 253)"
                    strokeWidth="2"
                    rx="5"
                    animate={{
                      fill: ["rgb(59 130 246)", "rgb(147 197 253)", "rgb(59 130 246)"],
                      strokeWidth: [2, 4, 2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <text
                    x="200"
                    y="205"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    AI
                  </text>
                </motion.g>

                {/* Composants électroniques autour */}
                {/* Résistances */}
                {[
                  { x: 80, y: 120, delay: 0 },
                  { x: 320, y: 120, delay: 0.5 },
                  { x: 80, y: 280, delay: 1 },
                  { x: 320, y: 280, delay: 1.5 },
                ].map((comp, i) => (
                  <motion.rect
                    key={`resistor-${i}`}
                    x={comp.x - 15}
                    y={comp.y - 5}
                    width="30"
                    height="10"
                    fill="rgb(34 197 94)"
                    stroke="rgb(74 222 128)"
                    strokeWidth="1"
                    rx="2"
                    animate={{
                      fill: ["rgb(34 197 94)", "rgb(74 222 128)", "rgb(34 197 94)"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: comp.delay,
                    }}
                  />
                ))}

                {/* Condensateurs */}
                {[
                  { x: 120, y: 80, delay: 0.2 },
                  { x: 280, y: 80, delay: 0.7 },
                  { x: 120, y: 320, delay: 1.2 },
                  { x: 280, y: 320, delay: 1.7 },
                ].map((comp, i) => (
                  <motion.g key={`capacitor-${i}`}>
                    <rect
                      x={comp.x - 8}
                      y={comp.y - 12}
                      width="4"
                      height="24"
                      fill="rgb(251 146 60)"
                      animate={{
                        fill: ["rgb(251 146 60)", "rgb(253 186 116)", "rgb(251 146 60)"],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: comp.delay,
                      }}
                    />
                    <rect
                      x={comp.x + 4}
                      y={comp.y - 12}
                      width="4"
                      height="24"
                      fill="rgb(251 146 60)"
                      animate={{
                        fill: ["rgb(251 146 60)", "rgb(253 186 116)", "rgb(251 146 60)"],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: comp.delay,
                      }}
                    />
                  </motion.g>
                ))}

                {/* Puces/IC */}
                {[
                  { x: 100, y: 200, delay: 0.3 },
                  { x: 300, y: 200, delay: 0.8 },
                  { x: 200, y: 100, delay: 1.3 },
                  { x: 200, y: 300, delay: 1.8 },
                ].map((comp, i) => (
                  <motion.rect
                    key={`ic-${i}`}
                    x={comp.x - 12}
                    y={comp.y - 8}
                    width="24"
                    height="16"
                    fill="rgb(15 23 42)"
                    stroke="rgb(148 163 184)"
                    strokeWidth="1"
                    rx="2"
                    animate={{
                      stroke: ["rgb(148 163 184)", "rgb(226 232 240)", "rgb(148 163 184)"],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: comp.delay,
                    }}
                  />
                ))}

                {/* Impulsions électriques qui parcourent les circuits */}
                {[...Array(12)].map((_, i) => {
                  const paths = [
                    // Horizontales
                    [[50, 150], [350, 150]],
                    [[50, 200], [350, 200]],
                    [[50, 250], [350, 250]],
                    // Verticales
                    [[150, 50], [150, 350]],
                    [[200, 50], [200, 350]],
                    [[250, 50], [250, 350]],
                    // Diagonales
                    [[100, 100], [300, 300]],
                    [[300, 100], [100, 300]],
                  ];
                  
                  const path = paths[i % paths.length];
                  const [start, end] = path;
                  
                  return (
                    <motion.circle
                      key={`pulse-${i}`}
                      r="3"
                      fill="rgb(34 211 238)"
                      animate={{
                        cx: [start[0], end[0]],
                        cy: [start[1], end[1]],
                        opacity: [1, 0.3, 1],
                      }}
                      transition={{
                        duration: 3 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "linear",
                      }}
                    />
                  );
                })}

                {/* Points de connexion lumineux */}
                {[
                  { x: 150, y: 150 }, { x: 200, y: 150 }, { x: 250, y: 150 },
                  { x: 150, y: 200 }, { x: 250, y: 200 },
                  { x: 150, y: 250 }, { x: 200, y: 250 }, { x: 250, y: 250 },
                ].map((point, i) => (
                  <motion.circle
                    key={`connection-${i}`}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="rgb(34 211 238)"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Effets de lueur sur les tracés actifs */}
                {[...Array(6)].map((_, i) => {
                  const lines = [
                    { x1: 50, y1: 150, x2: 350, y2: 150 },
                    { x1: 50, y1: 200, x2: 350, y2: 200 },
                    { x1: 50, y1: 250, x2: 350, y2: 250 },
                    { x1: 150, y1: 50, x2: 150, y2: 350 },
                    { x1: 200, y1: 50, x2: 200, y2: 350 },
                    { x1: 250, y1: 50, x2: 250, y2: 350 },
                  ];
                  
                  const line = lines[i];
                  
                  return (
                    <motion.line
                      key={`glow-${i}`}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="rgb(34 211 238)"
                      strokeWidth="3"
                      strokeOpacity="0.4"
                      animate={{
                        strokeOpacity: [0, 0.8, 0],
                        strokeWidth: [1, 4, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  );
                })}
              </svg>
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