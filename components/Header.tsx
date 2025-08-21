
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DumbbellIcon, MenuIcon, XIcon } from './IconComponents';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const navLinkClasses = "font-teko text-2xl uppercase tracking-wider transition-colors duration-300 hover:text-red-500";
const activeNavLinkClasses = "text-red-500";

const Header = (): React.ReactNode => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const renderNavLinks = () => (
    <>
      <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</NavLink>
      <NavLink to="/wod" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.wod')}</NavLink>
      <NavLink to="/schedule" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.schedule')}</NavLink>
      <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</NavLink>
    </>
  );

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center space-x-2">
            <DumbbellIcon className="h-8 w-8 text-red-500" />
            <span className="font-teko text-4xl font-bold tracking-widest text-white">KRAFTVRK</span>
          </NavLink>
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-8 mr-4">
              {renderNavLinks()}
            </nav>
            <LanguageSwitcher />
            <div className="md:hidden ml-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                {isMenuOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-2 sm:px-3 flex flex-col items-center">
            {renderNavLinks()}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
