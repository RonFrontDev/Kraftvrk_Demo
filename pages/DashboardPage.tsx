import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import type { Wod, WodLog, PersonalRecord } from '../types';
import Spinner from '../components/Spinner';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import WodView from '../components/WodView';
import { TrashIcon } from '../components/IconComponents';

const toYYYYMMDD = (date: Date): string => date.toISOString().split('T')[0];

const PR_EXERCISES = [
    'back_squat', 'front_squat', 'overhead_squat', 'deadlift', 
    'bench_press', 'shoulder_press', 'snatch', 'clean_and_jerk'
];

const DashboardPage = (): React.ReactNode => {
    const { currentUser, updateWodLog, updatePr, deletePr } = useAuth();
    const { t } = useLanguage();
    
    const [todayWod, setTodayWod] = useState<Wod | null>(null);
    const [wodLog, setWodLog] = useState<WodLog>({ score: '', notes: '' });
    const [isWodLoading, setIsWodLoading] = useState(true);

    const [prExercise, setPrExercise] = useState(PR_EXERCISES[0]);
    const [prWeight, setPrWeight] = useState('');
    const [prDate, setPrDate] = useState(toYYYYMMDD(new Date()));

    useEffect(() => {
        const fetchWod = () => {
            setIsWodLoading(true);
            try {
                const storedWods = localStorage.getItem('kraftvrk_pinned_wods');
                if (storedWods) {
                    const parsedWods = JSON.parse(storedWods);
                    const todayKey = toYYYYMMDD(new Date());
                    setTodayWod(parsedWods[todayKey] || null);
                }
            } catch (error) {
                console.error("Failed to fetch today's WOD", error);
            } finally {
                setIsWodLoading(false);
            }
        };

        fetchWod();
    }, []);
    
    useEffect(() => {
        if (currentUser && todayWod) {
            const todayKey = toYYYYMMDD(new Date());
            const existingLog = currentUser.wods[todayKey];
            if (existingLog) {
                setWodLog(existingLog);
            } else {
                setWodLog({ score: '', notes: '' });
            }
        }
    }, [currentUser, todayWod]);

    const handleWodLogSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateWodLog(toYYYYMMDD(new Date()), wodLog);
    };
    
    const handlePrSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const weightNum = parseFloat(prWeight);
        if (prExercise && !isNaN(weightNum) && prDate) {
            updatePr(prExercise, { weight: weightNum, date: prDate });
            setPrWeight('');
        }
    };

    const sortedPrs = useMemo(() => {
        if (!currentUser) return [];
        return Object.entries(currentUser.prs).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    }, [currentUser]);

    if (!currentUser) {
        return <div className="pt-32 text-center"><Spinner /></div>;
    }
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <h1 className="text-5xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                {t('dashboard.welcome', { email: currentUser.email.split('@')[0] })}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">{t('dashboard.subtitle')}</p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* WOD Logging Section */}
                <div className="lg:col-span-3 bg-white dark:bg-[#1A1A1C] p-6 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-accent mb-4">{t('dashboard.wodLog.title')}</h2>
                    {isWodLoading && <Spinner />}
                    {!isWodLoading && todayWod && (
                         <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                             <div className="bg-gray-100 dark:bg-gray-900/50 p-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">{t('dashboard.wodLog.today')}</h3>
                             </div>
                             <div className="p-4 bg-gray-50 dark:bg-gray-900/20 max-h-96 overflow-y-auto">
                                <WodView wod={todayWod} />
                             </div>
                         </div>
                    )}
                    {!isWodLoading && !todayWod && (
                        <p className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-black/20 p-4 rounded-xl">{t('dashboard.wodLog.noWod')}</p>
                    )}

                    {todayWod && (
                        <form onSubmit={handleWodLogSubmit} className="mt-6 space-y-4">
                            <div>
                                <Label htmlFor="wod-score" className="text-gray-700 dark:text-gray-300 font-bold">{t('dashboard.wodLog.scoreLabel')}</Label>
                                <Input
                                    id="wod-score"
                                    type="text"
                                    value={wodLog.score}
                                    onChange={e => setWodLog(prev => ({ ...prev, score: e.target.value }))}
                                    placeholder={t('dashboard.wodLog.scorePlaceholder')}
                                    required
                                />
                            </div>
                             <div>
                                <Label htmlFor="wod-notes" className="text-gray-700 dark:text-gray-300 font-bold">{t('dashboard.wodLog.notesLabel')}</Label>
                                <Textarea
                                    id="wod-notes"
                                    value={wodLog.notes || ''}
                                    onChange={e => setWodLog(prev => ({ ...prev, notes: e.target.value }))}
                                    placeholder={t('dashboard.wodLog.notesPlaceholder')}
                                    rows={3}
                                />
                            </div>
                            <Button type="submit" className="w-full">{t('dashboard.wodLog.saveButton')}</Button>
                        </form>
                    )}
                </div>

                {/* PR Tracking Section */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1A1A1C] p-6 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-bold text-accent mb-4">{t('dashboard.pr.title')}</h2>
                    <form onSubmit={handlePrSubmit} className="space-y-4 p-4 mb-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('dashboard.pr.addTitle')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="pr-exercise" className="text-sm">{t('dashboard.pr.exercise')}</Label>
                                <select 
                                    id="pr-exercise" 
                                    value={prExercise} 
                                    onChange={e => setPrExercise(e.target.value)}
                                    className="w-full h-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 px-3 text-sm text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                >
                                    {PR_EXERCISES.map(exId => <option key={exId} value={exId}>{t(`library.exercises.${exId}.name`)}</option>)}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="pr-weight" className="text-sm">{t('dashboard.pr.weight')}</Label>
                                <Input id="pr-weight" type="number" placeholder="kg" value={prWeight} onChange={e => setPrWeight(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="pr-date" className="text-sm">{t('dashboard.pr.date')}</Label>
                            <Input id="pr-date" type="date" value={prDate} onChange={e => setPrDate(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full">{t('dashboard.pr.addButton')}</Button>
                    </form>
                    
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                         {sortedPrs.length === 0 && <p className="text-center text-gray-500 p-4">{t('dashboard.pr.noPrs')}</p>}
                         {sortedPrs.map(([exerciseId, pr]) => (
                             <div key={exerciseId} className="flex justify-between items-center bg-gray-100 dark:bg-gray-900/50 p-3 rounded-xl">
                                 <div>
                                     <p className="font-bold text-gray-900 dark:text-white">{t(`library.exercises.${exerciseId}.name`)}</p>
                                     <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(pr.date).toLocaleDateString(t('langCode') as string, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <p className="font-bold text-lg text-accent">{pr.weight} kg</p>
                                    <button onClick={() => deletePr(exerciseId)} aria-label={`Delete PR for ${t(`library.exercises.${exerciseId}.name`)}`} className="text-gray-500 hover:text-red-500"><TrashIcon className="h-4 w-4" /></button>
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;