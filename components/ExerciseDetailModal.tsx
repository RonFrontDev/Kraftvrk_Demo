import React, { useEffect, useRef } from 'react';
import type { Exercise } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { XIcon } from './IconComponents';

interface ExerciseDetailModalProps {
    exercise: Exercise;
    onClose: () => void;
}

// Same hash function as in the card
const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return Math.abs(hash % 100);
};

const ExerciseDetailModal = ({ exercise, onClose }: ExerciseDetailModalProps): React.ReactNode => {
    const { t } = useLanguage();
    const modalRef = useRef<HTMLDivElement>(null);
    const imageId = simpleHash(exercise.name);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };
    
    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
            onClick={handleBackdropClick}
        >
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                `}
            </style>
            <div 
                ref={modalRef} 
                className="bg-white dark:bg-[#1A1A1C] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                role="dialog"
                aria-modal="true"
                aria-labelledby="exercise-title"
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-accent transition-colors z-20"
                    aria-label="Close modal"
                >
                    <XIcon className="h-8 w-8" />
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-video lg:aspect-square">
                         <img 
                            src={`https://picsum.photos/800/800?random=${imageId}`} 
                            alt={exercise.name} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="p-8">
                        <h2 id="exercise-title" className="text-4xl font-extrabold text-accent uppercase tracking-wider mb-2">{exercise.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 italic">{exercise.description}</p>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">{t('library.instructions')}</h3>
                                <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
                                    {exercise.instructions.map((step, index) => <li key={index}>{step}</li>)}
                                </ol>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">{t('library.equipment')}</h3>
                                <ul className="flex flex-wrap gap-2">
                                    {exercise.equipment.length > 0 ? exercise.equipment.map((item, index) => (
                                        <li key={index} className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full">{item}</li>
                                    )) : <li className="text-gray-500">{t('library.noEquipment')}</li>}
                                </ul>
                            </div>

                             <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">{t('library.primaryMuscles')}</h3>
                                <ul className="flex flex-wrap gap-2">
                                    {exercise.primaryMuscles.map((muscle, index) => (
                                        <li key={index} className="bg-accent/20 text-accent text-sm font-medium px-3 py-1 rounded-full">{muscle}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetailModal;