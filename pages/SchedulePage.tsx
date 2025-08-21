import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const scheduleData = [
  {
    day: 'schedule.dayMonday',
    classes: [
      { time: '06:00 - 07:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '18:30 - 19:30', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
    ],
  },
  {
    day: 'schedule.dayTuesday',
    classes: [
      { time: '06:00 - 07:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '18:30 - 19:30', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
    ],
  },
    {
    day: 'schedule.dayWednesday',
    classes: [
      { time: '06:00 - 07:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '18:30 - 19:30', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
    ],
  },
  {
    day: 'schedule.dayThursday',
    classes: [
      { time: '06:00 - 07:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '18:30 - 19:30', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
    ],
  },
  {
    day: 'schedule.dayFriday',
    classes: [
      { time: '06:00 - 07:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', name: 'schedule.classWod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', name: 'schedule.classWod', coach: 'schedule.coachMaria' },
    ],
  },
  {
    day: 'schedule.daySaturday',
    classes: [
      { time: '09:00 - 10:00', name: 'schedule.classCommunityWod', coach: 'schedule.coachTeam' },
      { time: '10:00 - 11:30', name: 'schedule.classOpenGym', coach: 'schedule.unsupervised' },
    ],
  },
  {
    day: 'schedule.daySunday',
    classes: [
      { time: '', name: 'schedule.closed', coach: '' }
    ],
  },
];

const ClassEntry = ({ time, name, coach }: { time: string, name: string, coach: string }) => (
    <div className="bg-gray-200 dark:bg-gray-900/50 p-4 rounded-sm transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-800 border-l-4 border-gray-400 dark:border-gray-700 hover:border-accent">
        <p className="font-bold text-lg text-gray-900 dark:text-white">{time}</p>
        <p className="text-accent font-semibold">{name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{coach}</p>
    </div>
);

const SchedulePage = (): React.ReactNode => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('schedule.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('schedule.subtitle')}</p>
      </div>
      
      <div className="bg-white dark:bg-[#1c1c1e] rounded-sm shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {scheduleData.map(({ day, classes }) => (
            <div key={day} className="p-6 border-gray-200 dark:border-gray-900 border">
              <h2 className="text-4xl font-bold text-accent uppercase tracking-wider mb-4 border-b-2 border-gray-200 dark:border-gray-700 pb-2">{t(day)}</h2>
              <div className="space-y-3">
                {classes.length > 0 && classes[0].name !== 'schedule.closed' ? (
                   classes.map((cls, index) => (
                    <ClassEntry 
                        key={index} 
                        time={cls.time} 
                        name={t(cls.name)} 
                        coach={cls.coach ? t(cls.coach) : ''}
                    />
                  ))
                ) : (
                    <div className="bg-gray-200 dark:bg-gray-900/50 p-4 rounded-sm text-center">
                        <p className="font-bold text-lg text-gray-700 dark:text-gray-300">{t('schedule.closed')}</p>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SchedulePage;