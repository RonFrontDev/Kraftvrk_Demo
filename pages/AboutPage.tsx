import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage = (): React.ReactNode => {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-screen">
        {/* Background Image and Overlay */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        />
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
        
        {/* Content */}
        <div className="relative flex items-center justify-center min-h-screen pt-32 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-7xl font-extrabold uppercase tracking-wider text-white">{t('about.title')}</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('about.subtitle')}</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-sm p-10 shadow-xl rounded-2xl">
                        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 uppercase">{t('about.philosophyTitle')}</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {t('about.philosophyText')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutPage;