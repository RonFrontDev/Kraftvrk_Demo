import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UsersIcon, BoltIcon, SparklesIcon, ArrowRightIcon } from '../components/IconComponents';
import { useLanguage } from '../contexts/LanguageContext';
import ValueCard from '../components/ValueCard';
import ClassCard from '../components/ClassCard';
import TestimonialCard from '../components/TestimonialCard';

const heroTexts = [
  { line1: 'home.heroTitle1', line2: 'home.heroTitle2', subtitle: 'home.heroSubtitle' },
  { line1: 'home.hero2Title1', line2: 'home.hero2Title2', subtitle: 'home.hero2Subtitle' },
  { line1: 'home.hero3Title1', line2: 'home.hero3Title2', subtitle: 'home.hero3Subtitle' },
  { line1: 'home.hero4Title1', line2: 'home.hero4Title2', subtitle: 'home.hero4Subtitle' }
];

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
          <NavLink 
            to="/membership" 
            className={`${animationClasses('delay-300')} mt-10 inline-flex items-center gap-3 bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-4 px-10 text-lg uppercase tracking-wider rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
            style={{ transitionDelay: '300ms' }}
          >
            <span>{t('home.joinButton')}</span>
            <ArrowRightIcon className="h-6 w-6" />
          </NavLink>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-extrabold text-center uppercase tracking-wider text-gray-900 dark:text-white">
              {t('home.valuesTitle')}
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {t('home.valuesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard icon={<UsersIcon className="h-12 w-12"/>} title={t('home.value1Title')}>
              {t('home.value1Text')}
            </ValueCard>
            <ValueCard icon={<BoltIcon className="h-12 w-12"/>} title={t('home.value2Title')}>
              {t('home.value2Text')}
            </ValueCard>
            <ValueCard icon={<SparklesIcon className="h-12 w-12"/>} title={t('home.value3Title')}>
              {t('home.value3Text')}
            </ValueCard>
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
                <ClassCard title={t('home.class1Title')} text={t('home.class1Text')} image="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <ClassCard title={t('home.class2Title')} text={t('home.class2Text')} image="https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <ClassCard title={t('home.class3Title')} text={t('home.class3Text')} image="https://images.pexels.com/photos/4164085/pexels-photo-4164085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-5xl font-extrabold text-center uppercase tracking-wider text-gray-900 dark:text-white">{t('home.testimonialsTitle')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard 
                    name="Jessica M." 
                    quote={t('home.testimonial1')} 
                    image="https://randomuser.me/api/portraits/women/21.jpg" 
                />
                <TestimonialCard 
                    name="David L." 
                    quote={t('home.testimonial2')} 
                    image="https://randomuser.me/api/portraits/men/32.jpg" 
                />
                <TestimonialCard 
                    name="Sarah K." 
                    quote={t('home.testimonial3')}
                    image="https://randomuser.me/api/portraits/women/45.jpg" 
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
            <NavLink 
                to="/contact" 
                className="inline-flex items-center gap-3 bg-gradient-accent bg-gradient-accent-hover text-black font-bold py-4 px-10 text-lg uppercase tracking-wider rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
                <span>{t('membership.trialButton')}</span>
                 <ArrowRightIcon className="h-6 w-6" />
            </NavLink>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
