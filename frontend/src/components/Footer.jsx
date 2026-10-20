import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (newsletterEmail.trim()) {
            setSubscribed(true);
            setTimeout(() => {
                setNewsletterEmail('');
                setSubscribed(false);
            }, 4000);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200/90 dark:border-slate-800/80 overflow-hidden transition-colors">
            {/* Subtle Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>

            {/* TOP VALUE BANNER */}
            <div className="border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-900/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/60 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                            <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 text-lg">
                                <i className="fa-solid fa-map-location-dot"></i>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">25 Provinces & Islands</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Curated destinations across Cambodia</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/60 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                            <div className="w-11 h-11 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-lg">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Verified Local Guides</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Authentic cultural & adventure tours</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/60 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                            <div className="w-11 h-11 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 text-lg">
                                <i className="fa-solid fa-headset"></i>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">24/7 Travel Support</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Dedicated local trip assistance</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/60 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                            <div className="w-11 h-11 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 text-lg">
                                <i className="fa-solid fa-wallet"></i>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Transparent Pricing</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Best local value with no hidden fees</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN FOOTER COLUMNS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    
                    {/* Brand Column (4 Cols) */}
                    <div className="lg:col-span-4 space-y-5">
                        <Link to="/" onClick={scrollToTop} className="inline-flex items-center gap-3 group">
                            <img 
                                src={logoImg} 
                                alt="Find Your Trip Logo" 
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `${import.meta.env.BASE_URL}logo.jpg`;
                                }}
                                className="w-12 h-12 rounded-2xl object-cover p-1 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 shadow-xs group-hover:scale-105 transition-transform"
                            />
                            <div>
                                <span className="block text-xl font-extrabold tracking-wider text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    FIND YOUR TRIP
                                </span>
                                <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                                    CAMBODIA TRAVEL & TOURS
                                </span>
                            </div>
                        </Link>

                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
                            Your trusted gateway to exploring the Kingdom of Wonder. Uncover ancient Angkorian temples, tropical southern beaches, and authentic Cambodian culture with custom trip planning.
                        </p>

                        {/* Social Buttons */}
                        <div className="flex items-center gap-2.5 pt-1">
                            <a 
                                href="https://www.facebook.com/share/14hLmmP1Gvx/?mibextid=wwXIfr" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="Facebook"
                                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all hover:-translate-y-0.5 shadow-xs"
                            >
                                <i className="fa-brands fa-facebook-f text-sm"></i>
                            </a>
                            <a 
                                href="https://www.instagram.com/iur.aaaa" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="Instagram"
                                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all hover:-translate-y-0.5 shadow-xs"
                            >
                                <i className="fa-brands fa-instagram text-sm"></i>
                            </a>
                            <a 
                                href="https://t.me" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="Telegram"
                                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all hover:-translate-y-0.5 shadow-xs"
                            >
                                <i className="fa-brands fa-telegram text-sm"></i>
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="YouTube"
                                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all hover:-translate-y-0.5 shadow-xs"
                            >
                                <i className="fa-brands fa-youtube text-sm"></i>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links (2 Cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-white border-l-2 border-blue-600 pl-2.5">
                            Explore
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/destinations" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Destinations
                                </Link>
                            </li>
                            <li>
                                <Link to="/packages" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Tour Packages
                                </Link>
                            </li>
                            <li>
                                <Link to="/trip-planner" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Trip Planner
                                </Link>
                            </li>
                            <li>
                                <Link to="/calculator" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Budget Calculator
                                </Link>
                            </li>
                            <li>
                                <Link to="/hidden-gems" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Hidden Gems
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Top Destinations (2 Cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-white border-l-2 border-emerald-600 pl-2.5">
                            Highlights
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link to="/destinations" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Siem Reap (Angkor)
                                </Link>
                            </li>
                            <li>
                                <Link to="/destinations" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Phnom Penh City
                                </Link>
                            </li>
                            <li>
                                <Link to="/destinations" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Kampot & Riverside
                                </Link>
                            </li>
                            <li>
                                <Link to="/destinations" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Battambang Countryside
                                </Link>
                            </li>
                            <li>
                                <Link to="/destinations" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Koh Rong Islands
                                </Link>
                            </li>
                            <li>
                                <Link to="/destinations" onClick={scrollToTop} className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-white hover:translate-x-1 inline-block transition-transform font-medium">
                                    Mondulkiri Highlands
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter Column (4 Cols) */}
                    <div className="lg:col-span-4 space-y-5">
                        <h4 className="text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-white border-l-2 border-amber-600 pl-2.5">
                            Stay Connected
                        </h4>

                        {/* Contact details */}
                        <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-phone text-blue-600 dark:text-blue-400 text-xs w-4"></i>
                                <span>Hotline: <strong className="text-slate-900 dark:text-white font-semibold">+855 017 573 688</strong></span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-envelope text-blue-600 dark:text-blue-400 text-xs w-4"></i>
                                <span>Email: <strong className="text-slate-900 dark:text-white font-semibold">support@findyourtrip.kh</strong></span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-location-dot text-blue-600 dark:text-blue-400 text-xs w-4"></i>
                                <span>HQ: Phnom Penh & Siem Reap, Cambodia</span>
                            </div>
                        </div>

                        {/* Newsletter card */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/80 shadow-xs space-y-3">
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                                Subscribe for seasonal Cambodia travel tips, deals, and newly discovered trails.
                            </p>

                            {subscribed ? (
                                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium">
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Thank you for subscribing! Welcome aboard.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="relative flex items-center">
                                    <input 
                                        type="email" 
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        placeholder="Enter your email" 
                                        required
                                        className="w-full bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder-slate-400 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:outline-none pr-24 shadow-xs"
                                    />
                                    <button 
                                        type="submit"
                                        className="absolute right-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                                    >
                                        Join
                                    </button>
                                </form>
                            )}
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">No spam guaranteed. Unsubscribe anytime.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/90 py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                        &copy; 2026 <span className="text-slate-900 dark:text-white font-semibold">Find Your Trip</span> (Cambodia). All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                        <Link to="/about" onClick={scrollToTop} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                            About Us
                        </Link>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <Link to="/contact" onClick={scrollToTop} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                            Help & Support
                        </Link>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <button 
                            type="button" 
                            onClick={scrollToTop} 
                            className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                        >
                            <span>Back to Top</span>
                            <i className="fa-solid fa-arrow-up text-[10px]"></i>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
