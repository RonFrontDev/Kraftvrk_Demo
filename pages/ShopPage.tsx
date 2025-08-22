import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ProductCard = ({ name, price, image }: { name: string, price: string, image: string }) => (
    <div className="bg-white dark:bg-[#1A1A1C] overflow-hidden group shadow-lg rounded-lg">
        <div className="relative aspect-[4/5]">
            <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
        </div>
        <div className="p-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">{name}</h3>
            <p className="text-2xl font-bold text-accent">{price}</p>
            <button className="mt-4 w-full bg-accent text-black font-bold py-2 px-4 text-md uppercase tracking-wider rounded-md hover:bg-accent-dark transition-colors duration-300">
                Add to Cart
            </button>
        </div>
    </div>
);


const ShopPage = (): React.ReactNode => {
    const { t } = useLanguage();

    const products = [
        { nameKey: 'shop.product1Name', priceKey: 'shop.product1Price', imageId: '15' },
        { nameKey: 'shop.product2Name', priceKey: 'shop.product2Price', imageId: '16' },
        { nameKey: 'shop.product3Name', priceKey: 'shop.product3Price', imageId: '17' },
        { nameKey: 'shop.product4Name', priceKey: 'shop.product4Price', imageId: '18' },
        { nameKey: 'shop.product5Name', priceKey: 'shop.product5Price', imageId: '19' },
        { nameKey: 'shop.product6Name', priceKey: 'shop.product6Price', imageId: '20' },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <div className="text-center mb-12">
                <h1 className="text-7xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white">{t('shop.title')}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">{t('shop.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <ProductCard
                        key={product.nameKey}
                        name={t(product.nameKey)}
                        price={t(product.priceKey)}
                        image={`https://picsum.photos/400/500?random=${product.imageId}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;