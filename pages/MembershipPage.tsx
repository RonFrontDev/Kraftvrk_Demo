import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircleIcon, ArrowRightIcon } from '../components/IconComponents';

const PricingCard = ({ plan, popular = false }: { plan: any, popular?: boolean }) => {
    const { t } = useLanguage();
    return (
        <div className={`border-2 ${popular ? 'border-accent' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-[#1c1c1e] p-8 flex flex-col relative rounded-md shadow-lg`}>
            {popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-black text-sm font-bold tracking-wider rounded-full px-4 py-1 uppercase">{t('membership.popular')}</span>
                </div>
            )}
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">{t(plan.title)}</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400 flex-grow">{t(plan.description)}</p>
            <div className="mt-6">
                <span className="text-6xl font-black text-gray-900 dark:text-white">{t(plan.price)}</span>
                <span className="text-lg text-gray-600 dark:text-gray-400">/{t('membership.month')}</span>
            </div>
            <ul className="mt-8 space-y-4 text-gray-700 dark:text-gray-300">
                {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                        <CheckCircleIcon className="h-6 w-6 text-accent mr-3" />
                        <span>{t(feature)}</span>
                    </li>
                ))}
            </ul>
            <NavLink
                to="/contact"
                className={`mt-10 block w-full text-center font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm transition-colors duration-300 transform hover:scale-105 ${popular ? 'bg-accent text-black hover:bg-accent-dark' : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600'}`}
            >
                {t('membership.joinButton')}
            </NavLink>
        </div>
    );
};


const MembershipPage = (): React.ReactNode => {
    const { t } = useLanguage();

    const plans = [
        {
            title: 'membership.plan1Title',
            description: 'membership.plan1Desc',
            price: 'membership.plan1Price',
            features: [
                'membership.feature.12classes',
                'membership.feature.openGym',
                'membership.feature.community',
            ]
        },
        {
            title: 'membership.plan2Title',
            description: 'membership.plan2Desc',
            price: 'membership.plan2Price',
            features: [
                'membership.feature.unlimited',
                'membership.feature.openGym',
                'membership.feature.workshops',
                'membership.feature.community',
            ],
            popular: true
        },
        {
            title: 'membership.plan3Title',
            description: 'membership.plan3Desc',
            price: 'membership.plan3Price',
            features: [
                'membership.feature.oneClass',
                'membership.feature.flexible',
                'membership.feature.experience',
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <div className="text-center mb-16">
                <h1 className="text-7xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('membership.title')}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('membership.subtitle')}</p>
            </div>

            <div className="max-w-4xl mx-auto mb-16 bg-white dark:bg-[#1c1c1e] border-2 border-accent p-8 text-center shadow-lg rounded-sm">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white uppercase">{t('membership.trialTitle')}</h2>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{t('membership.trialSubtitle')}</p>
                <NavLink 
                    to="/contact" 
                    className="mt-8 inline-flex items-center gap-3 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-sm hover:bg-accent-dark transition-colors duration-300 transform hover:scale-105"
                >
                    <span>{t('membership.trialButton')}</span>
                    <ArrowRightIcon className="h-6 w-6" />
                </NavLink>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                    <PricingCard key={index} plan={plan} popular={plan.popular} />
                ))}
            </div>

        </div>
    );
};

export default MembershipPage;