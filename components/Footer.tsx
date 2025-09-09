
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon } from './IconComponents';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = (): React.ReactNode => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-200 dark:bg-black text-gray-600 dark:text-gray-400">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <NavLink to="/" className="text-3xl font-extrabold tracking-widest text-gray-900 dark:text-white mb-4 inline-block">
              KRAFTVRK
            </NavLink>
            <p className="text-sm leading-relaxed pr-8">{t('footer.aboutText')}</p>
             <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent transition-colors duration-300"><InstagramIcon className="h-6 w-6" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-accent transition-colors duration-300"><FacebookIcon className="h-6 w-6" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-accent transition-colors duration-300"><TwitterIcon className="h-6 w-6" /></a>
            </div>
          </div>
          
          {/* Working Hours */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t('footer.workingHours')}</h4>
            <p className="text-sm">{t('footer.weekdays')}: <span className="text-gray-800 dark:text-gray-200 ml-2">6:00 - 20:00</span></p>
            <p className="text-sm mt-2">{t('footer.saturday')}: <span className="text-gray-800 dark:text-gray-200 ml-2">9:00 - 12:00</span></p>
            <p className="text-sm mt-2">{t('footer.sunday')}: <span className="text-gray-800 dark:text-gray-200 ml-2">{t('footer.closed')}</span></p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t('footer.contactInfo')}</h4>
            <p className="text-sm">123 Strength Ave,</p>
            <p className="text-sm">Reykjavik, 101, Iceland</p>
            <p className="text-sm mt-4"><a href="mailto:contact@kraftvrk.com" className="hover:text-accent">contact@kraftvrk.com</a></p>
            <p className="text-sm"><a href="tel:+3545551234" className="hover:text-accent">+354 555-1234</a></p>
          </div>
          
          {/* Gallery placeholder */}
           <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t('footer.gallery')}</h4>
            <div className="grid grid-cols-3 gap-2">
                <img src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="gallery image 1" className="object-cover w-full h-full" />
                <img src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="gallery image 2" className="object-cover w-full h-full" />
                <img src="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="gallery image 3" className="object-cover w-full h-full" />
                <img src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="gallery image 4" className="object-cover w-full h-full" />
                <img src="https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="gallery image 5" className="object-cover w-full h-full" />
                <img src="https://images.pexels.com/photos/4752861/pexels-photo-4752861.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" alt="gallery image 6" className="object-cover w-full h-full" />
            </div>
          </div>
          
        </div>
        <div className="mt-12 border-t border-gray-300 dark:border-gray-800 pt-8 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Kraftvrk. {t('footer.rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;