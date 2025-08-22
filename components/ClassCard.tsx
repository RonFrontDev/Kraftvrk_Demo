
import React from 'react';

const ClassCard = ({ title, text, image }: { title: string, text: string, image: string }): React.ReactNode => (
    <div className="bg-white dark:bg-[#1A1A1C] overflow-hidden group rounded-lg shadow-xl">
        <div className="relative h-96">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
            <div className="absolute bottom-0 left-0 p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-4xl font-extrabold text-white uppercase tracking-wide">{title}</h3>
                <p className="text-gray-300 mt-2 opacity-80 group-hover:opacity-100">{text}</p>
            </div>
        </div>
    </div>
);

export default ClassCard;
