
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface WodGenerationPanelProps {
    wodType: 'individual' | 'team';
    onWodTypeChange: (type: 'individual' | 'team') => void;
    onGenerate: () => void;
    onWrite: () => void;
    selectedDate: Date;
    isLoading: boolean;
}

const WodGenerationPanel = ({ wodType, onWodTypeChange, onGenerate, onWrite, selectedDate, isLoading }: WodGenerationPanelProps): React.ReactNode => {
    const { t } = useLanguage();

    return (
        <div className="text-center h-full flex flex-col justify-center min-h-[300px]">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{t('wod.noWodForDate')}</p>
            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md shadow-sm bg-gray-200 dark:bg-gray-900 p-1 border border-gray-300 dark:border-gray-700">
                    <button onClick={() => onWodTypeChange('individual')} className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-l-md transition-colors duration-200 ${wodType === 'individual' ? 'bg-accent text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                        {t('wod.typeIndividual')}
                    </button>
                    <button onClick={() => onWodTypeChange('team')} className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-r-md transition-colors duration-200 ${wodType === 'team' ? 'bg-accent text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                        {t('wod.typeTeam')}
                    </button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={onGenerate} disabled={isLoading} className="flex-1 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-accent-dark transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md">
                    {t(wodType === 'individual' ? 'wod.generateIndividualWod' : 'wod.generateTeamWod', { date: selectedDate.toLocaleDateString(t('langCode') as string, { month: 'long', day: 'numeric' }) })}
                </button>
                <button onClick={onWrite} disabled={isLoading} className="flex-1 bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-800 disabled:cursor-not-allowed shadow-md">
                    {t('wod.writeOwnWod')}
                </button>
            </div>
        </div>
    );
};

export default WodGenerationPanel;
