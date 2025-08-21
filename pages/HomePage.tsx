
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UsersIcon, BoltIcon, SparklesIcon, ArrowRightIcon } from '../components/IconComponents';
import { useLanguage } from '../contexts/LanguageContext';

const ValueCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="text-center p-4">
    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white dark:bg-[#1c1c1e] text-accent mb-6 mx-auto shadow-md">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 uppercase">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>
  </div>
);

const ClassCard = ({ title, text, image }: { title: string, text: string, image: string }) => (
    <div className="bg-white dark:bg-[#1c1c1e] overflow-hidden group">
        <div className="relative h-96">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-4xl font-extrabold text-white uppercase">{title}</h3>
                <p className="text-gray-300 mt-2">{text}</p>
            </div>
        </div>
    </div>
);

const TestimonialCard = ({ quote, name, image }: { quote: string, name: string, image: string }) => (
    <div className="bg-white dark:bg-[#1c1c1e] p-8 text-center shadow-lg rounded-md">
        <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-6"/>
        <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-6">"{quote}"</p>
        <h4 className="font-semibold text-xl text-accent tracking-wider">- {name}</h4>
    </div>
);

const HomePage = (): React.ReactNode => {
  const { t } = useLanguage();

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 px-4">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wider text-white">
            {t('home.heroTitle1')}
          </h1>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider text-outline text-transparent mt-2">
            {t('home.heroTitle2')}
          </h2>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            {t('home.heroSubtitle')}
          </p>
          <NavLink 
            to="/membership" 
            className="mt-10 inline-flex items-center gap-3 bg-accent text-black font-bold py-4 px-10 text-lg uppercase tracking-wider rounded-sm hover:bg-accent-dark transition-colors duration-300"
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
            <h2 className="text-5xl font-extrabold text-center uppercase tracking-wider text-gray-900 dark:text-white">{t('home.valuesTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <ValueCard icon={<UsersIcon className="h-10 w-10"/>} title={t('home.value1Title')}>
               {t('home.value1Text')}
            </ValueCard>
            <ValueCard icon={<BoltIcon className="h-10 w-10"/>} title={t('home.value2Title')}>
                {t('home.value2Text')}
            </ValueCard>
            <ValueCard icon={<SparklesIcon className="h-10 w-10"/>} title={t('home.value3Title')}>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
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
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 uppercase">{t('home.ctaTitle')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                {t('home.ctaText')}
            </p>
            <NavLink 
                to="/membership" 
                className="inline-flex items-center gap-3 bg-accent text-black font-bold py-4 px-10 text-lg uppercase tracking-wider rounded-sm hover:bg-accent-dark transition-colors duration-300"
            >
                <span>{t('home.ctaButton')}</span>
                 <ArrowRightIcon className="h-6 w-6" />
            </NavLink>
        </div>
      </section>

    </div>
  );
};

export default HomePage;