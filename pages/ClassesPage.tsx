
import React from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRightIcon } from '../components/IconComponents';
import { classesData, getCoachById } from '../data/roster';
import type { Coach } from '../data/roster';


interface ClassInfoCardProps {
    title: string;
    description: string;
    image: string;
    coaches: Coach[];
}

const ClassInfoCard: React.FC<ClassInfoCardProps> = ({ title, description, image, coaches }) => {
    return (
        <div className="relative bg-gray-900 overflow-hidden group rounded-lg shadow-xl min-h-[450px] flex flex-col justify-end">
            <img 
                src={image} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-500"></div>
            <div className="relative p-8 z-10 flex flex-col flex-grow justify-end">
                <div>
                    <h3 className="text-4xl font-extrabold text-white uppercase tracking-wider">{title}</h3>
                    <p className="mt-2 text-gray-300 leading-relaxed">{description}</p>
                </div>
                 {coaches.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {coaches.map(coach => (
                                <ReactRouterDOM.NavLink key={coach.id} to={`/coaches#coach-${coach.id}`} title={coach.name}>
                                    <img 
                                        src={`https://i.pravatar.cc/150?u=${coach.imageId}`} 
                                        alt={coach.name}
                                        className="w-12 h-12 rounded-full border-2 border-gray-900 object-cover transition-transform hover:scale-110 hover:z-10"
                                    />
                                </ReactRouterDOM.NavLink>
                            ))}
                        </div>
                    </div>
                 )}
            </div>
        </div>
    );
};


const ClassesPage = (): React.ReactNode => {
    const { t } = useLanguage();

    const classes = classesData.map(cls => {
        const coachesForClass = cls.coaches.map(coachId => getCoachById(coachId)).filter(Boolean) as Coach[];
        return {
            title: t(cls.titleKey),
            desc: t(cls.descKey),
            image: cls.image,
            coaches: coachesForClass
        }
    });

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <div className="text-center mb-16">
                <h1 className="text-7xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white">{t('classes.title')}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('classes.subtitle')}</p>
                 <ReactRouterDOM.NavLink 
                    to="/schedule" 
                    className="mt-8 inline-flex items-center gap-3 bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                    <span>{t('classes.viewSchedule')}</span>
                    <ArrowRightIcon className="h-6 w-6" />
                </ReactRouterDOM.NavLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {classes.map((cls, index) => (
                     <div key={cls.title} className={index === classes.length - 1 && classes.length % 2 !== 0 && classes.length > 2 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}>
                        <ClassInfoCard 
                            title={cls.title}
                            description={cls.desc}
                            image={cls.image}
                            coaches={cls.coaches}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesPage;
