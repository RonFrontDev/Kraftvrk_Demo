
import React from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircleIcon, ArrowRightIcon } from '../components/IconComponents';
import { Accordion, AccordionItem } from '../components/ui/accordion';

const PricingCard = ({ plan, popular = false }: { plan: any, popular?: boolean }) => {
    const { t } = useLanguage();

    const customPriceKeys = ['pricing.plan4Price', 'pricing.plan5Price', 'pricing.plan6Price'];
    const isCustomPlan = customPriceKeys.includes(plan.price);

    const buttonText = isCustomPlan ? t('pricing.contactUsButton') : t('pricing.joinButton');

    return (
        <div className={`border-2 ${popular ? 'border-accent' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-[#1A1A1C] p-8 flex flex-col relative rounded-lg shadow-xl transform hover:-translate-y-2 transition-transform duration-300 h-full`}>
            {popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-black text-sm font-bold tracking-wider rounded-full px-4 py-1 uppercase">{t('pricing.popular')}</span>
                </div>
            )}
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">{t(plan.title)}</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400 flex-grow">{t(plan.description)}</p>
            <div className="mt-6">
                <span className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white">{t(plan.price)}</span>
                {plan.billingCycle && <span className="text-lg text-gray-600 dark:text-gray-400">/{t(plan.billingCycle)}</span>}
            </div>
            <ul className="mt-8 space-y-4 text-gray-700 dark:text-gray-300 flex-grow">
                {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                        <CheckCircleIcon className="h-6 w-6 text-accent mr-3 flex-shrink-0" />
                        <span>{t(feature)}</span>
                    </li>
                ))}
            </ul>
            <ReactRouterDOM.NavLink
                to="/contact"
                className={`mt-10 block w-full text-center font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${popular ? 'bg-accent text-black hover:bg-accent-dark' : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600'}`}
            >
                {buttonText}
            </ReactRouterDOM.NavLink>
        </div>
    );
};


const MembershipPage = (): React.ReactNode => {
    const { t } = useLanguage();

    const plans = [
        // Core
        { title: 'pricing.plan1Title', description: 'pricing.plan1Desc', price: 'pricing.plan1Price', billingCycle: 'pricing.month', features: ['pricing.feature.12classes', 'pricing.feature.openGym', 'pricing.feature.community'] },
        { title: 'pricing.plan2Title', description: 'pricing.plan2Desc', price: 'pricing.plan2Price', billingCycle: 'pricing.month', features: ['pricing.feature.unlimited', 'pricing.feature.openGym', 'pricing.feature.workshops', 'pricing.feature.community'], popular: true },
        { title: 'pricing.planYearlyTitle', description: 'pricing.planYearlyDesc', price: 'pricing.planYearlyPrice', billingCycle: 'pricing.planYearlyBillingCycle', features: ['pricing.feature.yearlyAccess', 'pricing.feature.unlimited', 'pricing.feature.workshops', 'pricing.feature.community'] },
        // Flexible
        { title: 'pricing.plan3Title', description: 'pricing.plan3Desc', price: 'pricing.plan3Price', features: ['pricing.feature.oneClass', 'pricing.feature.flexible', 'pricing.feature.experience'] },
        { title: 'pricing.planPunch10Title', description: 'pricing.planPunch10Desc', price: 'pricing.planPunch10Price', features: ['pricing.feature.tenClasses', 'pricing.feature.openGym', 'pricing.feature.noExpiry'] },
        { title: 'pricing.planPunch5Title', description: 'pricing.planPunch5Desc', price: 'pricing.planPunch5Price', features: ['pricing.feature.fiveClasses', 'pricing.feature.openGym', 'pricing.feature.noExpiry'] },
        { title: 'pricing.planPunch3Title', description: 'pricing.planPunch3Desc', price: 'pricing.planPunch3Price', features: ['pricing.feature.threeClasses', 'pricing.feature.openGym', 'pricing.feature.noExpiry'] },
        // Custom
        { title: 'pricing.plan4Title', description: 'pricing.plan4Desc', price: 'pricing.plan4Price', features: ['pricing.feature.oneOnOne', 'pricing.feature.customizedPlan', 'pricing.feature.goalTracking'] },
        { title: 'pricing.plan5Title', description: 'pricing.plan5Desc', price: 'pricing.plan5Price', features: ['pricing.feature.corporateWellness', 'pricing.feature.teamBuilding', 'pricing.feature.groupRates'] },
        { title: 'pricing.plan6Title', description: 'pricing.plan6Desc', price: 'pricing.plan6Price', features: ['pricing.feature.privateClasses', 'pricing.feature.groupRates', 'pricing.feature.motivation'] }
    ];

    const corePlans = plans.slice(0, 3);
    const flexiblePlans = plans.slice(3, 7);
    const customPlans = plans.slice(7);

    return (
        <div className="relative">
             <div 
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/3838329/pexels-photo-3838329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
            />
            <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
                <div className="text-center mb-16">
                    <h1 className="text-7xl font-extrabold uppercase tracking-widest text-white">{t('pricing.title')}</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t('pricing.subtitle')}</p>
                </div>

                <div className="max-w-4xl mx-auto mb-16 bg-white dark:bg-[#1A1A1C] border-2 border-accent p-8 text-center shadow-lg rounded-lg">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white uppercase">{t('pricing.trialTitle')}</h2>
                    <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{t('pricing.trialSubtitle')}</p>
                    <ReactRouterDOM.NavLink 
                        to="/contact" 
                        className="mt-8 inline-flex items-center gap-3 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-accent-dark transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        <span>{t('pricing.trialButton')}</span>
                        <ArrowRightIcon className="h-6 w-6" />
                    </ReactRouterDOM.NavLink>
                </div>
                
                <Accordion defaultValue="core">
                    <AccordionItem value="core" trigger={t('pricing.accordionCoreTitle')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {corePlans.map((plan, index) => (
                                <PricingCard key={index} plan={plan} popular={plan.popular} />
                            ))}
                        </div>
                    </AccordionItem>
                    <AccordionItem value="flexible" trigger={t('pricing.accordionFlexibleTitle')}>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {flexiblePlans.map((plan, index) => (
                                <PricingCard key={index} plan={plan} popular={plan.popular} />
                            ))}
                        </div>
                    </AccordionItem>
                    <AccordionItem value="custom" trigger={t('pricing.accordionCustomTitle')}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {customPlans.map((plan, index) => (
                                <PricingCard key={index} plan={plan} popular={plan.popular} />
                            ))}
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default MembershipPage;
