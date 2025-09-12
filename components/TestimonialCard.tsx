

import React from 'react';

const TestimonialCard = ({ quote, name, image }: { quote: string, name: string, image: string }): React.ReactNode => (
    <div className="bg-white dark:bg-[#1A1A1C] p-8 text-center shadow-xl rounded-2xl transform hover:-translate-y-2 transition-transform duration-300">
        <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-accent/50"/>
        <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-6">"{quote}"</p>
        <h4 className="font-semibold text-xl text-accent tracking-wider">- {name}</h4>
    </div>
);

export default TestimonialCard;