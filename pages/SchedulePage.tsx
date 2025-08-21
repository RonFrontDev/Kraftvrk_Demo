
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SchedulePage = (): React.ReactNode => {
  const { t } = useLanguage();

  const scheduleData = {
    [t('schedule.dayMonday')]: ['6:00 AM', '7:00 AM', '12:00 PM', '4:30 PM', '5:30 PM', '6:30 PM'],
    [t('schedule.dayTuesday')]: ['6:00 AM', '7:00 AM', '12:00 PM', '4:30 PM', '5:30 PM', '6:30 PM'],
    [t('schedule.dayWednesday')]: ['6:00 AM', '7:00 AM', '12:00 PM', '4:30 PM', '5:30 PM', '6:30 PM'],
    [t('schedule.dayThursday')]: ['6:00 AM', '7:00 AM', '12:00 PM', '4:30 PM', '5:30 PM', '6:30 PM'],
    [t('schedule.dayFriday')]: ['6:00 AM', '7:00 AM', '12:00 PM', '4:30 PM', '5:30 PM'],
    [t('schedule.daySaturday')]: ['9:00 AM', `10:00 AM (${t('schedule.openGym')})`],
    [t('schedule.daySunday')]: [t('schedule.closed')],
  };

  const daysInOrder = [
    t('schedule.dayMonday'),
    t('schedule.dayTuesday'),
    t('schedule.dayWednesday'),
    t('schedule.dayThursday'),
    t('schedule.dayFriday'),
    t('schedule.daySaturday'),
    t('schedule.daySunday'),
  ];


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-teko text-7xl font-bold uppercase tracking-wider text-white">{t('schedule.title')}</h1>
        <p className="text-xl text-gray-400">{t('schedule.subtitle')}</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {daysInOrder.map((day) => (
            <div key={day} className="border-b md:border-b-0 md:border-r border-gray-700 p-6 last:border-r-0">
              <h2 className="font-teko text-4xl text-red-500 uppercase tracking-wider mb-4">{day}</h2>
              <ul className="space-y-2">
                {scheduleData[day].map(time => (
                  <li key={time} className="text-lg text-gray-300 bg-gray-700/50 p-2 rounded-md text-center">{time}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SchedulePage;
