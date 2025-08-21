import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CoachProfile = ({ name, specialty, image, bio }: { name: string, specialty: string, image: string, bio: string }) => (
    <div className="bg-white dark:bg-[#1c1c1e] overflow-hidden flex flex-col md:flex-row items-center transform hover:scale-[1.02] transition-transform duration-300 shadow-lg rounded-md">
        <img src={image} alt={name} className="w-full md:w-1/3 h-64 md:h-auto object-cover" />
        <div className="p-8">
            <h3 className="text-4xl font-bold text-accent">{name}</h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">{specialty}</p>
            <p className="text-gray-600 dark:text-gray-400">{bio}</p>
        </div>
    </div>
);

const coachesData = [
  { name: "Alex 'The Rep' Riley", specialtyKey: 'about.coach1Specialty', bioKey: 'about.coach1Bio', imageId: '5' },
  { name: "Maria 'Cardio Queen' Sanchez", specialtyKey: 'about.coach2Specialty', bioKey: 'about.coach2Bio', imageId: '6' },
  { name: 'David "The Engine" Chen', specialtyKey: 'about.coach3Specialty', bioKey: 'about.coach3Bio', imageId: '7' },
  { name: 'Emily "Guns" Johnson', specialtyKey: 'about.coach4Specialty', bioKey: 'about.coach4Bio', imageId: '8' },
  { name: 'Frank "The Tank" Kowalski', specialtyKey: 'about.coach5Specialty', bioKey: 'about.coach5Bio', imageId: '9' },
  { name: 'Chloe "Mobility" Kim', specialtyKey: 'about.coach6Specialty', bioKey: 'about.coach6Bio', imageId: '10' },
  { name: 'Brian "Barbell" O\'Connell', specialtyKey: 'about.coach7Specialty', bioKey: 'about.coach7Bio', imageId: '11' },
  { name: 'Olivia "Pistol" Petrova', specialtyKey: 'about.coach8Specialty', bioKey: 'about.coach8Bio', imageId: '12' },
  { name: 'Marcus "Metcon" Washington', specialtyKey: 'about.coach9Specialty', bioKey: 'about.coach9Bio', imageId: '13' },
  { name: 'Isabelle "The Iron" Dubois', specialtyKey: 'about.coach10Specialty', bioKey: 'about.coach10Bio', imageId: '14' },
];

const AboutPage = (): React.ReactNode => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('about.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('about.subtitle')}</p>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] p-10 mb-16 shadow-lg rounded-md">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 uppercase">{t('about.philosophyTitle')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('about.philosophyText')}
          </p>
      </div>

      <div className="mb-12">
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-8 uppercase text-center">{t('about.coachesTitle')}</h2>
        <div className="space-y-8">
            {coachesData.map(coach => (
              <CoachProfile 
                  key={coach.name}
                  name={coach.name}
                  specialty={t(coach.specialtyKey)}
                  image={`https://i.pravatar.cc/400?u=${coach.imageId}`}
                  bio={t(coach.bioKey)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;