import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Slideshow from '../components/Slideshow';
import { motion } from 'framer-motion';

const memberImages = [
  'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/863977/pexels-photo-863977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2261482/pexels-photo-2261482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
];

const galleryImages = [
  'https://images.pexels.com/photos/4761786/pexels-photo-4761786.jpeg',
  'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg',
  'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg',
  'https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg',
  'https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg',
  'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
  'https://images.pexels.com/photos/4164085/pexels-photo-4164085.jpeg',
  'https://images.pexels.com/photos/3838329/pexels-photo-3838329.jpeg',
  'https://images.pexels.com/photos/4753997/pexels-photo-4753997.jpeg',
  'https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg',
  'https://images.pexels.com/photos/4761793/pexels-photo-4761793.jpeg',
  'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const MembersPage = (): React.ReactNode => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('members.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('members.subtitle')}</p>
      </div>
      <Slideshow images={memberImages} />
      
      <div className="mt-24">
         <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">{t('members.galleryTitle')}</h2>
         </div>
         <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
         >
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden rounded-2xl group shadow-lg"
                variants={itemVariants}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <img src={`${src}?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2`} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
         </motion.div>
      </div>

    </div>
  );
};

export default MembersPage;