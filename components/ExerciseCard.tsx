import React from 'react';
import type { Exercise } from '../types';
import Image from './Image';
import { imageAssets } from '../data/images';

interface ExerciseCardProps {
    exercise: Exercise;
    onClick: () => void;
}

// Simple hash function to get a consistent number for an image from a string
const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash % 100); // return a number between 0-99
};


const ExerciseCard = ({ exercise, onClick }: ExerciseCardProps): React.ReactNode => {
    const imageId = simpleHash(exercise.name);
    
    return (
        <div 
            onClick={onClick}
            className="bg-white dark:bg-[#1A1A1C] overflow-hidden group shadow-lg rounded-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
        >
            <div className="relative aspect-square w-full overflow-hidden">
                <Image 
                    src={`https://picsum.photos/400/400?random=${imageId}`} 
                    alt={exercise.name} 
                    className="absolute inset-0 w-full h-full" 
                    imageClassName="transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="p-4 flex flex-col flex-grow justify-end -mt-16 relative z-10">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide text-center drop-shadow-lg">{exercise.name}</h3>
            </div>
        </div>
    );
};

export default ExerciseCard;