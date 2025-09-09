import React, { useEffect, useRef } from 'react';
import type { Wod } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { XIcon } from './IconComponents';
import WodView from './WodView';

interface WodPreviewModalProps {
    wod: Wod | null;
    onClose: () => void;
    classTime: string;
}

const WodPreviewModal = ({ wod, onClose, classTime }: WodPreviewModalProps): React.ReactNode => {
    const { t } = useLanguage();
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
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
            <div 
                ref={modalRef} 
                className="bg-gray-100 dark:bg-[#1A1A1C] rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                role="dialog"
                aria-modal="true"
                aria-labelledby="wod-preview-title"
            >
                <div className="sticky top-0 bg-gray-100 dark:bg-[#1A1A1C] p-6 z-10 border-b border-gray-200 dark:border-gray-800">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
                        aria-label="Close modal"
                    >
                        <XIcon className="h-8 w-8" />
                    </button>
                    <h2 id="wod-preview-title" className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                        {t('schedule.wodPreviewTitle')}
                    </h2>
                    <p className="text-accent font-bold">{classTime}</p>
                </div>
                
                <div className="p-6">
                    {wod ? (
                        <WodView wod={wod} />
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-600 dark:text-gray-400">{t('schedule.wodNotRevealed')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WodPreviewModal;
