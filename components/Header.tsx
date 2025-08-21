import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from './IconComponents';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const navLinkClasses = "text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:text-accent";
const activeNavLinkClasses = "text-accent";

const Header = (): React.ReactNode => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

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

  const renderNavLinks = (mobile = false) => (
    <>
      <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.home')}</NavLink>
      <NavLink to="/wod" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.wod')}</NavLink>
      <NavLink to="/schedule" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.schedule')}</NavLink>
      <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.about')}</NavLink>
      <NavLink to="/shop" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.shop')}</NavLink>
      <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} ${mobile ? 'py-2 text-lg' : ''}`} onClick={closeMenu}>{t('nav.contact')}</NavLink>
    </>
  );

  const headerClasses = `
    fixed top-0 w-full z-50 transition-all duration-300
    ${isScrolled && !isMenuOpen ? 'bg-transparent' : 'bg-[#181818] shadow-lg'}
  `;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <NavLink to="/" className="text-3xl font-extrabold tracking-widest text-white">
            KRAFTVRK
          </NavLink>

          <nav className="hidden lg:flex items-center space-x-8">
            {renderNavLinks()}
          </nav>
          
          <div className="flex items-center">
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher />
              <NavLink to="/membership" className="bg-accent text-black font-bold py-3 px-6 text-sm uppercase tracking-wider rounded-sm hover:bg-accent-dark transition-colors duration-300">
                {t('membership.joinButtonShort')}
              </NavLink>
            </div>
            <div className="lg:hidden ml-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                {isMenuOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-[#181818] absolute top-24 left-0 w-full">
          <nav className="px-4 pt-2 pb-8 space-y-2 flex flex-col items-center">
            {renderNavLinks(true)}
             <NavLink to="/membership" className="mt-4 w-full text-center bg-accent text-black font-bold py-3 px-6 text-sm uppercase tracking-wider rounded-sm hover:bg-accent-dark transition-colors duration-300">
                {t('membership.joinButtonShort')}
              </NavLink>
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;