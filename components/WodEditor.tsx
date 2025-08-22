import React from 'react';
import { TrashIcon } from './IconComponents';
import { useLanguage } from '../contexts/LanguageContext';

export interface EditorSectionState {
  title: string;
  details: string;
  duration: string;
  beginnerScaling: string;
  advancedScaling: string;
}

interface WodEditorProps {
    wodGoal: string;
    onWodGoalChange: (goal: string) => void;
    sections: EditorSectionState[];
    onSectionsChange: (sections: EditorSectionState[]) => void;
    onSave: () => void;
    onCancel: () => void;
}

const WodEditor = ({ 
    wodGoal, onWodGoalChange,
    sections, onSectionsChange, 
    onSave, onCancel 
}: WodEditorProps): React.ReactNode => {
  const { t } = useLanguage();

  const handleSectionChange = (index: number, field: keyof EditorSectionState, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    onSectionsChange(updatedSections);
  };

  const handleAddSection = () => {
    onSectionsChange([...sections, { title: t('wod.form.newSectionTitle'), duration: '', details: '', beginnerScaling: '', advancedScaling: '' }]);
  };
  
  const handleDeleteSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    onSectionsChange(updatedSections);
  };

  const inputClasses = "mt-1 block w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-accent focus:border-accent";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider";

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('wod.editWod')}</h3>
      
       <div>
            <label htmlFor="wodGoal" className={labelClasses}>{t('wod.form.wodGoal')}</label>
            <input type="text" id="wodGoal" value={wodGoal} onChange={(e) => onWodGoalChange(e.target.value)} className={inputClasses} placeholder={t('wod.form.wodGoalPlaceholder')} />
        </div>

      {sections.map((section, index) => (
        <div key={index} className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-6 relative">
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
                <input type="text" id={`duration-${index}`} value={section.duration} onChange={(e) => handleSectionChange(index, 'duration', e.target.value)} className={inputClasses} placeholder={t('wod.form.durationPlaceholder')}/>
              </div>
          </div>
          
          <div>
             <label htmlFor={`details-${index}`} className={`${labelClasses} mt-2`}>{t('wod.form.sectionDetails')}</label>
             <textarea id={`details-${index}`} rows={4} value={section.details} onChange={(e) => handleSectionChange(index, 'details', e.target.value)} className={inputClasses}></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
                <label htmlFor={`beginner-${index}`} className={`${labelClasses} text-green-500 dark:text-green-400`}>{t('wod.form.beginnerScaling')}</label>
                <textarea id={`beginner-${index}`} rows={3} value={section.beginnerScaling} onChange={(e) => handleSectionChange(index, 'beginnerScaling', e.target.value)} className={`${inputClasses} border-green-300 dark:border-green-800 focus:border-green-500 focus:ring-green-500`} placeholder={t('wod.form.scalingPlaceholder')}></textarea>
            </div>
            <div>
                <label htmlFor={`advanced-${index}`} className={`${labelClasses} text-red-500 dark:text-red-400`}>{t('wod.form.advancedScaling')}</label>
                <textarea id={`advanced-${index}`} rows={3} value={section.advancedScaling} onChange={(e) => handleSectionChange(index, 'advancedScaling', e.target.value)} className={`${inputClasses} border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-red-500`} placeholder={t('wod.form.scalingPlaceholder')}></textarea>
            </div>
          </div>
        </div>
      ))}
      
      <button onClick={handleAddSection} className="w-full border-2 border-dashed border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:border-accent hover:text-accent transition-colors duration-300">{t('wod.addSection')}</button>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button onClick={onSave} className="flex-1 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-accent-dark transition-colors duration-300">{t('wod.saveWod')}</button>
        <button onClick={onCancel} className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300">{t('wod.cancelEdit')}</button>
      </div>
    </div>
  );
};

export default WodEditor;