


import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, Variants } from 'framer-motion';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { Dumbbell as DumbbellIcon, HeartPulse as HeartPulseIcon, Repeat as RepeatIcon, Users as UsersIcon, Award as AwardIcon, BrainCircuit as BrainCircuitIcon, ArrowRight as ArrowRightIcon, PartyPopper as FunIcon } from 'lucide-react';
import ValueCard from '../components/ValueCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// FIX: Explicitly typed the `itemVariants` constant with `Variants` from framer-motion.
// This resolves a TypeScript error where the `type` property in the transition object
// was being inferred as a generic `string` instead of the specific AnimationGeneratorType
// (e.g., 'spring') that framer-motion expects.
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};


// FIX: Corrected component definition from a malformed 'const' to a full React component, and added a default export.
const WhatIsCrossfitPage = (): React.ReactNode => {
  const { t } = useLanguage();

  const benefits = [
    { icon: <DumbbellIcon className="h-12 w-12"/>, titleKey: 'whatIsCrossfit.benefits.strength.title', textKey: 'whatIsCrossfit.benefits.strength.text' },
    { icon: <HeartPulseIcon className="h-12 w-12"/>, titleKey: 'whatIsCrossfit.benefits.endurance.title', textKey: 'whatIsCrossfit.benefits.endurance.text' },
    { icon: <UsersIcon className="h-12 w-12"/>, titleKey: 'whatIsCrossfit.benefits.community.title', textKey: 'whatIsCrossfit.benefits.community.text' },
    { icon: <AwardIcon className="h-12 w-12"/>, titleKey: 'whatIsCrossfit.benefits.confidence.title', textKey: 'whatIsCrossfit.benefits.confidence.text' },
    { icon: <BrainCircuitIcon className="h-12 w-12"/>, titleKey: 'whatIsCrossfit.benefits.mental.title', textKey: 'whatIsCrossfit.benefits.mental.text' },
    { icon: <FunIcon className="h-12 w-12"/>, titleKey: 'whatIsCrossfit.benefits.fun.title', textKey: 'whatIsCrossfit.benefits.fun.text' }
  ];

  return (
    <div className="bg-white dark:bg-[#101012] text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative pt-40 pb-20 text-center bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-7xl font-extrabold uppercase tracking-widest"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('whatIsCrossfit.title')}
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('whatIsCrossfit.subtitle')}
          </motion.p>
        </div>
      </div>
      
      {/* Definition Section */}
      <div className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <img src="https://images.pexels.com/photos/4761786/pexels-photo-4761786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="CrossFit workout" className="rounded-2xl shadow-2xl"/>
          </motion.div>
          <div>
            <h2 className="text-5xl font-extrabold text-accent uppercase tracking-wider">{t('whatIsCrossfit.definition.title')}</h2>
            <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('whatIsCrossfit.definition.text1')}</p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('whatIsCrossfit.definition.text2')}</p>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="py-24 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-extrabold uppercase tracking-wider mb-16">{t('whatIsCrossfit.methodology.title')}</h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={itemVariants}>
                <RepeatIcon className="h-16 w-16 mx-auto text-accent mb-4"/>
                <h3 className="text-3xl font-bold uppercase">{t('whatIsCrossfit.methodology.varied.title')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t('whatIsCrossfit.methodology.varied.text')}</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <HeartPulseIcon className="h-16 w-16 mx-auto text-accent mb-4"/>
                <h3 className="text-3xl font-bold uppercase">{t('whatIsCrossfit.methodology.intensity.title')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t('whatIsCrossfit.methodology.intensity.text')}</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <DumbbellIcon className="h-16 w-16 mx-auto text-accent mb-4"/>
                <h3 className="text-3xl font-bold uppercase">{t('whatIsCrossfit.methodology.functional.title')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{t('whatIsCrossfit.methodology.functional.text')}</p>
              </motion.div>
            </motion.div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold uppercase tracking-wider text-center mb-16">{t('whatIsCrossfit.benefits.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map(benefit => (
              <ValueCard key={benefit.titleKey} icon={benefit.icon} title={t(benefit.titleKey)}>
                {t(benefit.textKey)}
              </ValueCard>
            ))}
          </div>
        </div>
      </div>

      {/* Is it for me section */}
      <div className="py-24 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="text-5xl font-extrabold uppercase tracking-wider">{t('whatIsCrossfit.forMe.title')}</h2>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t('whatIsCrossfit.forMe.text1')}</p>
          <ReactRouterDOM.NavLink 
            to="/contact" 
            className="mt-10 inline-flex items-center gap-3 bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-4 px-10 text-lg uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>{t('pricing.trialButton')}</span>
            <ArrowRightIcon className="h-6 w-6" />
          </ReactRouterDOM.NavLink>
        </div>
      </div>
    </div>
  );
};

export default WhatIsCrossfitPage;