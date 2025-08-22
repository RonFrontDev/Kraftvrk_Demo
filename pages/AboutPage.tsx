import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage = (): React.ReactNode => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-center min-h-screen pt-24 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('about.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('about.subtitle')}</p>
        </div>

        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-[#1c1c1e] p-10 shadow-xl rounded-lg">
                <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 uppercase">{t('about.philosophyTitle')}</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t('about.philosophyText')}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;