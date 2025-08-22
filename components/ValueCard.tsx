
import React from 'react';
import type { ReactNode } from 'react';

const ValueCard = ({ icon, title, children }: { icon: ReactNode, title: string, children: ReactNode }): ReactNode => (
  <div className="text-center p-6 bg-white dark:bg-[#1A1A1C] rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
    <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-[#101012] text-accent mb-6 mx-auto shadow-lg">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{children}</p>
  </div>
);

export default ValueCard;
