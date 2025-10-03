import React, { useState, useEffect, useRef } from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import { NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X as XIcon, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const navLinkClasses = "text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:text-accent";
const activeNavLinkClasses = "text-accent";

const Header = (): React.ReactNode => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({ wod: false, about: false, pricing: false, contact: false });
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
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileDropdowns({ wod: false, about: false, pricing: false, contact: false });
  };

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

  const toggleMobileDropdown = (menu: 'wod' | 'about' | 'pricing' | 'contact') => {
    setMobileDropdowns(prev => ({ ...prev, [menu]: !prev[menu] }));
  };
  
  const isTransparent = isHomePage && !isScrolled;

  const headerClasses = `
    fixed top-0 w-full z-50 transition-all duration-300
    ${isTransparent
        ? 'bg-gradient-to-b from-black/30 to-transparent'
        : 'bg-white/95 dark:bg-[#181818]/95 backdrop-blur-lg shadow-md'
    }
  `;
  
  const navTextColorClass = isTransparent ? 'text-white' : 'text-gray-900 dark:text-white';

  const isWodActive = location.pathname.startsWith('/wod') || location.pathname.startsWith('/schedule') || location.pathname.startsWith('/library');
  const isAboutActive = location.pathname.startsWith('/about') || location.pathname.startsWith('/coaches') || location.pathname.startsWith('/classes') || location.pathname.startsWith('/members') || location.pathname.startsWith('/what-is-crossfit') || location.pathname.startsWith('/faq');
  const isPricingActive = location.pathname.startsWith('/membership') || location.pathname.startsWith('/referral');
  const isContactActive = location.pathname.startsWith('/contact') || location.pathname.startsWith('/rent-club');
  
  const mobileMenuClasses = `
    lg:hidden absolute top-24 left-0 w-full transition-all duration-300
    bg-white dark:bg-[#181818] shadow-lg rounded-b-2xl
  `;


  return (
    <header className={headerClasses} ref={headerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <NavLink to="/" className={`text-3xl font-extrabold tracking-widest transition-colors duration-300 ${navTextColorClass}`}>
            KRAFTVRK
          </NavLink>

          <nav className={`hidden lg:flex items-center space-x-8 ${navTextColorClass}`}>
            <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.home')}</NavLink>

            {/* WOD Dropdown */}
            <div className="relative group py-6 -my-6">
                <button aria-haspopup="true" className={`${navLinkClasses} ${isWodActive ? activeNavLinkClasses : ''} flex items-center`}>
                    <NavLink to="/wod">{t('nav.wod')}</NavLink>
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white dark:bg-[#181818] shadow-lg rounded-xl p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 ring-1 ring-black ring-opacity-5">
                    <NavLink to="/schedule" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.schedule')}</NavLink>
                    <NavLink to="/library" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.library')}</NavLink>
                </div>
            </div>

            {/* About Dropdown */}
            <div className="relative group py-6 -my-6">
                <button aria-haspopup="true" className={`${navLinkClasses} ${isAboutActive ? activeNavLinkClasses : ''} flex items-center`}>
                    <NavLink to="/about">{t('nav.about')}</NavLink>
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white dark:bg-[#181818] shadow-lg rounded-xl p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 ring-1 ring-black ring-opacity-5">
                    <NavLink to="/what-is-crossfit" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.whatIsCrossfit')}</NavLink>
                    <NavLink to="/coaches" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.coaches')}</NavLink>
                    <NavLink to="/classes" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.classes')}</NavLink>
                    <NavLink to="/members" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.members')}</NavLink>
                    <NavLink to="/faq" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.faq')}</NavLink>
                </div>
            </div>

            <NavLink to="/shop" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.shop')}</NavLink>
            
            {/* Pricing Dropdown */}
            <div className="relative group py-6 -my-6">
                <button aria-haspopup="true" className={`${navLinkClasses} ${isPricingActive ? activeNavLinkClasses : ''} flex items-center`}>
                    <NavLink to="/membership">{t('nav.pricing')}</NavLink>
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white dark:bg-[#181818] shadow-lg rounded-xl p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 ring-1 ring-black ring-opacity-5">
                    <NavLink to="/membership" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.pricing')}</NavLink>
                    <NavLink to="/referral" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.referrals')}</NavLink>
                </div>
            </div>

            {/* Contact Dropdown */}
            <div className="relative group py-6 -my-6">
                <button aria-haspopup="true" className={`${navLinkClasses} ${isContactActive ? activeNavLinkClasses : ''} flex items-center`}>
                    <NavLink to="/contact">{t('nav.contact')}</NavLink>
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white dark:bg-[#181818] shadow-lg rounded-xl p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 ring-1 ring-black ring-opacity-5">
                    <NavLink to="/contact" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.contact')}</NavLink>
                    <NavLink to="/rent-club" className={({ isActive }) => `block w-full text-left px-4 py-2 rounded-md text-gray-900 dark:text-white ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>{t('nav.rentClub')}</NavLink>
                </div>
            </div>
          </nav>
          
          <div className="flex items-center">
            <div className="hidden lg:flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
              <NavLink to="/membership" className="ml-2 bg-accent text-black font-bold py-3 px-6 text-sm uppercase tracking-wider rounded-full hover:bg-accent-dark transition-colors duration-300">
                {t('pricing.joinButtonShort')}
              </NavLink>
            </div>
            <div className="lg:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${navTextColorClass} focus:outline-none transition-colors duration-300`}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className={mobileMenuClasses} id="mobile-menu">
          <nav className="px-4 pt-2 pb-8 space-y-1 flex flex-col items-center text-gray-900 dark:text-white">
            <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-3 text-lg w-full text-center`} onClick={closeMenu}>{t('nav.home')}</NavLink>
            
            {/* WOD Dropdown Mobile */}
            <div className="w-full">
                <button onClick={() => toggleMobileDropdown('wod')} aria-expanded={mobileDropdowns.wod} className={`${navLinkClasses} ${isWodActive ? activeNavLinkClasses : ''} py-3 text-lg w-full flex items-center justify-center`}>
                    {t('nav.wod')}
                    <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform ${mobileDropdowns.wod ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.wod && (
                    <div className="flex flex-col items-center bg-gray-100 dark:bg-black/20 pt-1 pb-2 w-full">
                        <NavLink to="/wod" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.wod')}</NavLink>
                        <NavLink to="/schedule" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.schedule')}</NavLink>
                        <NavLink to="/library" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.library')}</NavLink>
                    </div>
                )}
            </div>
            
            {/* About Dropdown Mobile */}
             <div className="w-full">
                <button onClick={() => toggleMobileDropdown('about')} aria-expanded={mobileDropdowns.about} className={`${navLinkClasses} ${isAboutActive ? activeNavLinkClasses : ''} py-3 text-lg w-full flex items-center justify-center`}>
                    {t('nav.about')}
                    <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform ${mobileDropdowns.about ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.about && (
                    <div className="flex flex-col items-center bg-gray-100 dark:bg-black/20 pt-1 pb-2 w-full">
                        <NavLink to="/about" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.about')}</NavLink>
                        <NavLink to="/what-is-crossfit" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.whatIsCrossfit')}</NavLink>
                        <NavLink to="/coaches" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.coaches')}</NavLink>
                        <NavLink to="/classes" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.classes')}</NavLink>
                        <NavLink to="/members" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.members')}</NavLink>
                        <NavLink to="/faq" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.faq')}</NavLink>
                    </div>
                )}
            </div>

            <NavLink to="/shop" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-3 text-lg w-full text-center`} onClick={closeMenu}>{t('nav.shop')}</NavLink>

            {/* Pricing Dropdown Mobile */}
            <div className="w-full">
                <button onClick={() => toggleMobileDropdown('pricing')} aria-expanded={mobileDropdowns.pricing} className={`${navLinkClasses} ${isPricingActive ? activeNavLinkClasses : ''} py-3 text-lg w-full flex items-center justify-center`}>
                    {t('nav.pricing')}
                    <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform ${mobileDropdowns.pricing ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.pricing && (
                    <div className="flex flex-col items-center bg-gray-100 dark:bg-black/20 pt-1 pb-2 w-full">
                        <NavLink to="/membership" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.pricing')}</NavLink>
                        <NavLink to="/referral" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.referrals')}</NavLink>
                    </div>
                )}
            </div>

            {/* Contact Dropdown Mobile */}
            <div className="w-full">
                <button onClick={() => toggleMobileDropdown('contact')} aria-expanded={mobileDropdowns.contact} className={`${navLinkClasses} ${isContactActive ? activeNavLinkClasses : ''} py-3 text-lg w-full flex items-center justify-center`}>
                    {t('nav.contact')}
                    <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform ${mobileDropdowns.contact ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdowns.contact && (
                    <div className="flex flex-col items-center bg-gray-100 dark:bg-black/20 pt-1 pb-2 w-full">
                        <NavLink to="/contact" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.contact')}</NavLink>
                        <NavLink to="/rent-club" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''} py-2 text-base w-full text-center`} onClick={closeMenu}>{t('nav.rentClub')}</NavLink>
                    </div>
                )}
            </div>
            
            <NavLink to="/membership" onClick={closeMenu} className="mt-4 w-full text-center bg-accent text-black font-bold py-3 px-6 text-sm uppercase tracking-wider rounded-full hover:bg-accent-dark transition-colors duration-300">
              {t('pricing.joinButtonShort')}
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
