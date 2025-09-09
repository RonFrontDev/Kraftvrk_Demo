import React, { useState, useContext, createContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '../IconComponents';
import { cn } from '../../lib/utils';

interface AccordionContextType {
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion provider');
  }
  return context;
};

export const Accordion = ({ children, defaultValue }: { children: ReactNode, defaultValue?: string | null }): JSX.Element => {
  const [openItem, setOpenItem] = useState<string | null>(defaultValue || null);

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className="w-full max-w-7xl mx-auto space-y-4">{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  trigger: ReactNode;
  children: ReactNode;
}

export const AccordionItem = ({ value, trigger, children }: AccordionItemProps): JSX.Element => {
  const { openItem, setOpenItem } = useAccordion();
  const isOpen = openItem === value;

  const toggleOpen = () => {
    setOpenItem(isOpen ? null : value);
  };

  return (
    <div className="bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full p-6 text-left text-xl sm:text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${value}`}
      >
        <span>{trigger}</span>
        <ChevronDownIcon
          className={cn('h-6 w-6 transition-transform duration-300 flex-shrink-0', isOpen && 'rotate-180')}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${value}`}
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
