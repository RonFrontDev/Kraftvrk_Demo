import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { DumbbellIcon, MenuIcon, XIcon } from './IconComponents';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const navLinkClasses = "font-teko text-2xl uppercase tracking-wider transition-colors duration-300 hover:text-red-500";
const activeNavLinkClasses = "text-red-500";

const Header = (): React.ReactNode => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const closeMenu = () => setIsMenuOpen(false);

  const renderNavLinks = () => (
    <>
      <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={closeMenu}>{t('nav.home')}</NavLink>
      <NavLink to="/wod" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={closeMenu}>{t('nav.wod')}</NavLink>
      <NavLink to="/schedule" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={closeMenu}>{t('nav.schedule')}</NavLink>
      <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={closeMenu}>{t('nav.about')}</NavLink>
      <NavLink to="/membership" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={closeMenu}>{t('nav.membership')}</NavLink>
      <NavLink to="/shop" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={closeMenu}>{t('nav.shop')}</NavLink>
      <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={closeMenu}>{t('nav.contact')}</NavLink>
    </>
  );

  const headerClasses = `
    sticky top-0 z-50 transition-colors duration-300
    ${!isScrolled || isMenuOpen ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg shadow-black/20' : 'bg-transparent'}
  `;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center space-x-2">
            <DumbbellIcon className="h-8 w-8 text-red-500" />
            <span className="font-teko text-4xl font-bold tracking-widest text-white">KRAFTVRK</span>
          </NavLink>
          <div className="flex items-center">
            <nav className="hidden lg:flex items-center space-x-8 mr-4">
              {renderNavLinks()}
            </nav>
            <LanguageSwitcher />
            <div className="lg:hidden ml-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                {isMenuOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-2 sm:px-3 flex flex-col items-center">
            {renderNavLinks()}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;