import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ClassDetailModal from '../components/ClassDetailModal';

export type ClassType = 'wod' | 'opengym' | 'community' | 'closed';

export interface ClassInfo {
  time: string;
  type: ClassType;
  coach: string;
}

export const classDetailsMap: Record<ClassType, { nameKey: string, descKey: string }> = {
  wod: {
    nameKey: 'schedule.classWod',
    descKey: 'schedule.classWodDesc'
  },
  opengym: {
    nameKey: 'schedule.classOpenGym',
    descKey: 'schedule.classOpenGymDesc'
  },
  community: {
    nameKey: 'schedule.classCommunityWod',
    descKey: 'schedule.classCommunityWodDesc'
  },
  closed: {
    nameKey: 'schedule.closed',
    descKey: 'schedule.closedDesc'
  }
};

const scheduleData: { day: string, classes: ClassInfo[] }[] = [
  {
    day: 'schedule.dayMonday',
    classes: [
      { time: '06:00 - 07:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '18:30 - 19:30', type: 'wod', coach: 'schedule.coachAlex' },
    ],
  },
  {
    day: 'schedule.dayTuesday',
    classes: [
      { time: '06:00 - 07:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '18:30 - 19:30', type: 'wod', coach: 'schedule.coachAlex' },
    ],
  },
    {
    day: 'schedule.dayWednesday',
    classes: [
      { time: '06:00 - 07:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '18:30 - 19:30', type: 'wod', coach: 'schedule.coachAlex' },
    ],
  },
  {
    day: 'schedule.dayThursday',
    classes: [
      { time: '06:00 - 07:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '18:30 - 19:30', type: 'wod', coach: 'schedule.coachAlex' },
    ],
  },
  {
    day: 'schedule.dayFriday',
    classes: [
      { time: '06:00 - 07:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '07:00 - 08:00', type: 'wod', coach: 'schedule.coachAlex' },
      { time: '12:00 - 13:00', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '16:30 - 17:30', type: 'wod', coach: 'schedule.coachMaria' },
      { time: '17:30 - 18:30', type: 'wod', coach: 'schedule.coachMaria' },
    ],
  },
  {
    day: 'schedule.daySaturday',
    classes: [
      { time: '09:00 - 10:00', type: 'community', coach: 'schedule.coachTeam' },
      { time: '10:00 - 11:30', type: 'opengym', coach: 'schedule.unsupervised' },
    ],
  },
  {
    day: 'schedule.daySunday',
    classes: [
      { time: '', type: 'closed', coach: '' }
    ],
  },
];


const ClassEntry = ({ classInfo, onClick }: { classInfo: ClassInfo, onClick: () => void }) => {
    const { t } = useLanguage();
    const isClickable = classInfo.type !== 'closed';

    return (
        <div 
            onClick={isClickable ? onClick : undefined} 
            className={`bg-gray-200 dark:bg-gray-900/50 p-4 rounded-md border-l-4 border-gray-400 dark:border-gray-700 ${isClickable ? 'transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-800 hover:border-accent cursor-pointer' : ''}`}
        >
            <p className="font-bold text-lg text-gray-900 dark:text-white">{classInfo.time}</p>
            <p className="text-accent font-semibold">{t(classDetailsMap[classInfo.type].nameKey)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{classInfo.coach ? t(classInfo.coach) : ''}</p>
        </div>
    );
};

const SchedulePage = (): React.ReactNode => {
    const { t } = useLanguage();
    // Get current day, but Sunday (0) should be the last day (6)
    const today = new Date().getDay();
    const initialDayIndex = today === 0 ? 6 : today - 1;

    const [activeDayIndex, setActiveDayIndex] = useState(initialDayIndex);
    const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);

    const activeDay = scheduleData[activeDayIndex];
  
    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
                <div className="text-center mb-12">
                    <h1 className="text-7xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('schedule.title')}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">{t('schedule.subtitle')}</p>
                </div>
                
                <div className="bg-white dark:bg-[#1c1c1e] rounded-lg shadow-2xl overflow-hidden">
                    {/* Day Tabs */}
                    <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-800">
                        {scheduleData.map((day, index) => (
                            <button 
                                key={day.day}
                                onClick={() => setActiveDayIndex(index)}
                                className={`flex-1 text-center py-4 px-2 font-bold uppercase tracking-wider text-sm sm:text-base transition-colors duration-300 ${activeDayIndex === index ? 'text-accent border-b-4 border-accent' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                            >
                                {t(day.day)}
                            </button>
                        ))}
                    </div>

                    {/* Class List */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {activeDay.classes.length > 0 && activeDay.classes[0].type !== 'closed' ? (
                                activeDay.classes.map((cls, index) => (
                                    <ClassEntry 
                                        key={index} 
                                        classInfo={cls} 
                                        onClick={() => setSelectedClass(cls)}
                                    />
                                ))
                            ) : (
                                <div className="md:col-span-2 lg:col-span-3 bg-gray-200 dark:bg-gray-900/50 p-8 rounded-md text-center">
                                    <p className="font-bold text-2xl text-gray-700 dark:text-gray-300">{t('schedule.closed')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {selectedClass && (
                <ClassDetailModal 
                    classInfo={selectedClass} 
                    onClose={() => setSelectedClass(null)} 
                />
            )}
        </>
    );
};

export default SchedulePage;
