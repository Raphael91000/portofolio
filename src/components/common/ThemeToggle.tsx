import React from 'react';
import { Sun, Moon, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isLoaded } = useTheme();

  const handleToggle = () => {
    console.log('🖱️ Theme toggle clicked, current theme:', theme);
    toggleTheme();
    
    // Feedback visuel immédiat
    const root = document.documentElement;
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  };

  // Afficher un loader pendant l'initialisation
  if (!isLoaded) {
    return (
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
        <Loader className="h-5 w-5 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 border-2 border-transparent hover:border-orange-500/50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Currently in ${theme} mode. Click to switch to ${theme === 'dark' ? 'light' : 'dark'} mode.`}
    >
      {/* Indicateur de mode actuel */}
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 opacity-75"></div>
      
      {/* Icône Lune (Mode Dark) */}
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-blue-400 drop-shadow-sm" />
      </motion.div>
      
      {/* Icône Soleil (Mode Light) */}
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-orange-500 drop-shadow-sm" />
      </motion.div>
      
      {/* Element invisible pour maintenir la taille */}
      <div className="h-5 w-5 opacity-0">
        <Sun className="h-5 w-5" />
      </div>
      
      {/* Effet de brillance au hover */}
      <motion.div
        className="absolute inset-0 bg-white rounded-lg opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;