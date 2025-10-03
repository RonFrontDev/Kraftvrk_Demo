import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { imageAssets } from '../data/images';

const ContactInfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="bg-gray-200/20 dark:bg-black/30 text-accent rounded-full p-4 mb-3 border-2 border-gray-300/30 dark:border-gray-700/50">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">{label}</h3>
            <p className="text-gray-300">{value}</p>
        </div>
    );
}

const ContactPage = (): React.ReactNode => {
    const { t } = useLanguage();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Message sent! (This is a demo)');
    };

    return (
        <div className="relative min-h-screen">
             <div 
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url('${imageAssets.contactBg}')` }}
            />
            <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />
            
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 flex flex-col items-center justify-center min-h-screen">
                    <div className="text-center mb-12">
                        <h1 className="text-7xl font-extrabold uppercase tracking-widest text-white">{t('contact.title')}</h1>
                        <p className="text-xl max-w-3xl mx-auto mt-4 text-gray-300">{t('contact.subtitle')}</p>
                    </div>

                    <div className="max-w-xl w-full mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">{t('contact.formTitle')}</h2>
                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-white">{t('contact.formName')}</Label>
                                <Input id="name" type="text" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-white">{t('contact.formEmail')}</Label>
                                <Input id="email" type="email" required className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="phone" className="text-white">{t('contact.formPhone')}</Label>
                                <Input id="phone" type="tel" className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="message" className="text-white">{t('contact.formMessage')}</Label>
                                <Textarea id="message" required rows={5} className="bg-transparent text-white border-white/30 placeholder:text-gray-400 focus:bg-black/20"/>
                            </div>
                            <Button className="w-full !mt-6" size="lg" type="submit">
                                {t('contact.formButton')}
                            </Button>
                        </form>
                    </div>

                    <div className="max-w-4xl w-full mx-auto mt-20">
                         <div className="relative flex pb-12 items-center">
                            <div className="flex-grow border-t border-gray-300/30 dark:border-gray-700/50"></div>
                            <span className="flex-shrink mx-4 text-gray-300 dark:text-gray-400 uppercase text-sm font-medium">{t('contact.infoTitle')}</span>
                            <div className="flex-grow border-t border-gray-300/30 dark:border-gray-700/50"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <ContactInfoItem 
                                icon={MailIcon}
                                label={t('contact.infoEmailLabel')}
                                value="contact@kraftvrk.com"
                            />
                            <ContactInfoItem 
                                icon={PhoneIcon}
                                label={t('contact.infoPhoneLabel')}
                                value="+354 555-1234"
                            />
                            <ContactInfoItem 
                                icon={MapPinIcon}
                                label={t('contact.infoAddressLabel')}
                                value="123 Strength Ave, Reykjavik"
                            />
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ContactPage;