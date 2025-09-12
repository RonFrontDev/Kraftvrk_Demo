import React from 'react';
import { WodSection } from '../types';
import { RefreshIcon, ScaleDownIcon, ScaleUpIcon } from './IconComponents';
import Spinner from './Spinner';
import { useLanguage } from '../contexts/LanguageContext';

interface WodSectionCardProps {
  section: WodSection;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

const WodSectionCard = ({ section, onRegenerate, isRegenerating }: WodSectionCardProps): React.ReactNode => {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-[#1c1c1e] p-8 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 dark:border-gray-700 pb-3">
        <div className="flex-1">
            <h3 className="text-4xl font-bold text-accent uppercase tracking-wider">{section.title}</h3>
            {section.duration && <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">{section.duration}</p>}
        </div>
        <button 
            onClick={onRegenerate} 
            disabled={isRegenerating}
            className="text-gray-500 dark:text-gray-400 hover:text-accent disabled:text-gray-600 disabled:cursor-wait transition-colors"
            aria-label={t('wod.regenerateSection')}
        >
            <RefreshIcon className={`h-6 w-6 ${isRegenerating ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {isRegenerating ? (
        <div className="flex items-center justify-center h-24">
            <Spinner size="8" />
            <p className="ml-4 text-lg">{t('wod.regeneratingSection')}</p>
        </div>
      ) : (
        <>
            <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            {section.details.map((item, index) => (
                <li key={index} className="text-lg">{item}</li>
            ))}
            </ul>

            {section.scalingOptions && (section.scalingOptions.beginner.length > 0 || section.scalingOptions.advanced.length > 0) && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">{t('wod.scalingOptions')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.scalingOptions.beginner.length > 0 && (
                            <div>
                                <div className="flex items-center text-green-500 dark:text-green-400 mb-2">
                                    <ScaleDownIcon className="h-5 w-5 mr-2"/>
                                    <h5 className="font-semibold uppercase">{t('wod.beginner')}</h5>
                                </div>
                                <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                                    {section.scalingOptions.beginner.map((item, idx) => <li key={idx}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                        {section.scalingOptions.advanced.length > 0 && (
                            <div>
                                <div className="flex items-center text-red-500 dark:text-red-400 mb-2">
                                    <ScaleUpIcon className="h-5 w-5 mr-2"/>
                                    <h5 className="font-semibold uppercase">{t('wod.advanced')}</h5>
                                </div>
                                <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                                    {section.scalingOptions.advanced.map((item, idx) => <li key={idx}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default WodSectionCard;