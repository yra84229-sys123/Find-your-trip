import React, { useState } from 'react';
import HeroInfoBar from '../components/HeroInfoBar';
import { playBeep } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import yuraImg from '../assets/Yura.jpg';
import horngImg from '../assets/Horng.jpg';
import bunleapImg from '../assets/Bunleap.JPG';
import sompoImg from '../assets/sompo.png';
import lorngImg from '../assets/Lorng.JPG';

export default function About() {
    const { t } = useLanguage();
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        playBeep(true);
        setIsSubmitted(true);
    };

    return (
        <div>
            {/* 1. Hero Section */}
            <header id="home" className="hero-section hero-page">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title" style={{ color: 'white', textTransform: 'uppercase', fontSize: '4.5rem', lineHeight: '1.2' }}>
                        ABOUT US
                    </h1>
                    <p className="hero-subtitle">
                        Discover the story behind Find Your Trip, our mission to transform Cambodian travel, and the dedicated team making it happen.
                    </p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            className="btn-primary" 
                            style={{ borderRadius: '30px', background: '#0d6efd', padding: '15px 35px', fontWeight: 'bold' }} 
                            onClick={() => { playBeep(true); document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            OUR STORY
                        </button>
                        <button 
                            className="btn-outline" 
                            style={{ borderRadius: '30px', color: 'white', borderColor: 'white', padding: '15px 35px', fontWeight: 'bold' }} 
                            onClick={() => { playBeep(true); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            CONTACT US
                        </button>
                    </div>
                </div>

                {/* Features Info Bar */}
                <HeroInfoBar />
            </header>

            {/* 2. About the Website & Our Story Section */}
            <section id="our-story" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 relative overflow-hidden transition-colors">
                <div className="max-w-6xl mx-auto space-y-20">
                    {/* Top Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider">
                            <span>The Platform & Vision</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            Empowering Travelers to Experience Cambodia's Wonders
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                            Find Your Trip was built with a clear purpose: to bridge cutting-edge digital travel technology with authentic Khmer culture, heritage, and community eco-tourism.
                        </p>
                    </div>

                    {/* Story Narrative & Mission/Vision Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        {/* Left Column: Narrative Story */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                                    How Find Your Trip Began
                                </h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    Cambodia is a country filled with breathtaking wonders — from the ancient architectural grandeur of Angkor Wat to the emerald wilderness of the Cardamom Mountains, serene pepper plantations in Kampot, and the untouched coral reefs of Koh Rong.
                                </p>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    However, both international backpackers and local explorers frequently faced the same hurdles: fragmented schedule planning, unpredictable highway distances, unclear fuel budgets, and difficulty discovering authentic, off-the-beaten-path locations.
                                </p>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    Developed as an innovative computer science capstone project at the <strong className="text-slate-900 font-semibold">Royal University of Phnom Penh (RUPP)</strong>, our platform unifies real-time GPS routing, customized itinerary generation, and local community guides into one easy-to-use digital travel hub.
                                </p>
                            </div>

                            {/* Core Pillars List */}
                            <div className="pt-2 space-y-3">
                                {[
                                    { title: "Smart Automated Itineraries", desc: "Generates tailored multi-day journeys based on budget, travel pace, and interests." },
                                    { title: "Calibrated Fuel & Distance Math", desc: "Uses genuine GPS routing adjusted for Cambodian highway tortuosity factors." },
                                    { title: "Community Eco-Tourism", desc: "Directly showcases local villages, sustainable eco-lodges, and verified local guides." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                                        <span className="text-emerald-600 font-bold mt-0.5 text-sm">✓</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Mission & Vision Cards */}
                        <div className="lg:col-span-5 space-y-5">
                            {/* Mission */}
                            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md relative overflow-hidden group hover:border-blue-400 transition-colors">
                                <div className="mb-3">
                                    <span className="text-xs uppercase tracking-wider font-bold text-blue-600">Our Purpose</span>
                                    <h4 className="text-lg font-bold text-slate-900">Our Mission</h4>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    To eliminate travel planning friction across Cambodia by delivering accurate, accessible, and inspiring digital tools that make authentic travel effortless for everyone.
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md relative overflow-hidden group hover:border-teal-400 transition-colors">
                                <div className="mb-3">
                                    <span className="text-xs uppercase tracking-wider font-bold text-teal-600">Our Future</span>
                                    <h4 className="text-lg font-bold text-slate-900">Our Vision</h4>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    To become Southeast Asia’s most beloved platform for sustainable tourism, connecting mindful travelers with hidden treasures while promoting cultural preservation.
                                </p>
                            </div>

                            {/* Core Philosophy */}
                            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md relative overflow-hidden group hover:border-indigo-400 transition-colors">
                                <div className="mb-3">
                                    <span className="text-xs uppercase tracking-wider font-bold text-indigo-600">Local Commitment</span>
                                    <h4 className="text-lg font-bold text-slate-900">Built in Cambodia</h4>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                    Designed, coded, and curated by local Cambodian students who live and travel here, ensuring genuine recommendations you can truly rely on.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Stats / Milestones Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                        {[
                            { value: "25", label: "Provinces Covered", sub: "100% of Cambodia" },
                            { value: "150+", label: "Verified Locations", sub: "Curated attractions & gems" },
                            { value: "10k+", label: "Trips Planned", sub: "By happy explorers" },
                            { value: "4.9 ★", label: "Traveler Satisfaction", sub: "Community feedback" }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 text-center shadow-xs hover:shadow-md transition-shadow">
                                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-bold text-slate-800 mt-1">
                                    {stat.label}
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                    {stat.sub}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Meet the brains (Team Members Section) */}
            <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden transition-colors">
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 sm:mb-20">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
                            <span>Our Creative Minds</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
                            Meet the brains
                        </h2>
                        <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
                            These people work on making our product best.
                        </p>
                    </div>

                    {/* Team Members Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-12">
                        {[
                            {
                                name: "Thon Youra",
                                role: "Founder & Lead Developer",
                                image: yuraImg,
                                bio: "I've established Find Your Trip in 2024 and it was one of the best ideas I've had to help people explore Cambodia.",
                                ringColor: "p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-400 shadow-lg shadow-indigo-500/25",
                                firstIconActive: true,
                                socials: {
                                    x: "https://twitter.com",
                                    instagram: "https://instagram.com/iur.aaaa",
                                    linkedin: "https://linkedin.com"
                                }
                            },
                            {
                                name: "Heng Menghorng",
                                role: "Co-Founder & System Architect",
                                image: horngImg,
                                bio: "I lead system architecture and database design, crafting robust services to power seamless travel experiences.",
                                ringColor: "p-[3px] bg-slate-200 hover:bg-gradient-to-tr hover:from-indigo-400 hover:to-purple-400 transition-all duration-300",
                                firstIconActive: false,
                                socials: {
                                    x: "https://twitter.com",
                                    instagram: "https://instagram.com",
                                    linkedin: "https://linkedin.com"
                                }
                            },
                            {
                                name: "Phan Sokbunleap",
                                role: "Full Stack Engineer",
                                image: bunleapImg,
                                bio: "Passionate about building fast, intuitive web features and integrating smart itineraries for travelers.",
                                ringColor: "p-[3px] bg-slate-200 hover:bg-gradient-to-tr hover:from-indigo-400 hover:to-purple-400 transition-all duration-300",
                                firstIconActive: false,
                                socials: {
                                    x: "https://twitter.com",
                                    instagram: "https://instagram.com",
                                    linkedin: "https://linkedin.com"
                                }
                            },
                            {
                                name: "Seang Sompo",
                                role: "Lead UI/UX Designer",
                                image: sompoImg,
                                bio: "I design clean, modern, and engaging interfaces that inspire travelers to discover hidden gems.",
                                ringColor: "p-[3px] bg-slate-200 hover:bg-gradient-to-tr hover:from-indigo-400 hover:to-purple-400 transition-all duration-300",
                                firstIconActive: false,
                                socials: {
                                    x: "https://twitter.com",
                                    instagram: "https://instagram.com",
                                    linkedin: "https://linkedin.com"
                                }
                            },
                            {
                                name: "Koemlun Chenglorng",
                                role: "Frontend Specialist & QA",
                                image: lorngImg,
                                bio: "Ensuring every component is responsive, polished, and performs smoothly across all devices.",
                                ringColor: "p-[3px] bg-slate-200 hover:bg-gradient-to-tr hover:from-indigo-400 hover:to-purple-400 transition-all duration-300",
                                firstIconActive: false,
                                socials: {
                                    x: "https://twitter.com",
                                    instagram: "https://instagram.com",
                                    linkedin: "https://linkedin.com"
                                }
                            }
                        ].map((member, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                                {/* Profile Avatar */}
                                <div className={`rounded-full shrink-0 ${member.ringColor}`}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover block bg-slate-100"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                                        }}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center sm:text-left min-w-0">
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm font-semibold text-indigo-600 mt-1">
                                        {member.role}
                                    </p>

                                    {/* Thin divider */}
                                    <div className="border-b border-slate-200 my-3.5 max-w-sm sm:max-w-none"></div>

                                    {/* Bio */}
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                                        {member.bio}
                                    </p>

                                    {/* Social Badges */}
                                    <div className="flex items-center justify-center sm:justify-start gap-2.5">
                                        {/* X / Twitter */}
                                        <a
                                            href={member.socials.x}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                                                member.firstIconActive
                                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                                    : 'bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 border border-slate-200'
                                            }`}
                                            aria-label="X Profile"
                                        >
                                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                            </svg>
                                        </a>

                                        {/* Instagram */}
                                        <a
                                            href={member.socials.instagram}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 border border-slate-200 flex items-center justify-center text-xs transition-all"
                                            aria-label="Instagram Profile"
                                        >
                                            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                            </svg>
                                        </a>

                                        {/* LinkedIn */}
                                        <a
                                            href={member.socials.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 border border-slate-200 flex items-center justify-center text-xs transition-all"
                                            aria-label="LinkedIn Profile"
                                        >
                                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Contact Us Section */}
            <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200 relative overflow-hidden transition-colors">
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16 sm:mb-20">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                            <span>Get In Touch</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Let's Start Your Cambodian Journey
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
                            Have questions about our itineraries, customized private packages, or partnership opportunities? Reach out to our team anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Interactive Message Form */}
                        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
                                    <p className="text-xs text-slate-500 mt-1">We typically reply within 24 hours.</p>
                                </div>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-12 space-y-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                                        ✓
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900">Message Dispatched!</h4>
                                    <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                                        Thank you, <span className="text-indigo-600 font-semibold">{formState.name || 'Traveler'}</span>! Our travel team has received your inquiry and will reach out to your email shortly.
                                    </p>
                                    <button
                                        onClick={() => {
                                             setFormState({ name: '', email: '', subject: '', message: '' });
                                            setIsSubmitted(false);
                                        }}
                                        className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                                    >
                                        Send Another Inquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                placeholder="e.g. Sokha Chan"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                placeholder="traveler@example.com"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Topic / Subject
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.subject}
                                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                            placeholder="e.g. Customized itinerary for Siem Reap & Koh Rong"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Your Message
                                        </label>
                                        <textarea
                                            rows="4"
                                            required
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            placeholder="Tell us about your travel dates, group size, or questions..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <span>Send Travel Inquiry</span>
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Direct Channels & Map */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Contact Info Cards */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                                <h3 className="font-bold text-lg text-slate-900 pb-3 border-b border-slate-200">
                                    Direct Contact Channels
                                </h3>

                                <div className="space-y-4">
                                    {/* Location */}
                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                        <div>
                                            <span className="font-bold text-slate-900 text-sm block">Office Location</span>
                                            <span className="text-slate-600 text-xs leading-relaxed">
                                                RUPP Campus I, Russian Blvd, Phnom Penh, Cambodia
                                            </span>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                        <div>
                                            <span className="font-bold text-slate-900 text-sm block">Phone & WhatsApp</span>
                                            <a href="tel:+85517573682" className="text-slate-600 text-xs hover:text-indigo-600 transition-colors">
                                                +855 17 573 682
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                                        <div>
                                            <span className="font-bold text-slate-900 text-sm block">Email Inquiries</span>
                                            <a href="mailto:yra84229@gmail.com" className="text-slate-600 text-xs hover:text-indigo-600 transition-colors">
                                                yra84229@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Instant Messaging Action Buttons */}
                                <div className="pt-2 flex items-center gap-3">
                                    <a
                                        href="https://t.me"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 py-3 px-4 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all"
                                    >
                                        <span>Telegram</span>
                                    </a>
                                    <a
                                        href="https://wa.me/85517573682"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
                                    >
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                            </div>

                            {/* Google Maps Container */}
                            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-64 bg-slate-100 relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250151.15120619943!2d104.7337651032822!3d11.57966690462215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c668bf829fd8fb6!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Phnom Penh Office Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
