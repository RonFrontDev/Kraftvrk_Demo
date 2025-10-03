


import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { staticExercises } from '../data/exercises';
import type { Exercise, ExerciseCategory } from '../types';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseDetailModal from '../components/ExerciseDetailModal';
import { Input } from '../components/ui/input';

const categories: (ExerciseCategory | 'all')[] = ['all', 'bootcamp', 'crossfit', 'weightlifting'];

// FIX: Removed explicit JSX.Element return type to fix JSX namespace error.
const ExerciseLibraryPage = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<ExerciseCategory | 'all'>('all');
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [equipmentFilter, setEquipmentFilter] = useState('');

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
    
    const displayedExercises = useMemo(() => {
        let filtered = allExercises;

        // Category filter
        if (activeCategory !== 'all') {
            filtered = filtered.filter(ex => ex.categories.includes(activeCategory as ExerciseCategory));
        }

        // Search term filter (name)
        if (searchTerm) {
            filtered = filtered.filter(ex => 
                ex.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Equipment filter
        if (equipmentFilter) {
            const lowerCaseEquipmentFilter = equipmentFilter.toLowerCase();
            const noEquipmentTerm = t('library.noEquipment').toLowerCase();
            
            filtered = filtered.filter(ex => {
                if (ex.equipment.length === 0) {
                    return noEquipmentTerm.includes(lowerCaseEquipmentFilter);
                }
                return ex.equipment.some(eq => 
                    eq.toLowerCase().includes(lowerCaseEquipmentFilter)
                );
            });
        }

        return filtered;
    }, [allExercises, activeCategory, searchTerm, equipmentFilter, t]);

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
                <div className="text-center mb-12">
                    <h1 className="text-7xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white">{t('library.title')}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">{t('library.subtitle')}</p>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-500">{t('library.introduction')}</p>
                </div>

                <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8 flex-wrap">
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
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
                    <Input
                        type="text"
                        placeholder={t('library.searchNamePlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A1A1C]"
                        aria-label="Search by exercise name"
                    />
                    <Input
                        type="text"
                        placeholder={t('library.searchEquipmentPlaceholder')}
                        value={equipmentFilter}
                        onChange={(e) => setEquipmentFilter(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A1A1C]"
                        aria-label="Search by equipment"
                    />
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