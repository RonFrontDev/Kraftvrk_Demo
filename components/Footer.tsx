
import React from 'react';
import { DumbbellIcon, FacebookIcon, InstagramIcon, TwitterIcon } from './IconComponents';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = (): React.ReactNode => {
  const { t } = useLanguage();
  return (
    <footer className="bg-black text-gray-400 mt-auto">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <DumbbellIcon className="h-7 w-7 text-red-500" />
            <span className="font-teko text-3xl font-bold tracking-widest text-white">KRAFTVRK</span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Kraftvrk. {t('footer.rightsReserved')}</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-red-500 transition-colors duration-300"><InstagramIcon className="h-6 w-6" /></a>
            <a href="#" className="hover:text-red-500 transition-colors duration-300"><FacebookIcon className="h-6 w-6" /></a>
            <a href="#" className="hover:text-red-500 transition-colors duration-300"><TwitterIcon className="h-6 w-6" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
