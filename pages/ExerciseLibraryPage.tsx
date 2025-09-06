
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { staticExercises } from '../data/exercises';
import type { Exercise, ExerciseCategory } from '../types';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseDetailModal from '../components/ExerciseDetailModal';

const categories: (ExerciseCategory | 'all')[] = ['all', 'bootcamp', 'crossfit', 'weightlifting'];

const ExerciseLibraryPage = (): React.ReactNode => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<ExerciseCategory | 'all'>('all');
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const allExercises = useMemo((): Exercise[] => {
        return staticExercises.map(ex => {
            const key = `library.exercises.${ex.id}`;
            const instructions = t(`${key}.instructions`);
            const equipment = t(`${key}.equipment`);
            const primaryMuscles = t(`${key}.primaryMuscles`);
            
            return {
                name: t(`${key}.name`),
                description: t(`${key}.description`),
                instructions: Array.isArray(instructions) ? instructions : [],
                equipment: Array.isArray(equipment) ? equipment : [],
                primaryMuscles: Array.isArray(primaryMuscles) ? primaryMuscles : [],
                categories: ex.categories
            };
        });
    }, [t]);
    
    const displayedExercises = activeCategory === 'all'
        ? allExercises
        : allExercises.filter(ex => ex.categories.includes(activeCategory as ExerciseCategory));

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
                <div className="text-center mb-12">
                    <h1 className="text-7xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white">{t('library.title')}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">{t('library.subtitle')}</p>
                </div>

                <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#101012] focus:ring-accent ${activeCategory === category ? 'bg-accent text-black' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                        >
                            {t(`library.category_${category}`)}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayedExercises.map((exercise, index) => (
                        <ExerciseCard 
                            key={`${exercise.name}-${index}`} 
                            exercise={exercise} 
                            onClick={() => setSelectedExercise(exercise)} 
                        />
                    ))}
                </div>

            </div>
            {selectedExercise && (
                <ExerciseDetailModal 
                    exercise={selectedExercise} 
                    onClose={() => setSelectedExercise(null)} 
                />
            )}
        </>
    );
};

export default ExerciseLibraryPage;
