import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    const faqs = [
        {
            q: "What is the best time of year to visit Cambodia?",
            a: "The cool and dry season from November to February is ideal, with comfortable temperatures for exploring Angkor Wat and beach visits. The green season (June to October) offers lush countryside, fewer tourists, and spectacular waterfalls in Mondulkiri."
        },
        {
            q: "Do I need a visa to travel to Cambodia?",
            a: "Most international travelers can obtain a 30-day tourist visa on arrival at Phnom Penh and Siem Reap airports, or apply online for an official Cambodia e-Visa beforehand."
        },
        {
            q: "How accurate are the travel distances and fuel estimations?",
            a: "Our calculator incorporates genuine GPS coordinate calculations adjusted with a 1.35x road tortuosity factor to simulate Cambodian National Highways accurately."
        },
        {
            q: "Are the hidden gems accessible for solo travelers?",
            a: "Yes! Many hidden gems can be reached by motorbike or tuk-tuk. For off-road rural paths during rainy season, we recommend hiring a local community guide listed on our Hidden Gems page."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-20 space-y-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Get In Touch</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Contact Our Travel Team
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    Have questions about itineraries, customized private packages, or partnership inquiries? Send us a message anytime.
                </p>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-800">
                    {sent ? (
                        <div className="text-center py-12 space-y-4 animate-fadeIn">
                            <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Received!</h3>
                            <p className="text-sm text-slate-500 max-w-md mx-auto">
                                Thank you for contacting us, {name}. A member of our RUPP travel team will get back to you within 24 hours.
                            </p>
                            <button
                                onClick={() => setSent(false)}
                                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full name"
                                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@domain.com"
                                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="e.g. Tour inquiry for Siem Reap & Kampot"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="How can we assist your trip planning?"
                                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:border-blue-500 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                                <span>Send Travel Inquiry</span>
                            </button>
                        </form>
                    )}
                </div>

                {/* Direct info & Channels */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
                        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                            Direct Contact Channels
                        </h3>

                        <div className="space-y-4 text-xs sm:text-sm">
                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900 dark:text-white block">University Office</span>
                                    <span className="text-slate-500">RUPP Campus I, Russian Blvd, Phnom Penh, Cambodia</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900 dark:text-white block">Phone & WhatsApp</span>
                                    <span className="text-slate-500">+855 (0) 96 123 4567</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="font-bold text-slate-900 dark:text-white block">Email Inquiries</span>
                                    <span className="text-slate-500">contact@findyourtrip.kh</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
                            <a
                                href="https://t.me"
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                            >
                                <i className="fa-brands fa-telegram text-base"></i>
                                <span>Telegram Chat</span>
                            </a>
                            <a
                                href="https://wa.me/85517573682"
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                            >
                                <i className="fa-brands fa-whatsapp text-base"></i>
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>

                    {/* Google Maps Embed */}
                    <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl h-64 bg-slate-900 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250151.15120619943!2d104.7337651032822!3d11.57966690462215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c668bf829fd8fb6!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Phnom Penh Location Map"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Travel FAQ Accordion */}
            <div className="max-w-4xl mx-auto space-y-6 pt-6">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white text-center">
                    Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                            </button>
                            {openFaq === idx && (
                                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
