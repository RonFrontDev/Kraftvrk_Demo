import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from './IconComponents';

const ThemeSwitcher = (): React.ReactNode => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
