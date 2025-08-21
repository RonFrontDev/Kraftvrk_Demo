
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ProductCard = ({ name, price, image }: { name: string, price: string, image: string }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
        <div className="relative">
            <img src={image} alt={name} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
        </div>
        <div className="p-6">
            <h3 className="font-teko text-3xl text-white uppercase">{name}</h3>
            <p className="text-2xl font-bold text-red-500">{price}</p>
            <button className="mt-4 w-full bg-red-600 text-white font-bold py-2 px-4 text-md uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors duration-300">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="font-teko text-7xl font-bold uppercase tracking-wider text-white">{t('shop.title')}</h1>
                <p className="text-xl text-gray-400">{t('shop.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <ProductCard
                        key={product.nameKey}
                        name={t(product.nameKey)}
                        price={t(product.priceKey)}
                        image={`https://picsum.photos/400/300?random=${product.imageId}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
