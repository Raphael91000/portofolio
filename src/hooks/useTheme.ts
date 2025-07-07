import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialisation du thème au premier chargement
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // 1. Vérifier localStorage
        const savedTheme = localStorage.getItem('theme') as Theme;
        
        // 2. Vérifier la préférence système si pas de sauvegarde
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        
        // 3. Déterminer le thème à utiliser
        const initialTheme = savedTheme || systemPreference;
        
        console.log('🎨 Theme initialization:', { savedTheme, systemPreference, initialTheme });
        
        setTheme(initialTheme);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error initializing theme:', error);
        setTheme('dark'); // Fallback
        setIsLoaded(true);
      }
    };

    initializeTheme();
  }, []);

  // Application du thème à chaque changement
  useEffect(() => {
    if (!isLoaded) return;

    const applyTheme = (newTheme: Theme) => {
      const root = document.documentElement;
      const body = document.body;
      
      try {
        // 1. Nettoyer les classes existantes
        root.classList.remove('light', 'dark');
        body.classList.remove('light', 'dark');
        
        // 2. Appliquer la nouvelle classe
        root.classList.add(newTheme);
        body.classList.add(newTheme);
        
        // 3. Sauvegarder dans localStorage
        localStorage.setItem('theme', newTheme);
        
        // 4. Debug et vérification
        console.log('🎨 Theme applied:', {
          theme: newTheme,
          htmlClasses: root.classList.toString(),
          bodyClasses: body.classList.toString()
        });
        
        // 5. Forcer un re-render en modifiant une propriété CSS custom
        root.style.setProperty('--theme-applied', Date.now().toString());
        
      } catch (error) {
        console.error('Error applying theme:', error);
      }
    };

    applyTheme(theme);
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    console.log('🔄 Toggling theme:', theme, '→', newTheme);
    setTheme(newTheme);
  };

  const setLightMode = () => setTheme('light');
  const setDarkMode = () => setTheme('dark');

  return { 
    theme, 
    toggleTheme, 
    setLightMode, 
    setDarkMode,
    isLoaded 
  };
};