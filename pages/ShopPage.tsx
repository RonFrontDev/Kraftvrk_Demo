import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ProductCard = ({ name, price, image }: { name: string, price: string, image: string }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white dark:bg-[#1A1A1C] overflow-hidden group shadow-lg rounded-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden">
                <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide flex-grow">{name}</h3>
                <p className="text-xl font-bold text-accent mt-2">{price}</p>
                <button className="mt-4 w-full bg-accent text-black font-bold py-2 px-4 text-sm uppercase tracking-wider rounded-md hover:bg-accent-dark transition-colors duration-300">
                    {t('shop.addToCart')}
                </button>
            </div>
        </div>
    );
};

type Category = 'apparel' | 'accessories' | 'equipment';
interface Product {
    nameKey: string;
    priceKey: string;
    imageId: string;
    category: Category;
}

const products: Product[] = [
    { nameKey: 'shop.product1Name', priceKey: 'shop.product1Price', imageId: '15', category: 'apparel' },
    { nameKey: 'shop.product2Name', priceKey: 'shop.product2Price', imageId: '16', category: 'apparel' },
    { nameKey: 'shop.product3Name', priceKey: 'shop.product3Price', imageId: '17', category: 'apparel' },
    { nameKey: 'shop.product4Name', priceKey: 'shop.product4Price', imageId: '18', category: 'accessories' },
    { nameKey: 'shop.product5Name', priceKey: 'shop.product5Price', imageId: '19', category: 'equipment' },
    { nameKey: 'shop.product6Name', priceKey: 'shop.product6Price', imageId: '20', category: 'accessories' },
];

const categories = ['all', 'apparel', 'accessories', 'equipment'];

const ShopPage = (): React.ReactNode => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'all') {
            return products;
        }
        return products.filter(product => product.category === activeCategory);
    }, [activeCategory, products]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <div className="text-center mb-12">
                <h1 className="text-7xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white">{t('shop.title')}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">{t('shop.subtitle')}</p>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 text-sm font-medium uppercase tracking-wider rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-[#101012] focus:ring-accent
                        ${activeCategory === category
                            ? 'bg-accent text-black'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                        }`}
                    >
                        {t(`shop.category_${category}`)}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.nameKey}
                        name={t(product.nameKey)}
                        price={t(product.priceKey)}
                        image={`https://picsum.photos/400/400?random=${product.imageId}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
