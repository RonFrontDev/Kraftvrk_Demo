import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { imageAssets } from '../data/images';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight as ArrowRightIcon } from 'lucide-react';

// FIX: Removed explicit JSX.Element return type to fix JSX namespace error.
const RentClubPage = () => {
  const { t } = useLanguage();

  // The t function can return arrays/objects if the key points to one.
  // We need to cast it to let TypeScript know.
  const equipmentList = t('rentClub.equipmentList') as unknown as string[];

  return (
    <div className="relative min-h-screen">
        {/* Background Image and Overlay */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url('${imageAssets.rentClubBg}')` }}
        />
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/20 max-w-5xl mx-auto">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-white">{t('rentClub.title')}</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-gray-300">{t('rentClub.text')}</p>
                </div>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
                    {/* Gym Description */}
                    <div className="text-left">
                        <h2 className="text-3xl font-bold uppercase tracking-wider text-accent mb-4">{t('rentClub.gymDescriptionTitle')}</h2>
                        <p className="text-gray-300 leading-relaxed">{t('rentClub.gymDescriptionText')}</p>
                    </div>

                    {/* Equipment List */}
                    <div className="text-left">
                        <h2 className="text-3xl font-bold uppercase tracking-wider text-accent mb-4">{t('rentClub.equipmentTitle')}</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-300 list-disc list-inside">
                            {Array.isArray(equipmentList) && equipmentList.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-12">
                     <ReactRouterDOM.NavLink 
                        to="/contact" 
                        className="mt-8 inline-flex items-center gap-3 bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <span>{t('rentClub.cta')}</span>
                        <ArrowRightIcon className="h-6 w-6" />
                    </ReactRouterDOM.NavLink>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RentClubPage;