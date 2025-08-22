import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from './IconComponents';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const navLinkClasses = "text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:text-accent";
const activeNavLinkClasses = "text-accent";

const Header = (): React.ReactNode => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  
  const isTransparent = isHomePage && !isScrolled;

  const headerClasses = `
    fixed top-0 w-full z-50 transition-all duration-300
    ${isTransparent
        ? 'bg-gradient-to-b from-black/30 to-transparent'
        : 'bg-white/95 dark:bg-[#181818]/95 backdrop-blur-lg shadow-md'
    }
  `;
  
  const navTextColorClass = isTransparent ? 'text-white' : 'text-gray-900 dark:text-white';

  const renderNavLinks = (mobile = false) => (
    <>
      <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.home')}</NavLink>
      <NavLink to="/wod" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.wod')}</NavLink>
      <NavLink to="/schedule" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.schedule')}</NavLink>
      <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.about')}</NavLink>
      <NavLink to="/coaches" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.coaches')}</NavLink>
      <NavLink to="/shop" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.shop')}</NavLink>
      <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.contact')}</NavLink>
    </>
  );
  
  const mobileMenuClasses = `
    lg:hidden absolute top-24 left-0 w-full transition-all duration-300
    bg-white dark:bg-[#181818] shadow-lg
  `;


  return (
    <header className={headerClasses} ref={headerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <NavLink to="/" className={`text-3xl font-extrabold tracking-widest transition-colors duration-300 ${navTextColorClass}`}>
            KRAFTVRK
          </NavLink>

          <nav className={`hidden lg:flex items-center space-x-8 ${navTextColorClass}`}>
            {renderNavLinks()}
          </nav>
          
          <div className="flex items-center">
            <div className="hidden lg:flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <NavLink to="/contact" className="ml-2 border-2 border-accent text-accent font-bold py-3 px-6 text-sm uppercase tracking-wider rounded-md hover:bg-accent hover:text-black transition-colors duration-300">
                {t('nav.freeTrial')}
              </NavLink>
              <NavLink to="/membership" className="bg-accent text-black font-bold py-3 px-6 text-sm uppercase tracking-wider rounded-md hover:bg-accent-dark transition-colors duration-300">
                {t('membership.joinButtonShort')}
              </NavLink>
            </div>
            <div className="lg:hidden ml-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${navTextColorClass} focus:outline-none transition-colors duration-300`}>
                {isMenuOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className={mobileMenuClasses}>
          <nav className="px-4 pt-2 pb-8 space-y-2 flex flex-col items-center text-gray-900 dark:text-white">
            {renderNavLinks(true)}
             <NavLink to="/contact" onClick={closeMenu} className="mt-4 w-full text-center border-2 border-accent text-accent font-bold py-3 px-6 text-sm uppercase tracking-wider rounded-md hover:bg-accent hover:text-black transition-colors duration-300">
                {t('nav.freeTrial')}
              </NavLink>
             <NavLink to="/membership" onClick={closeMenu} className="mt-2 w-full text-center bg-accent text-black font-bold py-3 px-6 text-sm uppercase tracking-wider rounded-md hover:bg-accent-dark transition-colors duration-300">
                {t('membership.joinButtonShort')}
              </NavLink>
              <div className="mt-4 flex justify-center items-center gap-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;