
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CoachProfile = ({ name, specialty, image, bio }: { name: string, specialty: string, image: string, bio: string }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center transform hover:scale-105 transition-transform duration-300">
        <img src={image} alt={name} className="w-full md:w-1/3 h-64 md:h-auto object-cover" />
        <div className="p-6">
            <h3 className="font-teko text-4xl text-red-500">{name}</h3>
            <p className="text-lg font-bold text-white mb-2">{specialty}</p>
            <p className="text-gray-400">{bio}</p>
        </div>
    </div>
);


const AboutPage = (): React.ReactNode => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-teko text-7xl font-bold uppercase tracking-wider text-white">{t('about.title')}</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('about.subtitle')}</p>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="font-teko text-5xl text-white mb-4 uppercase">{t('about.philosophyTitle')}</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {t('about.philosophyText')}
          </p>
      </div>

      <div className="mb-12">
        <h2 className="font-teko text-5xl text-white mb-8 uppercase text-center">{t('about.coachesTitle')}</h2>
        <div className="space-y-8">
            <CoachProfile 
                name="Alex 'The Rep' Riley"
                specialty={t('about.coach1Specialty')}
                image="https://picsum.photos/400/400?random=5"
                bio={t('about.coach1Bio')}
            />
            <CoachProfile 
                name="Maria 'Cardio Queen' Sanchez"
                specialty={t('about.coach2Specialty')}
                image="https://picsum.photos/400/400?random=6"
                bio={t('about.coach2Bio')}
            />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
