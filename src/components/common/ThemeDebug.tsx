import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeDebug: React.FC = () => {
  const { theme, toggleTheme, setLightMode, setDarkMode } = useTheme();

  const checkThemeStatus = () => {
    const html = document.documentElement;
    const body = document.body;
    
    console.log('🔍 Theme Status Check:', {
      hookTheme: theme,
      htmlClasses: html.classList.toString(),
      bodyClasses: body.classList.toString(),
      localStorage: localStorage.getItem('theme'),
      computedBg: getComputedStyle(body).backgroundColor,
      computedColor: getComputedStyle(body).color
    });
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg text-sm font-mono z-50">
      <div className="mb-2">
        <strong>Theme Debug Panel</strong>
      </div>
      
      <div className="mb-2">
        Current theme: <span className="font-bold text-orange-500">{theme}</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <button 
          onClick={toggleTheme}
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
        >
          Toggle Theme
        </button>
        
        <button 
          onClick={setLightMode}
          className="px-2 py-1 bg-yellow-500 text-black rounded text-xs"
        >
          Force Light
        </button>
        
        <button 
          onClick={setDarkMode}
          className="px-2 py-1 bg-gray-800 text-white rounded text-xs"
        >
          Force Dark
        </button>
        
        <button 
          onClick={checkThemeStatus}
          className="px-2 py-1 bg-green-500 text-white rounded text-xs"
        >
          Check Status
        </button>
      </div>
      
      <div className="mt-2 text-xs">
        <div>HTML classes: {document.documentElement.classList.toString()}</div>
        <div>LocalStorage: {localStorage.getItem('theme')}</div>
      </div>
    </div>
  );
};

export default ThemeDebug;