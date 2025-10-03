import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Slideshow from '../components/Slideshow';
import { motion } from 'framer-motion';
import Image from '../components/Image';
import { imageAssets } from '../data/images';

const memberImages = [
  imageAssets.membersSlideshow1,
  imageAssets.membersSlideshow2,
  imageAssets.membersSlideshow3,
  imageAssets.membersSlideshow4,
  imageAssets.membersSlideshow5,
  imageAssets.membersSlideshow6
];

const galleryImages = [
  imageAssets.membersGallery1,
  imageAssets.membersGallery2,
  imageAssets.membersGallery3,
  imageAssets.membersGallery4,
  imageAssets.membersGallery5,
  imageAssets.membersGallery6,
  imageAssets.membersGallery7,
  imageAssets.membersGallery8,
  imageAssets.membersGallery9,
  imageAssets.membersGallery10,
  imageAssets.membersGallery11,
  imageAssets.membersGallery12,
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
                <Image src={`${src}?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2`} alt={`Gallery image ${index + 1}`} className="w-full h-full" imageClassName="transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
         </motion.div>
      </div>

    </div>
  );
};

export default MembersPage;