import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, type Variants } from 'framer-motion';

// FIX: Explicitly type 'itemVariants' with Variants from framer-motion.
// This ensures TypeScript correctly interprets the 'transition' property
// and resolves the 'AnimationGeneratorType' error.
const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 120,
        }
    }
};

// FIX: Changed return type to JSX.Element to fix type issues with framer-motion props.
const ProductCard = ({ name, price, image }: { name: string, price: string, image: string }): JSX.Element => {
    const { t } = useLanguage();
    return (
        <motion.div 
            className="bg-white dark:bg-[#1A1A1C] overflow-hidden group shadow-lg rounded-2xl flex flex-col"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div className="relative aspect-square w-full overflow-hidden">
                <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide flex-grow">{name}</h3>
                <p className="text-xl font-bold text-accent mt-2">{price}</p>
                <button className="mt-4 w-full bg-accent text-black font-bold py-2 px-4 text-sm uppercase tracking-wider rounded-full hover:bg-accent-dark transition-colors duration-300">
                    {t('shop.addToCart')}
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;