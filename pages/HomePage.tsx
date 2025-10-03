

import React, { useState, useEffect } from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
import { UsersIcon, BoltIcon, ArrowRightIcon, ClipboardIcon, DumbbellIcon, CalendarCheckIcon } from '../components/IconComponents';
import { useLanguage } from '../contexts/LanguageContext';
import ClassCard from '../components/ClassCard';
import TestimonialCard from '../components/TestimonialCard';
import Image from '../components/Image';
import { imageAssets } from '../data/images';

const heroTexts = [
  { line1: 'home.heroTitle1', line2: 'home.heroTitle2', subtitle: 'home.heroSubtitle' },
  { line1: 'home.hero2Title1', line2: 'home.hero2Title2', subtitle: 'home.hero2Subtitle' },
  { line1: 'home.hero3Title1', line2: 'home.hero3Title2', subtitle: 'home.hero3Subtitle' },
  { line1: 'home.hero4Title1', line2: 'home.hero4Title2', subtitle: 'home.hero4Subtitle' }
];

const StepCard = ({ num, icon, title, text }: { num: string, icon: React.ReactNode, title: string, text: string }) => (
    <div className="relative p-8 bg-gray-100 dark:bg-black/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute -top-4 -left-4 text-7xl font-black text-gray-200 dark:text-gray-800/50 -z-0" aria-hidden="true">{num}</div>
        <div className="relative z-10">
            <div className="mb-4 text-accent">{icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{text}</p>
        </div>
    </div>
);

const DifferenceItem = ({ num, icon, title, text, image, reverse = false }: { num: string, icon: React.ReactNode, title: string, text: string, image: string, reverse?: boolean }) => (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}>
        <div className="lg:w-1/2 w-full">
            <Image 
                src={image} 
                alt={title} 
                className="w-full h-full rounded-2xl shadow-2xl" 
                imageClassName="transform hover:scale-110 transition-transform duration-500"
            />
        </div>
        <div className="lg:w-1/2 w-full">
            <div className="flex items-center gap-4">
                <span className="text-7xl font-black text-accent">{num}</span>
                {icon}
            </div>
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider mt-4">{title}</h3>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
        </div>
    </div>
);

const HomePage = (): React.ReactNode => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % heroTexts.length);
        setIsAnimatingOut(false);
      }, 700); // Animation duration
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(intervalId);
  }, []);
  
  const currentText = heroTexts[currentIndex];
  const animationClasses = (delay: string) => `transition-all duration-700 ease-in-out ${isAnimatingOut ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}`;

  return (
    <div>
      {/* Hero Section with YouTube */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* YouTube Video */}
        <iframe
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          src="https://www.youtube.com/embed/chuNCzd3OHk?autoplay=1&mute=1&loop=1&playlist=chuNCzd3OHk&controls=0&modestbranding=1&showinfo=0"
          title="Hero Video"
          frameBorder="0"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        ></iframe>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 px-4">
          <h1 className={`${animationClasses('delay-0')} text-6xl md:text-8xl font-bold uppercase tracking-widest text-white`}>
            {t(currentText.line1)}
          </h1>
          <h2 className={`${animationClasses('delay-100')} text-7xl md:text-9xl lg:text-[10rem] font-black uppercase tracking-wider text-outline text-transparent mt-2`} style={{ transitionDelay: '100ms' }}>
            {t(currentText.line2)}
          </h2>
          <p className={`${animationClasses('delay-200')} mt-6 text-lg md:text-2xl max-w-3xl mx-auto text-gray-300`} style={{ transitionDelay: '200ms' }}>
            {t(currentText.subtitle)}
          </p>
          <ReactRouterDOM.NavLink 
            to="/membership" 
            className={`${animationClasses('delay-300')} mt-10 inline-flex items-center gap-3 bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-4 px-10 text-lg uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
            style={{ transitionDelay: '300ms' }}
          >
            <span>{t('home.joinButton')}</span>
            <ArrowRightIcon className="h-6 w-6" />
          </ReactRouterDOM.NavLink>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-24 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-5xl font-extrabold text-center uppercase tracking-wider text-gray-900 dark:text-white">
                    {t('home.wmusd.title')}
                </h2>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                    {t('home.wmusd.subtitle')}
                </p>
            </div>
            <div className="space-y-20">
                <DifferenceItem 
                    num="01"
                    icon={<UsersIcon className="h-12 w-12 text-accent"/>}
                    title={t('home.wmusd.item1.title')}
                    text={t('home.wmusd.item1.text')}
                    image={imageAssets.homeDifferenceCommunity}
                />
                <DifferenceItem 
                    num="02"
                    icon={<ClipboardIcon className="h-12 w-12 text-accent"/>}
                    title={t('home.wmusd.item2.title')}
                    text={t('home.wmusd.item2.text')}
                    image={imageAssets.homeDifferenceCoaching}
                    reverse
                />
                <DifferenceItem 
                    num="03"
                    icon={<BoltIcon className="h-12 w-12 text-accent"/>}
                    title={t('home.wmusd.item3.title')}
                    text={t('home.wmusd.item3.text')}
                    image={imageAssets.homeDifferenceEnergy}
                />
            </div>
        </div>
      </section>

      {/* Your Journey Starts Here Section */}
      <section className="py-24 bg-white dark:bg-[#101012]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-5xl font-extrabold text-center uppercase tracking-wider text-gray-900 dark:text-white">{t('home.steps.title')}</h2>
                  <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">{t('home.steps.subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <StepCard
                      num="01"
                      icon={<CalendarCheckIcon className="h-12 w-12"/>}
                      title={t('home.steps.step1Title')}
                      text={t('home.steps.step1Text')}
                  />
                  <StepCard
                      num="02"
                      icon={<DumbbellIcon className="h-12 w-12"/>}
                      title={t('home.steps.step2Title')}
                      text={t('home.steps.step2Text')}
                  />
                  <StepCard
                      num="03"
                      icon={<UsersIcon className="h-12 w-12"/>}
                      title={t('home.steps.step3Title')}
                      text={t('home.steps.step3Text')}
                  />
              </div>
              <div className="text-center mt-12">
                   <ReactRouterDOM.NavLink 
                      to="/contact" 
                      className="inline-flex items-center gap-3 bg-accent text-black font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-full hover:bg-accent-dark transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                      <span>{t('home.steps.ctaButton')}</span>
                      <ArrowRightIcon className="h-6 w-6" />
                  </ReactRouterDOM.NavLink>
              </div>
          </div>
      </section>
      
      {/* Types of Classes Section */}
      <section className="py-24 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-5xl font-extrabold text-center uppercase tracking-wider text-gray-900 dark:text-white">{t('home.classesTitle')}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <ClassCard title={t('home.class1Title')} text={t('home.class1Text')} image={imageAssets.homeClassWod} />
                <ClassCard title={t('home.class2Title')} text={t('home.class2Text')} image={imageAssets.homeClassOpenGym} />
                <ClassCard title={t('home.class3Title')} text={t('home.class3Text')} image={imageAssets.homeClassCommunity} />
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-[#101012]">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-5xl font-extrabold text-center uppercase tracking-wider text-gray-900 dark:text-white">{t('home.testimonialsTitle')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard 
                    name="Jessica M." 
                    quote={t('home.testimonial1')} 
                    image={imageAssets.testimonialJessica} 
                />
                <TestimonialCard 
                    name="David L." 
                    quote={t('home.testimonial2')} 
                    image={imageAssets.testimonialDavid} 
                />
                <TestimonialCard 
                    name="Sarah K." 
                    quote={t('home.testimonial3')}
                    image={imageAssets.testimonialSarah} 
                />
            </div>
         </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">{t('home.ctaTitle')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                {t('home.ctaText')}
            </p>
            <ReactRouterDOM.NavLink 
                to="/contact" 
                className="inline-flex items-center gap-3 bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-4 px-10 text-lg uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
                <span>{t('membership.trialButton')}</span>
                 <ArrowRightIcon className="h-6 w-6" />
            </ReactRouterDOM.NavLink>
        </div>
      </section>

    </div>
  );
};

export default HomePage;