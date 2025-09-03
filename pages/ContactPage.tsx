import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { ContactCard } from '../components/ui/contact-card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

const ContactPage = (): React.ReactNode => {
    const { t } = useLanguage();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Message sent! (This is a demo)');
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32 min-h-screen flex items-center justify-center">
             <ContactCard
                title={t('contact.title')}
                description={t('contact.subtitle')}
                contactInfo={[
                    {
                        icon: MailIcon,
                        label: t('contact.infoEmailLabel'),
                        value: 'contact@kraftvrk.com',
                    },
                    {
                        icon: PhoneIcon,
                        label: t('contact.infoPhoneLabel'),
                        value: '+354 555-1234',
                    },
                    {
                        icon: MapPinIcon,
                        label: t('contact.infoAddressLabel'),
                        value: '123 Strength Ave, Reykjavik, 101, Iceland',
                        className: 'md:col-span-2',
                    }
                ]}
            >
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">{t('contact.formName')}</Label>
                        <Input id="name" type="text" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">{t('contact.formEmail')}</Label>
                        <Input id="email" type="email" required />
                    </div>
                     <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">{t('contact.formPhone')}</Label>
                        <Input id="phone" type="tel" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="message">{t('contact.formMessage')}</Label>
                        <Textarea id="message" required />
                    </div>
                    <Button className="w-full" type="submit">
                        {t('contact.formButton')}
                    </Button>
                </form>
            </ContactCard>
        </div>
    );
};

export default ContactPage;