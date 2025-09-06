import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { XIcon } from './IconComponents';
import type { ClassInfo } from '../pages/SchedulePage';
import { classDetailsMap } from '../pages/SchedulePage';

interface ClassDetailModalProps {
    classInfo: ClassInfo;
    onClose: () => void;
}

const ClassDetailModal = ({ classInfo, onClose }: ClassDetailModalProps): React.ReactNode => {
    const { t } = useLanguage();
    const modalRef = useRef<HTMLDivElement>(null);
    
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

    const details = classDetailsMap[classInfo.type];
    
    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
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
                className="bg-white dark:bg-[#1A1A1C] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-8"
                role="dialog"
                aria-modal="true"
                aria-labelledby="class-title"
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-accent transition-colors z-20"
                    aria-label="Close modal"
                >
                    <XIcon className="h-8 w-8" />
                </button>
                
                <h2 id="class-title" className="text-4xl font-extrabold text-accent uppercase tracking-wider mb-2">{t(details.nameKey)}</h2>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <p><span className="font-bold text-gray-800 dark:text-gray-200">Time:</span> {classInfo.time}</p>
                    <p><span className="font-bold text-gray-800 dark:text-gray-200">Coach:</span> {classInfo.coach ? t(classInfo.coach) : 'N/A'}</p>
                </div>
                
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Description</h3>
                    <p>{t(details.descKey)}</p>
                </div>
            </div>
        </div>
    );
};

export default ClassDetailModal;
