


import React, { useState, useMemo } from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { coachesData, getClassById, ClassType, classesData, ClassKey } from '../data/roster';
import type { Coach } from '../data/roster';
import Image from '../components/Image';

// A simple, non-animated presentational component for a coach's profile.
// FIX: Removed explicit JSX.Element return type to fix JSX namespace error.
const CoachProfile = ({ coach, classes }: { coach: Coach, classes: ClassType[] }) => {
    const { t } = useLanguage();
    return (
        <div
            id={`coach-${coach.id}`}
            className="bg-white dark:bg-[#1c1c1e] overflow-hidden flex flex-col md:flex-row items-center shadow-lg rounded-2xl scroll-mt-32"
        >
            <Image src={coach.image} alt={coach.name} className="w-full aspect-square md:w-80 flex-shrink-0" />
            <div className="p-8 w-full">
                <h3 className="text-4xl font-bold text-accent">{coach.name}</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t(coach.specialtyKey)}</p>
                <p className="text-gray-600 dark:text-gray-400">{t(coach.bioKey)}</p>

                {classes.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-bold text-gray-900 dark:text-white uppercase mb-3 tracking-wider">Teaches:</h4>
                        <div className="flex flex-wrap gap-2">
                            {classes.map(cls => (
                                <NavLink key={cls.id} to="/classes" className="bg-accent/20 text-accent text-sm font-medium px-3 py-1 rounded-full hover:bg-accent/40 transition-colors">
                                    {t(cls.titleKey)}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// FIX: Removed explicit JSX.Element return type to fix JSX namespace error.
const CoachesPage = () => {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState<ClassKey | 'all'>('all');

    const filteredCoaches = useMemo(() => {
        if (activeFilter === 'all') {
            return coachesData;
        }
        return coachesData.filter(coach => coach.classes.includes(activeFilter));
    }, [activeFilter]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <div className="text-center mb-12">
                <h1 className="text-7xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('coaches.title')}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('coaches.subtitle')}</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
                <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#101012] focus:ring-accent ${activeFilter === 'all' ? 'bg-accent text-black' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                >
                    {t('coaches.filterAll')}
                </button>
                {classesData.map(cls => (
                    <button
                        key={cls.id}
                        onClick={() => setActiveFilter(cls.id)}
                        className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#101012] focus:ring-accent ${activeFilter === cls.id ? 'bg-accent text-black' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                    >
                        {t(cls.titleKey)}
                    </button>
                ))}
            </div>

            <div className="space-y-8">
                <AnimatePresence>
                    {filteredCoaches.map(coach => {
                        const taughtClasses = coach.classes.map(classId => getClassById(classId)).filter(Boolean) as ClassType[];
                        return (
                            <motion.div
                                key={coach.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            >
                                <CoachProfile 
                                    coach={coach}
                                    classes={taughtClasses}
                                />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CoachesPage;
