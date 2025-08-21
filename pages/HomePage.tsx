
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircleIcon } from '../components/IconComponents';
import { useLanguage } from '../contexts/LanguageContext';


const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="font-teko text-3xl text-white mb-2">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const TestimonialCard = ({ quote, name, image }: { quote: string, name: string, image: string }) => (
    <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
        <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-red-500"/>
        <p className="text-gray-300 italic mb-4">"{quote}"</p>
        <h4 className="font-teko text-2xl text-white">- {name}</h4>
    </div>
);

const HomePage = (): React.ReactNode => {
  const { t } = useLanguage();

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute z-0 top-0 left-0 w-full h-full pointer-events-none">
           <iframe
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube.com/embed/chuNCzd3OHk?autoplay=1&mute=1&loop=1&playlist=chuNCzd3OHk&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Kraftvrk Promo"
            ></iframe>
        </div>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 px-4">
          <h1 className="font-teko text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider text-white drop-shadow-lg">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            {t('home.heroSubtitle')}
          </p>
          <NavLink to="/wod" className="mt-8 inline-block bg-red-600 text-white font-bold py-3 px-8 text-lg uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105">
            {t('home.viewWodButton')}
          </NavLink>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-teko text-5xl text-center mb-12 uppercase tracking-wider">{t('home.whyTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <FeatureCard icon={<CheckCircleIcon className="h-6 w-6"/>} title={t('home.feature1Title')}>
               {t('home.feature1Text')}
            </FeatureCard>
            <FeatureCard icon={<CheckCircleIcon className="h-6 w-6"/>} title={t('home.feature2Title')}>
                {t('home.feature2Text')}
            </FeatureCard>
            <FeatureCard icon={<CheckCircleIcon className="h-6 w-6"/>} title={t('home.feature3Title')}>
                {t('home.feature3Text')}
            </FeatureCard>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-black">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-teko text-5xl text-center mb-12 uppercase tracking-wider">{t('home.testimonialsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard 
                    name="Jessica M." 
                    quote={t('home.testimonial1')} 
                    image="https://picsum.photos/200/200?random=1" 
                />
                <TestimonialCard 
                    name="David L." 
                    quote={t('home.testimonial2')} 
                    image="https://picsum.photos/200/200?random=2" 
                />
                <TestimonialCard 
                    name="Sarah K." 
                    quote={t('home.testimonial3')}
                    image="https://picsum.photos/200/200?random=3" 
                />
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-teko text-5xl text-white mb-4 uppercase">{t('home.ctaTitle')}</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                {t('home.ctaText')}
            </p>
            <NavLink 
                to="/schedule" 
                className="inline-block bg-red-600 text-white font-bold py-4 px-10 text-xl uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
            >
                {t('home.ctaButton')}
            </NavLink>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
