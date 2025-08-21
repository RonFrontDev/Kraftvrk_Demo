import React, { useState, useEffect, useCallback } from 'react';
import type { Wod, WodSection } from '../types';
import { generateWod, regenerateWodSection } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { useLanguage } from '../contexts/LanguageContext';
import Calendar from '../components/Calendar';
import { PinIcon, RefreshIcon, PencilIcon, TrashIcon, ScaleDownIcon, ScaleUpIcon } from '../components/IconComponents';

const toYYYYMMDD = (date: Date): string => date.toISOString().split('T')[0];

interface WodSectionCardProps {
  section: WodSection | null;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

const WodSectionCard = ({ section, onRegenerate, isRegenerating }: WodSectionCardProps): React.ReactNode => {
  const { t } = useLanguage();
  if (!section) return null;

  return (
    <div className="bg-[#1c1c1e] p-8">
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray-700 pb-3">
        <div className="flex-1">
            <h3 className="text-4xl font-bold text-accent uppercase tracking-wider">{section.title}</h3>
            {section.duration && <p className="text-gray-400 font-medium mt-1">{section.duration}</p>}
        </div>
        <button 
            onClick={onRegenerate} 
            disabled={isRegenerating}
            className="text-gray-400 hover:text-accent disabled:text-gray-600 disabled:cursor-wait transition-colors"
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
            <ul className="space-y-2 list-disc list-inside text-gray-300">
            {section.details.map((item, index) => (
                <li key={index} className="text-lg">{item}</li>
            ))}
            </ul>

            {section.scalingOptions && (section.scalingOptions.beginner.length > 0 || section.scalingOptions.advanced.length > 0) && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-3">{t('wod.scalingOptions')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.scalingOptions.beginner.length > 0 && (
                            <div>
                                <div className="flex items-center text-green-400 mb-2">
                                    <ScaleDownIcon className="h-5 w-5 mr-2"/>
                                    <h5 className="font-semibold uppercase">{t('wod.beginner')}</h5>
                                </div>
                                <ul className="space-y-1 list-disc list-inside text-gray-400 text-sm">
                                    {section.scalingOptions.beginner.map((item, idx) => <li key={idx}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                        {section.scalingOptions.advanced.length > 0 && (
                            <div>
                                <div className="flex items-center text-red-400 mb-2">
                                    <ScaleUpIcon className="h-5 w-5 mr-2"/>
                                    <h5 className="font-semibold uppercase">{t('wod.advanced')}</h5>
                                </div>
                                <ul className="space-y-1 list-disc list-inside text-gray-400 text-sm">
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

interface EditorSectionState {
  title: string;
  details: string;
  duration: string;
  beginnerScaling: string;
  advancedScaling: string;
}

const WodEditor = ({ 
    editorWodGoal, setEditorWodGoal,
    editorSections, setEditorSections, 
    onSave, onCancel 
}: {
    editorWodGoal: string;
    setEditorWodGoal: (goal: string) => void;
    editorSections: EditorSectionState[];
    setEditorSections: React.Dispatch<React.SetStateAction<EditorSectionState[]>>;
    onSave: () => void;
    onCancel: () => void;
}) => {
  const { t } = useLanguage();

  const handleSectionChange = (index: number, field: keyof EditorSectionState, value: string) => {
    const updatedSections = [...editorSections];
    updatedSections[index][field] = value;
    setEditorSections(updatedSections);
  };

  const handleAddSection = () => {
    setEditorSections([...editorSections, { title: 'New Section', duration: '', details: '', beginnerScaling: '', advancedScaling: '' }]);
  };
  
  const handleDeleteSection = (index: number) => {
    const updatedSections = editorSections.filter((_, i) => i !== index);
    setEditorSections(updatedSections);
  };

  const inputClasses = "mt-1 block w-full bg-gray-900 border border-gray-700 rounded-sm shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-accent focus:border-accent";
  const labelClasses = "block text-sm font-medium text-gray-300 uppercase tracking-wider";

  return (
    <div className="bg-[#1c1c1e] p-8 space-y-6">
      <h3 className="text-3xl font-bold text-white mb-4">{t('wod.editWod')}</h3>
      
       <div>
            <label htmlFor="wodGoal" className={labelClasses}>{t('wod.form.wodGoal')}</label>
            <input type="text" id="wodGoal" value={editorWodGoal} onChange={(e) => setEditorWodGoal(e.target.value)} className={inputClasses} placeholder="e.g., Strength and Conditioning" />
        </div>

      {editorSections.map((section, index) => (
        <div key={index} className="space-y-2 border-t border-gray-700 pt-6 relative">
          <button 
            onClick={() => handleDeleteSection(index)}
            className="absolute top-4 right-2 text-gray-500 hover:text-red-500 transition-colors"
            aria-label={t('wod.removeSection')}
          >
              <TrashIcon className="h-5 w-5" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`title-${index}`} className={labelClasses}>{t('wod.form.sectionTitle')}</label>
                <input type="text" id={`title-${index}`} value={section.title} onChange={(e) => handleSectionChange(index, 'title', e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label htmlFor={`duration-${index}`} className={labelClasses}>{t('wod.form.sectionDuration')}</label>
                <input type="text" id={`duration-${index}`} value={section.duration} onChange={(e) => handleSectionChange(index, 'duration', e.target.value)} className={inputClasses} placeholder="e.g., 15 mins, AMRAP 20"/>
              </div>
          </div>
          
          <div>
             <label htmlFor={`details-${index}`} className={`${labelClasses} mt-2`}>{t('wod.form.sectionDetails')}</label>
             <textarea id={`details-${index}`} rows={4} value={section.details} onChange={(e) => handleSectionChange(index, 'details', e.target.value)} className={inputClasses}></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
                <label htmlFor={`beginner-${index}`} className={`${labelClasses} text-green-400`}>{t('wod.form.beginnerScaling')}</label>
                <textarea id={`beginner-${index}`} rows={3} value={section.beginnerScaling} onChange={(e) => handleSectionChange(index, 'beginnerScaling', e.target.value)} className={`${inputClasses} border-green-800 focus:border-green-500 focus:ring-green-500`} placeholder="e.g., Use lighter weight..."></textarea>
            </div>
            <div>
                <label htmlFor={`advanced-${index}`} className={`${labelClasses} text-red-400`}>{t('wod.form.advancedScaling')}</label>
                <textarea id={`advanced-${index}`} rows={3} value={section.advancedScaling} onChange={(e) => handleSectionChange(index, 'advancedScaling', e.target.value)} className={`${inputClasses} border-red-800 focus:border-red-500 focus:ring-red-500`} placeholder="e.g., Increase weight..."></textarea>
            </div>
          </div>
        </div>
      ))}
      
      <button onClick={handleAddSection} className="w-full border-2 border-dashed border-gray-600 text-gray-400 font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:border-accent hover:text-accent transition-colors duration-300">{t('wod.addSection')}</button>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button onClick={onSave} className="flex-1 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:bg-accent-dark transition-colors duration-300">{t('wod.saveWod')}</button>
        <button onClick={onCancel} className="flex-1 bg-gray-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:bg-gray-500 transition-colors duration-300">{t('wod.cancelEdit')}</button>
      </div>
    </div>
  );
};


const WodPage = (): React.ReactNode => {
  const [pinnedWods, setPinnedWods] = useState<{ [date: string]: Wod }>({});
  const [transientWod, setTransientWod] = useState<Wod | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingSection, setLoadingSection] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [isEditing, setIsEditing] = useState(false);
  const [editorWodGoal, setEditorWodGoal] = useState<string>('');
  const [editorSections, setEditorSections] = useState<EditorSectionState[]>([]);
  const [wodType, setWodType] = useState<'individual' | 'team'>('individual');

  const { language, t } = useLanguage();

  useEffect(() => {
    try {
      const storedWods = localStorage.getItem('kraftvrk_pinned_wods');
      if (storedWods) {
        const parsedWods = JSON.parse(storedWods);
        const migratedWods: { [date: string]: Wod } = {};
        
        Object.keys(parsedWods).forEach(date => {
          const wod = parsedWods[date];
          let finalWod: Wod | null = null;
          if (wod && wod.warmup && !wod.sections) {
            // This is the old format, migrate it.
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
             // This is the new format, ensure goal and scalingOptions exist for backwards compatibility
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
        setPinnedWods(migratedWods);
        // Persist the migrated data back to localStorage
        if(Object.keys(migratedWods).length > 0) {
            localStorage.setItem('kraftvrk_pinned_wods', JSON.stringify(migratedWods));
        }
      }
    } catch (e) {
      console.error("Failed to parse or migrate WODs from localStorage", e);
      setPinnedWods({});
    }
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setTransientWod(null);
    setError(null);
    setIsEditing(false);
  };

  const fetchWod = useCallback(async (typeToGenerate?: 'individual' | 'team') => {
    setIsLoading(true);
    setError(null);
    setTransientWod(null);
    setIsEditing(false);
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
    setEditorWodGoal('');
    setEditorSections([{
      title: t('wod.form.warmupTitle'),
      details: '',
      duration: '15 mins',
      beginnerScaling: '',
      advancedScaling: '',
    }]);
    setIsEditing(true);
    setTransientWod(null);
  };

  const handleEditClick = () => {
    const wodToEdit = transientWod || pinnedWods[toYYYYMMDD(selectedDate)];
    if (!wodToEdit) return;
    setEditorWodGoal(wodToEdit.goal || '');
    setEditorSections(wodToEdit.sections.map(sec => ({
        title: sec.title,
        details: sec.details.join('\n'),
        duration: sec.duration || '',
        beginnerScaling: sec.scalingOptions?.beginner?.join('\n') || '',
        advancedScaling: sec.scalingOptions?.advanced?.join('\n') || '',
    })));
    setIsEditing(true);
  };

  const handleSaveCustomWod = () => {
    const newWod: Wod = {
        goal: editorWodGoal,
        sections: editorSections.map(sec => ({
            title: sec.title,
            duration: sec.duration,
            details: sec.details.split('\n').filter(line => line.trim() !== ''),
            scalingOptions: {
              beginner: sec.beginnerScaling.split('\n').filter(line => line.trim() !== ''),
              advanced: sec.advancedScaling.split('\n').filter(line => line.trim() !== ''),
            }
        })),
        type: wodType,
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
    setIsEditing(false);
  };

  const selectedDateKey = toYYYYMMDD(selectedDate);
  const wodForSelectedDate = pinnedWods[selectedDateKey];
  const wodToDisplay = transientWod || wodForSelectedDate;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-extrabold uppercase tracking-wider text-white">{t('wod.title')}</h1>
        <p className="text-xl text-gray-400">{t('wod.calendar')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Calendar
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            pinnedDates={Object.keys(pinnedWods)}
            t={t}
          />
        </div>

        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-3xl font-bold text-white">
                    {t('wod.wodFor')}{' '}
                    <span className="text-accent">
                    {selectedDate.toLocaleDateString(t('langCode') as string, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </h2>
                {wodToDisplay && wodToDisplay.type && (
                    <span className="bg-accent/20 text-accent text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {t(wodToDisplay.type === 'team' ? 'wod.typeTeam' : 'wod.typeIndividual')}
                    </span>
                )}
            </div>
         

            {isEditing ? (
                 <WodEditor 
                    editorWodGoal={editorWodGoal}
                    setEditorWodGoal={setEditorWodGoal}
                    editorSections={editorSections}
                    setEditorSections={setEditorSections}
                    onSave={handleSaveCustomWod}
                    onCancel={() => setIsEditing(false)}
                 />
            ) : (
                <>
                {isLoading && !wodToDisplay && (
                    <div className="flex justify-center items-center h-64 bg-[#1c1c1e]">
                    <div className="text-center">
                        <Spinner size="12" />
                        <p className="mt-4 text-lg">{t('wod.generatingButton')}</p>
                    </div>
                    </div>
                )}

                {!isLoading && error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center" role="alert">
                    <strong className="font-bold">{t('wod.errorTitle')}</strong>
                    <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}

                {wodToDisplay && wodToDisplay.sections && wodToDisplay.sections.length > 0 && (
                    <div className="space-y-4">
                     {wodToDisplay.goal && (
                        <div className="bg-black/30 p-4 border-l-4 border-accent">
                            <h3 className="font-bold text-white uppercase tracking-wider text-lg">{t('wod.goal')}</h3>
                            <p className="text-gray-300">{wodToDisplay.goal}</p>
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

                    <div className="flex flex-col sm:flex-row gap-4">
                        {transientWod && (
                            <button
                            onClick={pinWod}
                            className="flex-1 bg-green-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:bg-green-500 transition-all duration-300 flex items-center justify-center"
                            >
                            <PinIcon className="h-6 w-6 mr-3" />
                            {t('wod.pinWod')}
                            </button>
                        )}
                        <button
                            onClick={handleEditClick}
                            disabled={isLoading || loadingSection !== null}
                            className="flex-1 bg-gray-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:bg-gray-500 disabled:bg-gray-800 transition-all duration-300 flex items-center justify-center"
                        >
                            <PencilIcon className="h-5 w-5 mr-3" />
                            {t('wod.editWod')}
                        </button>
                        <button
                            onClick={handleFullRegeneration}
                            disabled={isLoading || loadingSection !== null}
                            className="flex-1 bg-blue-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:bg-blue-500 disabled:bg-gray-800 transition-all duration-300 flex items-center justify-center"
                        >
                            <RefreshIcon className={`h-6 w-6 mr-3 ${isLoading && loadingSection === null ? 'animate-spin' : ''}`} />
                            {t('wod.regenerateWod')}
                        </button>
                    </div>
                    </div>
                )}

                {!isLoading && !error && (!wodToDisplay || !wodToDisplay.sections || wodToDisplay.sections.length === 0) && (
                    <div className="bg-[#1c1c1e] p-8 text-center h-full flex flex-col justify-center min-h-[300px]">
                    <p className="text-xl text-gray-400 mb-6">{t('wod.noWodForDate')}</p>
                    
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex rounded-md shadow-sm bg-gray-900 p-1 border border-gray-700">
                            <button
                            onClick={() => setWodType('individual')}
                            className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-l-sm transition-colors duration-200 ${wodType === 'individual' ? 'bg-accent text-black' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                            {t('wod.typeIndividual')}
                            </button>
                            <button
                            onClick={() => setWodType('team')}
                            className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-r-sm transition-colors duration-200 ${wodType === 'team' ? 'bg-accent text-black' : 'text-gray-300 hover:bg-gray-700'}`}
                            >
                            {t('wod.typeTeam')}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => fetchWod()}
                            disabled={isLoading}
                            className="flex-1 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:bg-accent-dark transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            {t(wodType === 'individual' ? 'wod.generateIndividualWod' : 'wod.generateTeamWod', { date: selectedDate.toLocaleDateString(t('langCode') as string, { month: 'long', day: 'numeric' }) })}
                        </button>
                         <button
                            onClick={handleWriteClick}
                            disabled={isLoading}
                            className="flex-1 bg-gray-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-800 disabled:cursor-not-allowed"
                        >
                            {t('wod.writeOwnWod')}
                        </button>
                    </div>

                    </div>
                )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default WodPage;
