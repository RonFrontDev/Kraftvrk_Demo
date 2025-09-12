import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface WodGenerationPanelProps {
    wodType: 'individual' | 'team' | 'competition';
    onWodTypeChange: (type: 'individual' | 'team' | 'competition') => void;
    onGenerate: () => void;
    onGenerateFullWeek: () => void;
    onWrite: () => void;
    selectedDate: Date;
    isLoading: boolean;
}

const WodGenerationPanel = ({ wodType, onWodTypeChange, onGenerate, onGenerateFullWeek, onWrite, selectedDate, isLoading }: WodGenerationPanelProps): React.ReactNode => {
    const { t } = useLanguage();

    const getGenerateButtonTextKey = () => {
        switch(wodType) {
            case 'team': return 'wod.generateTeamWod';
            case 'competition': return 'wod.generateCompetitionWod';
            case 'individual':
            default: return 'wod.generateIndividualWod';
        }
    };

    return (
        <div className="text-center h-full flex flex-col justify-center min-h-[300px]">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{t('wod.noWodForDate')}</p>
            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-full shadow-sm bg-gray-200 dark:bg-gray-900 p-1 border border-gray-300 dark:border-gray-700">
                    <button onClick={() => onWodTypeChange('individual')} className={`px-4 sm:px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-l-full transition-colors duration-200 ${wodType === 'individual' ? 'bg-accent text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                        {t('wod.typeIndividual')}
                    </button>
                    <button onClick={() => onWodTypeChange('team')} className={`px-4 sm:px-6 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${wodType === 'team' ? 'bg-accent text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                        {t('wod.typeTeam')}
                    </button>
                    <button onClick={() => onWodTypeChange('competition')} className={`px-4 sm:px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-r-full transition-colors duration-200 ${wodType === 'competition' ? 'bg-accent text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                        {t('wod.typeCompetition')}
                    </button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={onGenerate} disabled={isLoading} className="flex-1 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-full hover:bg-accent-dark transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md">
                    {t(getGenerateButtonTextKey(), { date: selectedDate.toLocaleDateString(t('langCode') as string, { month: 'long', day: 'numeric' }) })}
                </button>
                <button onClick={onWrite} disabled={isLoading} className="flex-1 bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-800 disabled:cursor-not-allowed shadow-md">
                    {t('wod.writeOwnWod')}
                </button>
            </div>
            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 uppercase text-sm font-medium">Or</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <button onClick={onGenerateFullWeek} disabled={isLoading} className="w-full bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed shadow-lg">
                {t('wod.generateFullWeek')}
            </button>
        </div>
    );
};

export default WodGenerationPanel;