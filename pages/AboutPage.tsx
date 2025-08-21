
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
            {coachesData.map(coach => (
              <CoachProfile 
                  key={coach.name}
                  name={coach.name}
                  specialty={t(coach.specialtyKey)}
                  image={`https://picsum.photos/400/400?random=${coach.imageId}`}
                  bio={t(coach.bioKey)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;