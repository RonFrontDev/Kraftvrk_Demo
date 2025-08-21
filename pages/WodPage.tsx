
import React, { useState, useEffect, useCallback } from 'react';
import type { Wod, WodSection } from '../types';
import { generateWod } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { useLanguage } from '../contexts/LanguageContext';

const WodSectionDisplay = ({ section }: { section: WodSection | null }) => {
  if (!section) return null;
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="font-teko text-4xl text-red-500 uppercase tracking-wider mb-3 border-b-2 border-gray-700 pb-2">{section.title}</h3>
      <ul className="space-y-2 list-disc list-inside text-gray-300">
        {section.details.map((item, index) => (
          <li key={index} className="text-lg">{item}</li>
        ))}
      </ul>
    </div>
  );
};

const WodSkeleton = (): React.ReactNode => (
  <div className="space-y-8 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
);


const WodPage = (): React.ReactNode => {
  const [wod, setWod] = useState<Wod | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const fetchWod = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newWod = await generateWod(language);
      setWod(newWod);
    } catch (err: unknown) {
      setError(t('wod.errorMessage'));
      setWod(null);
    } finally {
      setIsLoading(false);
    }
  }, [language, t]);

  useEffect(() => {
    fetchWod();
  }, [fetchWod]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-teko text-7xl font-bold uppercase tracking-wider text-white">{t('wod.title')}</h1>
        <p className="text-xl text-gray-400">{t('wod.poweredBy')}</p>
      </div>
      
      <div className="text-center mb-10">
        <button
          onClick={() => fetchWod()}
          disabled={isLoading}
          className="bg-red-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {isLoading ? (
            <>
              <Spinner size="6" />
              <span className="ml-3">{t('wod.generatingButton')}</span>
            </>
          ) : (
            t('wod.generateButton')
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
          <strong className="font-bold">{t('wod.errorTitle')}</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {isLoading && !wod && <WodSkeleton />}
      
      {!isLoading && wod && (
        <div className="max-w-4xl mx-auto space-y-8">
          <WodSectionDisplay section={wod.warmup} />
          <WodSectionDisplay section={wod.strength} />
          <WodSectionDisplay section={wod.metcon} />
        </div>
      )}
    </div>
  );
};

export default WodPage;
