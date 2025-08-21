
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="font-teko text-7xl font-bold uppercase tracking-wider text-white">{t('contact.title')}</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('contact.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-800 p-8 rounded-lg shadow-2xl">
                {/* Contact Form */}
                <div>
                    <h2 className="font-teko text-4xl text-white mb-6 uppercase">{t('contact.formTitle')}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t('contact.formName')}</label>
                            <input type="text" name="name" id="name" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('contact.formEmail')}</label>
                            <input type="email" name="email" id="email" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">{t('contact.formMessage')}</label>
                            <textarea id="message" name="message" rows={5} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-red-500 focus:border-red-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 px-6 text-lg uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors duration-300">
                                {t('contact.formButton')}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Info & Map */}
                <div className="space-y-8">
                     <div>
                        <h2 className="font-teko text-4xl text-white mb-6 uppercase">{t('contact.infoTitle')}</h2>
                        <div className="space-y-4 text-lg">
                            <p className="flex items-start">
                                <MapPinIcon className="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
                                <span>123 Strength Ave, Reykjavik, 101, Iceland</span>
                            </p>
                            <p className="flex items-center">
                                <PhoneIcon className="h-6 w-6 text-red-500 mr-4 flex-shrink-0" />
                                <a href="tel:+3545551234" className="hover:text-red-400 transition-colors">+354 555-1234</a>
                            </p>
                            <p className="flex items-center">
                                <MailIcon className="h-6 w-6 text-red-500 mr-4 flex-shrink-0" />
                                <a href="mailto:contact@kraftvrk.com" className="hover:text-red-400 transition-colors">contact@kraftvrk.com</a>
                            </p>
                        </div>
                    </div>
                     <div>
                        <h2 className="font-teko text-4xl text-white mb-6 uppercase">{t('contact.locationTitle')}</h2>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
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
