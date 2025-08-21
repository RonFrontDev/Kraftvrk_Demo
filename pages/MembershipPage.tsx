
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircleIcon } from '../components/IconComponents';

const PricingCard = ({ plan, popular = false }: { plan: any, popular?: boolean }) => {
    const { t } = useLanguage();
    return (
        <div className={`border-4 ${popular ? 'border-red-500' : 'border-gray-700'} bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col relative`}>
            {popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="bg-red-500 text-white text-sm font-bold tracking-wider rounded-full px-4 py-1 uppercase">{t('membership.popular')}</span>
                </div>
            )}
            <h3 className="font-teko text-4xl text-white uppercase tracking-wider">{t(plan.title)}</h3>
            <p className="mt-4 text-gray-400 flex-grow">{t(plan.description)}</p>
            <div className="mt-6">
                <span className="font-teko text-6xl font-bold text-white">{t(plan.price)}</span>
                <span className="text-lg text-gray-400">/{t('membership.month')}</span>
            </div>
            <ul className="mt-8 space-y-4 text-gray-300">
                {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                        <CheckCircleIcon className="h-6 w-6 text-red-500 mr-3" />
                        <span>{t(feature)}</span>
                    </li>
                ))}
            </ul>
            <NavLink
                to="/contact"
                className="mt-10 block w-full text-center bg-red-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="font-teko text-7xl font-bold uppercase tracking-wider text-white">{t('membership.title')}</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('membership.subtitle')}</p>
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
