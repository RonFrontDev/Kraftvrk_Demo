
import React from 'react';
import type { Wod } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import WodSectionCard from './WodSectionCard';
import { PinIcon, RefreshIcon, PencilIcon } from './IconComponents';

interface WodDisplayPanelProps {
    wod: Wod;
    onPin: () => void;
    onEdit: () => void;
    onRegenerateFull: () => void;
    onRegenerateSection: (index: number) => void;
    isTransient: boolean;
    isLoading: boolean;
    loadingSection: number | null;
}

const WodDisplayPanel = ({
    wod,
    onPin,
    onEdit,
    onRegenerateFull,
    onRegenerateSection,
    isTransient,
    isLoading,
    loadingSection
}: WodDisplayPanelProps): React.ReactNode => {
    const { t } = useLanguage();

    return (
        <div className="space-y-4">
            {wod.goal && (
                <div className="bg-black/5 dark:bg-black/30 p-4 border-l-4 border-accent rounded-r-md">
                    <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-lg">{t('wod.goal')}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{wod.goal}</p>
                </div>
            )}
            {wod.sections.map((section, index) => (
                <WodSectionCard
                    key={index}
                    section={section}
                    onRegenerate={() => onRegenerateSection(index)}
                    isRegenerating={loadingSection === index}
                />
            ))}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {isTransient && (
                    <button onClick={onPin} className="flex-1 bg-green-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-green-500 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1">
                        <PinIcon className="h-6 w-6 mr-3" />
                        {t('wod.pinWod')}
                    </button>
                )}
                <button onClick={onEdit} disabled={isLoading || loadingSection !== null} className="flex-1 bg-gray-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-gray-500 disabled:bg-gray-800 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    <PencilIcon className="h-5 w-5 mr-3" />
                    {t('wod.editWod')}
                </button>
                <button onClick={onRegenerateFull} disabled={isLoading || loadingSection !== null} className="flex-1 bg-blue-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-blue-500 disabled:bg-gray-800 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    <RefreshIcon className={`h-6 w-6 mr-3 ${isLoading && loadingSection === null ? 'animate-spin' : ''}`} />
                    {t('wod.regenerateWod')}
                </button>
            </div>
        </div>
    );
};

export default WodDisplayPanel;
