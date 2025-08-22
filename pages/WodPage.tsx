import React, { useState, useEffect, useCallback } from 'react';
import type { Wod, WodSection } from '../types';
import { generateWod, regenerateWodSection } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { useLanguage } from '../contexts/LanguageContext';
import Calendar from '../components/Calendar';
import { PinIcon, RefreshIcon, PencilIcon } from '../components/IconComponents';
import WodSectionCard from '../components/WodSectionCard';
import WodEditor, { EditorSectionState } from '../components/WodEditor';

const toYYYYMMDD = (date: Date): string => date.toISOString().split('T')[0];

const migrateWodsFromStorage = (storedWods: string | null): { [date: string]: Wod } => {
  if (!storedWods) return {};
  
  try {
    const parsedWods = JSON.parse(storedWods);
    const migratedWods: { [date: string]: Wod } = {};
    
    Object.keys(parsedWods).forEach(date => {
      const wod = parsedWods[date];
      let finalWod: Wod | null = null;
      if (wod && wod.warmup && !wod.sections) {
        // Old format, migrate it.
        finalWod = {
          goal: 'General Physical Preparedness',
          sections: [
            { title: wod.warmup.title, details: wod.warmup.details, duration: '15 minutes', scalingOptions: { beginner: [], advanced: [] } },
            { title: wod.strength.title, details: wod.strength.details, duration: '20 minutes', scalingOptions: { beginner: [], advanced: [] } },
            { title: wod.metcon.title, details: wod.metcon.details, duration: 'For Time', scalingOptions: { beginner: [], advanced: [] } },
          ].filter(Boolean),
          type: 'individual'
        };
      } else if (wod && wod.sections) {
        // New format, ensure goal and scalingOptions exist for backwards compatibility
        finalWod = {
          ...wod,
          goal: wod.goal || '',
          sections: wod.sections.map((sec: WodSection) => ({
            ...sec,
            scalingOptions: sec.scalingOptions || { beginner: [], advanced: [] }
          })),
          type: wod.type || 'individual'
        };
      }
      if(finalWod) migratedWods[date] = finalWod;
    });

    if(Object.keys(migratedWods).length > 0) {
      localStorage.setItem('kraftvrk_pinned_wods', JSON.stringify(migratedWods));
    }
    return migratedWods;
  } catch (e) {
    console.error("Failed to parse or migrate WODs from localStorage", e);
    return {};
  }
};

const WodPage = (): React.ReactNode => {
  const [pinnedWods, setPinnedWods] = useState<{ [date: string]: Wod }>({});
  const [transientWod, setTransientWod] = useState<Wod | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingSection, setLoadingSection] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [editorState, setEditorState] = useState<{ goal: string; sections: EditorSectionState[] } | null>(null);
  const [wodType, setWodType] = useState<'individual' | 'team'>('individual');

  const { language, t } = useLanguage();

  useEffect(() => {
    const storedWods = localStorage.getItem('kraftvrk_pinned_wods');
    const migratedWods = migrateWodsFromStorage(storedWods);
    setPinnedWods(migratedWods);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setTransientWod(null);
    setError(null);
    setEditorState(null);
  };

  const fetchWod = useCallback(async (typeToGenerate?: 'individual' | 'team') => {
    setIsLoading(true);
    setError(null);
    setTransientWod(null);
    setEditorState(null);
    try {
      const newWod = await generateWod(language, typeToGenerate || wodType);
      setTransientWod(newWod);
    } catch (err: unknown) {
      setError(t('wod.errorMessage'));
    } finally {
      setIsLoading(false);
    }
  }, [language, t, wodType]);

  const handleFullRegeneration = () => {
    const currentWod = transientWod || pinnedWods[toYYYYMMDD(selectedDate)];
    fetchWod(currentWod?.type || 'individual');
  };

  const handleRegenerateSection = async (sectionIndex: number) => {
    const currentWod = transientWod || pinnedWods[toYYYYMMDD(selectedDate)];
    if (!currentWod) return;
    setLoadingSection(sectionIndex);
    setError(null);
    try {
        const newSection = await regenerateWodSection(sectionIndex, currentWod, language);
        const updatedWod = { ...currentWod, sections: [...currentWod.sections] };
        updatedWod.sections[sectionIndex] = newSection;
        setTransientWod(updatedWod);
    } catch (err) {
        setError(t('wod.errorMessage'));
    } finally {
        setLoadingSection(null);
    }
  };

  const pinWod = () => {
    if (!transientWod) return;
    const dateKey = toYYYYMMDD(selectedDate);
    const newPinnedWods = { ...pinnedWods, [dateKey]: transientWod };
    setPinnedWods(newPinnedWods);
    setTransientWod(null);
    try {
      localStorage.setItem('kraftvrk_pinned_wods', JSON.stringify(newPinnedWods));
    } catch (e) {
      console.error("Failed to save WOD to localStorage", e);
    }
  };
  
  const handleWriteClick = () => {
    setEditorState({
      goal: '',
      sections: [{
        title: t('wod.form.warmupTitle'),
        details: '',
        duration: '15 mins',
        beginnerScaling: '',
        advancedScaling: '',
      }]
    });
    setTransientWod(null);
  };

  const handleEditClick = () => {
    const wodToEdit = transientWod || pinnedWods[toYYYYMMDD(selectedDate)];
    if (!wodToEdit) return;
    setEditorState({
        goal: wodToEdit.goal || '',
        sections: wodToEdit.sections.map(sec => ({
            title: sec.title,
            details: sec.details.join('\n'),
            duration: sec.duration || '',
            beginnerScaling: sec.scalingOptions?.beginner?.join('\n') || '',
            advancedScaling: sec.scalingOptions?.advanced?.join('\n') || '',
        }))
    });
  };

  const handleSaveCustomWod = () => {
    if (!editorState) return;
    const newWod: Wod = {
        goal: editorState.goal,
        sections: editorState.sections.map(sec => ({
            title: sec.title,
            duration: sec.duration,
            details: sec.details.split('\n').filter(line => line.trim() !== ''),
            scalingOptions: {
              beginner: sec.beginnerScaling.split('\n').filter(line => line.trim() !== ''),
              advanced: sec.advancedScaling.split('\n').filter(line => line.trim() !== ''),
            }
        })),
        type: (transientWod || pinnedWods[toYYYYMMDD(selectedDate)])?.type || wodType,
    };
    const dateKey = toYYYYMMDD(selectedDate);
    const newPinnedWods = { ...pinnedWods, [dateKey]: newWod };
    setPinnedWods(newPinnedWods);
    try {
        localStorage.setItem('kraftvrk_pinned_wods', JSON.stringify(newPinnedWods));
    } catch (e) {
        console.error("Failed to save WOD to localStorage", e);
    }
    setTransientWod(null);
    setEditorState(null);
  };

  const renderContentPanel = () => {
    const selectedDateKey = toYYYYMMDD(selectedDate);
    const wodForSelectedDate = pinnedWods[selectedDateKey];
    const wodToDisplay = transientWod || wodForSelectedDate;

    if (editorState) {
      return (
        <WodEditor 
          wodGoal={editorState.goal}
          onWodGoalChange={(goal) => setEditorState(prev => prev ? { ...prev, goal } : null)}
          sections={editorState.sections}
          onSectionsChange={(sections) => setEditorState(prev => prev ? { ...prev, sections } : null)}
          onSave={handleSaveCustomWod}
          onCancel={() => setEditorState(null)}
        />
      );
    }

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <Spinner size="12" />
            <p className="mt-4 text-lg">{t('wod.generatingButton')}</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
          <strong className="font-bold">{t('wod.errorTitle')}</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      );
    }

    if (wodToDisplay) {
      return (
        <div className="space-y-4">
          {wodToDisplay.goal && (
            <div className="bg-black/5 dark:bg-black/30 p-4 border-l-4 border-accent rounded-r-md">
                <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-lg">{t('wod.goal')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{wodToDisplay.goal}</p>
            </div>
          )}
          {wodToDisplay.sections.map((section, index) => (
            <WodSectionCard 
              key={index}
              section={section} 
              onRegenerate={() => handleRegenerateSection(index)} 
              isRegenerating={loadingSection === index}
            />
          ))}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {transientWod && (
              <button onClick={pinWod} className="flex-1 bg-green-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-green-500 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1">
                <PinIcon className="h-6 w-6 mr-3" />
                {t('wod.pinWod')}
              </button>
            )}
            <button onClick={handleEditClick} disabled={isLoading || loadingSection !== null} className="flex-1 bg-gray-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-gray-500 disabled:bg-gray-800 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1">
              <PencilIcon className="h-5 w-5 mr-3" />
              {t('wod.editWod')}
            </button>
            <button onClick={handleFullRegeneration} disabled={isLoading || loadingSection !== null} className="flex-1 bg-blue-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-blue-500 disabled:bg-gray-800 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1">
              <RefreshIcon className={`h-6 w-6 mr-3 ${isLoading && loadingSection === null ? 'animate-spin' : ''}`} />
              {t('wod.regenerateWod')}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center h-full flex flex-col justify-center min-h-[300px]">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{t('wod.noWodForDate')}</p>
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm bg-gray-200 dark:bg-gray-900 p-1 border border-gray-300 dark:border-gray-700">
            <button onClick={() => setWodType('individual')} className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-l-md transition-colors duration-200 ${wodType === 'individual' ? 'bg-accent text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
              {t('wod.typeIndividual')}
            </button>
            <button onClick={() => setWodType('team')} className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-r-md transition-colors duration-200 ${wodType === 'team' ? 'bg-accent text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
              {t('wod.typeTeam')}
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => fetchWod()} disabled={isLoading} className="flex-1 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-accent-dark transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md">
            {t(wodType === 'individual' ? 'wod.generateIndividualWod' : 'wod.generateTeamWod', { date: selectedDate.toLocaleDateString(t('langCode') as string, { month: 'long', day: 'numeric' }) })}
          </button>
          <button onClick={handleWriteClick} disabled={isLoading} className="flex-1 bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-800 disabled:cursor-not-allowed shadow-md">
            {t('wod.writeOwnWod')}
          </button>
        </div>
      </div>
    );
  };
  
  const wodToDisplay = transientWod || pinnedWods[toYYYYMMDD(selectedDate)];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white">{t('wod.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t('wod.calendar')}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:sticky lg:top-32">
          <Calendar
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            pinnedDates={Object.keys(pinnedWods)}
            t={t}
          />
        </div>
        <div className="w-full lg:col-span-2 bg-white dark:bg-[#1A1A1C] rounded-lg shadow-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('wod.wodFor')}{' '}
              <span className="text-accent">
                {selectedDate.toLocaleDateString(t('langCode') as string, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </h2>
            {wodToDisplay && (
              <span className="bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {t(wodToDisplay.type === 'team' ? 'wod.typeTeam' : 'wod.typeIndividual')}
              </span>
            )}
          </div>
          {renderContentPanel()}
        </div>
      </div>
    </div>
  );
};

export default WodPage;