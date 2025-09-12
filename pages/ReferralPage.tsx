

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Users as UsersIcon, Building as BuildingIcon, CheckCircle as CheckCircleIcon } from 'lucide-react';
import { cn } from '../lib/utils';

type Tab = 'friend' | 'company';

const ReferralPage = (): React.ReactNode => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<Tab>('friend');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    const tabContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };
    
    const renderForm = () => {
        if (isSubmitted) {
            return (
                <motion.div 
                    className="text-center p-8 flex flex-col items-center min-h-[400px] justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-white">{t('referral.successTitle')}</h3>
                    <p className="text-gray-300 mt-2">{t('referral.successMessage')}</p>
                    <Button onClick={() => setIsSubmitted(false)} className="mt-6">
                        Send Another Referral
                    </Button>
                </motion.div>
            );
        }

        return (
            <form onSubmit={handleSubmit} className="w-full space-y-4 p-8">
                <AnimatePresence mode="wait">
                    {activeTab === 'friend' ? (
                        <motion.div key="friend" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                            <div>
                                <Label htmlFor="your-name-friend" className="text-white">{t('referral.form.yourName')}</Label>
                                <Input id="your-name-friend" type="text" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                            <div>
                                <Label htmlFor="your-email-friend" className="text-white">{t('referral.form.yourEmail')}</Label>
                                <Input id="your-email-friend" type="email" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                            <div>
                                <Label htmlFor="friend-name" className="text-white">{t('referral.form.friendName')}</Label>
                                <Input id="friend-name" type="text" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                            <div>
                                <Label htmlFor="friend-email" className="text-white">{t('referral.form.friendEmail')}</Label>
                                <Input id="friend-email" type="email" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="company" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                            <div>
                                <Label htmlFor="your-name-company" className="text-white">{t('referral.form.yourName')}</Label>
                                <Input id="your-name-company" type="text" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                            <div>
                                <Label htmlFor="your-email-company" className="text-white">{t('referral.form.yourEmail')}</Label>
                                <Input id="your-email-company" type="email" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                             <div>
                                <Label htmlFor="company-name" className="text-white">{t('referral.form.companyName')}</Label>
                                <Input id="company-name" type="text" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                            <div>
                                <Label htmlFor="contact-name" className="text-white">{t('referral.form.contactName')}</Label>
                                <Input id="contact-name" type="text" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                            <div>
                                <Label htmlFor="contact-email" className="text-white">{t('referral.form.contactEmail')}</Label>
                                <Input id="contact-email" type="email" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Button className="w-full !mt-6" size="lg" type="submit">
                    {t('referral.form.sendButton')}
                </Button>
            </form>
        );
    };

    return (
        <div className="relative min-h-screen">
             <div 
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
            />
            <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center mb-12">
                        <h1 className="text-7xl font-extrabold uppercase tracking-widest text-white">{t('referral.title')}</h1>
                        <p className="text-xl max-w-3xl mx-auto mt-4 text-gray-300">{t('referral.subtitle')}</p>
                    </div>

                    <div className="max-w-2xl w-full mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-lg">
                        <div className="flex border-b border-white/20">
                            <TabButton
                                icon={UsersIcon}
                                label={t('referral.tabFriend')}
                                isActive={activeTab === 'friend'}
                                onClick={() => { setActiveTab('friend'); setIsSubmitted(false); }}
                            />
                            <TabButton
                                icon={BuildingIcon}
                                label={t('referral.tabCompany')}
                                isActive={activeTab === 'company'}
                                onClick={() => { setActiveTab('company'); setIsSubmitted(false); }}
                            />
                        </div>
                        <div className="text-center text-gray-300 italic p-6 pb-0">
                            <p>{t('referral.benefit')}</p>
                        </div>
                        {renderForm()}
                    </div>
            </div>
        </div>
    );
};

interface TabButtonProps {
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton = ({ icon: Icon, label, isActive, onClick }: TabButtonProps) => (
    <button
        onClick={onClick}
        className={cn(
            "relative flex-1 p-4 flex items-center justify-center gap-3 font-bold text-white transition-colors duration-300",
            isActive ? "" : "bg-black/20 hover:bg-black/40"
        )}
    >
        <Icon className={cn("h-5 w-5", isActive ? "text-accent" : "text-white")} />
        <span className="relative z-10">{label}</span>
        {isActive && (
            <motion.div
                className="absolute inset-0 bg-accent/10 border-b-2 border-accent"
                layoutId="activeTabIndicator"
            />
        )}
    </button>
);


export default ReferralPage;