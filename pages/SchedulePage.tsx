
import React, { useState, useEffect } from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ClassDetailModal from '../components/ClassDetailModal';
import WodPreviewModal from '../components/WodPreviewModal';
import { scheduleData, getCoachById, classDetailsMap } from '../data/roster';
import type { ScheduleClassInfo, ScheduleClassType } from '../data/roster';
import type { Wod, WodSection } from '../types';

const classImageMap: Record<ScheduleClassType, string> = {
  wod: 'https://images.pexels.com/photos/4753928/pexels-photo-4753928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  opengym: 'https://images.pexels.com/photos/7031705/pexels-photo-7031705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  community: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  closed: 'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const toYYYYMMDD = (date: Date): string => date.toISOString().split('T')[0];

const migrateWodsFromStorage = (storedWods: string | null): { [date: string]: Wod } => {
  if (!storedWods) return {};
  try {
    const parsedWods = JSON.parse(storedWods);
    const migratedWods: { [date: string]: Wod } = {};
    Object.keys(parsedWods).forEach(date => {
      const wod = parsedWods[date];
      if (wod && wod.sections) {
        migratedWods[date] = {
          ...wod,
          goal: wod.goal || '',
          sections: wod.sections.map((sec: WodSection) => ({
            ...sec,
            scalingOptions: sec.scalingOptions || { beginner: [], advanced: [] }
          })),
          type: wod.type || 'individual'
        };
      }
    });
    return migratedWods;
  } catch (e) {
    console.error("Failed to parse or migrate WODs from localStorage", e);
    return {};
  }
};

const ClassEntry = ({ classInfo, onClassClick }: { classInfo: ScheduleClassInfo, onClassClick: () => void }) => {
    const { t } = useLanguage();
    
    const details = classDetailsMap[classInfo.classId];
    const coach = classInfo.coachId && classInfo.coachId !== 'team' ? getCoachById(classInfo.coachId) : null;
    
    const getCoachName = () => {
        if (classInfo.coachId === 'team') return t('schedule.coachTeam');
        if (coach) return coach.name;
        return t('schedule.unsupervised');
    };

    const handleCoachClick = (e: React.MouseEvent) => {
      // Prevent the modal from opening when the user intends to navigate to the coach's page.
      e.stopPropagation();
    };

    const isClickable = classInfo.classId !== 'closed';
    const imageUrl = classImageMap[classInfo.classId];

    return (
        <div
            onClick={isClickable ? onClassClick : undefined}
            className={`bg-gray-200 dark:bg-gray-900/50 p-4 rounded-md flex items-center gap-4 ${isClickable ? 'transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer' : ''}`}
        >
            <img src={imageUrl} alt={t(details.nameKey)} className="w-16 h-16 rounded-full object-cover border-2 border-accent/50 flex-shrink-0" />
            <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">{classInfo.time}</p>
                <p className="text-accent font-semibold">{t(details.nameKey)}</p>
                {coach ? (
                     <ReactRouterDOM.NavLink to={`/coaches#coach-${coach.id}`} onClick={handleCoachClick} className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent hover:underline transition-colors">
                        {getCoachName()}
                     </ReactRouterDOM.NavLink>
                ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{getCoachName()}</p>
                )}
            </div>
        </div>
    );
};

const SchedulePage = (): React.ReactNode => {
    const { t } = useLanguage();
    const today = new Date().getDay();
    const initialDayIndex = today === 0 ? 6 : today - 1;

    const [activeDayIndex, setActiveDayIndex] = useState(initialDayIndex);
    const [selectedClassForDetails, setSelectedClassForDetails] = useState<ScheduleClassInfo | null>(null);
    const [selectedClassForWod, setSelectedClassForWod] = useState<ScheduleClassInfo | null>(null);
    const [pinnedWods, setPinnedWods] = useState<{ [date: string]: Wod }>({});

    useEffect(() => {
        const storedWods = localStorage.getItem('kraftvrk_pinned_wods');
        const migratedWods = migrateWodsFromStorage(storedWods);
        setPinnedWods(migratedWods);
    }, []);

    const handleClassClick = (cls: ScheduleClassInfo) => {
        if (cls.classId === 'wod') {
            setSelectedClassForWod(cls);
        } else {
            setSelectedClassForDetails(cls);
        }
    };
  
    const activeDay = scheduleData[activeDayIndex];

    const dateForWod = new Date();
    const currentDayOfWeek = dateForWod.getDay(); // Sunday - 0, ... Saturday - 6
    const adjustedCurrentDay = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Monday - 0, ... Sunday - 6
    const dayDifference = activeDayIndex - adjustedCurrentDay;
    dateForWod.setDate(dateForWod.getDate() + dayDifference);
    const wodForSelectedDay = pinnedWods[toYYYYMMDD(dateForWod)];

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
                <div className="text-center mb-12">
                    <h1 className="text-7xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('schedule.title')}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">{t('schedule.subtitle')}</p>
                </div>
                
                <div className="bg-white dark:bg-[#1c1c1e] rounded-lg shadow-2xl overflow-hidden">
                    <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-800">
                        {scheduleData.map((day, index) => (
                            <button 
                                key={day.dayKey}
                                onClick={() => setActiveDayIndex(index)}
                                className={`flex-1 text-center py-4 px-2 font-bold uppercase tracking-wider text-sm sm:text-base transition-colors duration-300 ${activeDayIndex === index ? 'text-accent border-b-4 border-accent' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                            >
                                {t(day.dayKey)}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {activeDay.classes.length > 0 && activeDay.classes[0].classId !== 'closed' ? (
                                activeDay.classes.map((cls, index) => (
                                    <ClassEntry 
                                        key={index} 
                                        classInfo={cls} 
                                        onClassClick={() => handleClassClick(cls)}
                                    />
                                ))
                            ) : (
                                <div className="md:col-span-2 lg:col-span-3 bg-gray-200 dark:bg-gray-900/50 p-8 rounded-md text-center flex flex-col items-center justify-center gap-4">
                                     <img src={classImageMap.closed} alt={t('schedule.closed')} className="w-24 h-24 rounded-full object-cover border-4 border-gray-400 dark:border-gray-700 filter grayscale" />
                                    <p className="font-bold text-2xl text-gray-700 dark:text-gray-300">{t('schedule.closed')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {selectedClassForDetails && (
                <ClassDetailModal 
                    classInfo={selectedClassForDetails} 
                    onClose={() => setSelectedClassForDetails(null)} 
                />
            )}
            {selectedClassForWod && (
                <WodPreviewModal
                    wod={wodForSelectedDay || null}
                    classTime={selectedClassForWod.time}
                    onClose={() => setSelectedClassForWod(null)}
                />
            )}
        </>
    );
};

export default SchedulePage;
