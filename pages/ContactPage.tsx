import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MailIcon, MapPinIcon, PhoneIcon } from '../components/IconComponents';

const ContactPage = (): React.ReactNode => {
    const { t } = useLanguage();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Message sent! (This is a demo)');
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
            <div className="text-center mb-12">
                <h1 className="text-7xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white">{t('contact.title')}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('contact.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-[#1A1A1C] p-10 rounded-lg shadow-xl">
                {/* Contact Form */}
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">{t('contact.formTitle')}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact.formName')}</label>
                            <input type="text" name="name" id="name" required className="mt-1 block w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-accent focus:border-accent" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact.formEmail')}</label>
                            <input type="email" name="email" id="email" required className="mt-1 block w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-accent focus:border-accent" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact.formMessage')}</label>
                            <textarea id="message" name="message" rows={5} required className="mt-1 block w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-accent focus:border-accent"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-accent text-black font-bold py-3 px-6 text-lg uppercase tracking-wider rounded-md hover:bg-accent-dark transition-colors duration-300">
                                {t('contact.formButton')}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Info & Map */}
                <div className="space-y-8">
                     <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">{t('contact.infoTitle')}</h2>
                        <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                            <p className="flex items-start">
                                <MapPinIcon className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
                                <span>123 Strength Ave, Reykjavik, 101, Iceland</span>
                            </p>
                            <p className="flex items-center">
                                <PhoneIcon className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                                <a href="tel:+3545551234" className="hover:text-accent transition-colors">+354 555-1234</a>
                            </p>
                            <p className="flex items-center">
                                <MailIcon className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                                <a href="mailto:contact@kraftvrk.com" className="hover:text-accent transition-colors">contact@kraftvrk.com</a>
                            </p>
                        </div>
                    </div>
                     <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wide">{t('contact.locationTitle')}</h2>
                        <div className="aspect-w-16 aspect-h-9 overflow-hidden shadow-lg rounded-md">
                             <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1739.6307335276434!2d-21.94420468417783!3d64.14658218204675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d674d303289999%3A0x8283c8c70f3f228d!2sHallgr%C3%ADmskirkja!5e0!3m2!1sen!2sus!4v1620834015031!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                title="Gym Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;