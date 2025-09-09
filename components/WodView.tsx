import React from 'react';
import type { Wod } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ScaleDownIcon, ScaleUpIcon } from './IconComponents';

const WodView = ({ wod }: { wod: Wod }): React.ReactNode => {
    const { t } = useLanguage();
    return (
        <div className="space-y-4">
            {wod.goal && (
                <div className="bg-black/5 dark:bg-black/30 p-4 border-l-4 border-accent rounded-r-md mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-lg">{t('wod.goal')}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{wod.goal}</p>
                </div>
            )}
            {wod.sections.map((section, index) => (
                <div key={index} className="bg-white dark:bg-[#1c1c1e] p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 dark:border-gray-700 pb-3">
                        <div>
                            <h4 className="text-2xl font-bold text-accent uppercase tracking-wider">{section.title}</h4>
                            {section.duration && <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">{section.duration}</p>}
                        </div>
                    </div>
                    <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                        {section.details.map((item, i) => (
                            <li key={i} className="text-lg">{item}</li>
                        ))}
                    </ul>
                     {section.scalingOptions && (section.scalingOptions.beginner.length > 0 || section.scalingOptions.advanced.length > 0) && (
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                </div>
            ))}
        </div>
    );
};

export default WodView;
