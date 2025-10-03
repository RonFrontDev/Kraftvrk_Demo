



import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Accordion, AccordionItem } from '../components/ui/accordion';
import { imageAssets } from '../data/images';
import { motion } from 'framer-motion';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight as ArrowRightIcon } from 'lucide-react';

// FIX: Removed explicit JSX.Element return type to fix JSX namespace error.
const FaqPage = () => {
    const { t } = useLanguage();

    const faqItems = [
        { q: 'faq.q1_title', a: 'faq.q1_answer' },
        { q: 'faq.q2_title', a: 'faq.q2_answer' },
        { q: 'faq.q3_title', a: 'faq.q3_answer' },
        { q: 'faq.q4_title', a: 'faq.q4_answer' },
        { q: 'faq.q5_title', a: 'faq.q5_answer' },
        { q: 'faq.q6_title', a: 'faq.q6_answer' },
    ];

    const AccordionTriggerContent = ({ title }: { title: string }) => (
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white normal-case tracking-normal text-left">
        {title}
      </h3>
    );

    return (
        <div className="bg-gray-50 dark:bg-black">
            {/* Hero Section */}
            <div className="relative pt-40 pb-20 text-center">
                 <div 
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: `url('${imageAssets.faqBg}')` }}
                />
                <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1 
                        className="text-7xl font-extrabold uppercase tracking-widest text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t('faq.title')}
                    </motion.h1>
                    <motion.p 
                        className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t('faq.subtitle')}
                    </motion.p>
                </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Accordion defaultValue="faq.q1_title">
                        {faqItems.map((item, index) => (
                            <AccordionItem 
                                key={index}
                                value={item.q}
                                trigger={<AccordionTriggerContent title={t(item.q)} />}
                            >
                                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                                    {t(item.a)}
                                </p>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

            {/* CTA Section */}
            <section className="py-24 bg-white dark:bg-[#101012]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">{t('faq.ctaTitle')}</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        {t('faq.ctaText')}
                    </p>
                    <ReactRouterDOM.NavLink 
                        to="/contact" 
                        className="inline-flex items-center gap-3 bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-4 px-10 text-lg uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <span>{t('faq.ctaButton')}</span>
                        <ArrowRightIcon className="h-6 w-6" />
                    </ReactRouterDOM.NavLink>
                </div>
            </section>
        </div>
    );
};

export default FaqPage;