import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { provincesData, getDistance } from '../data/provincesData';
import { hiddenGemsData } from '../data/hiddenGemsData';
import { vehiclesConfig, fuelPrices } from '../data/packagesData';
import CustomSelect from '../components/CustomSelect';
import HeroInfoBar from '../components/HeroInfoBar';
import DrawerModal from '../components/DrawerModal';
import DestinationsExplorer from '../components/DestinationsExplorer';
import { playBeep } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();

    const [soundEnabled] = useState(true);

    // Drawer state
    const [activeProvince, setActiveProvince] = useState(null);
    const [activePlace, setActivePlace] = useState(null);

    // Calculator State
    const [calcOrigin, setCalcOrigin] = useState('takeo');
    const [calcDest, setCalcDest] = useState('siem-reap');
    const [calcVehicle, setCalcVehicle] = useState('sedan');
    const [calcResults, setCalcResults] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // Hidden Gems state
    const [gemProvinceId, setGemProvinceId] = useState('takeo');
    const [gemActiveTab, setGemActiveTab] = useState('about');

    // Popular Destinations preview data (matching screenshot)
    const homeDestinations = [
        {
            id: 'angkor-wat',
            title: 'Angkor Wat',
            location: 'Siem Reap, Cambodia',
            rating: 4.8,
            reviews: '1.2k',
            img: 'https://cms.siemreaper.click/uploads/angkor_wat_sunrise_discovery2712_997b977984.jpg',
            provinceId: 'siem-reap'
        },
        {
            id: 'koh-rong',
            title: 'Koh Rong Island',
            location: 'Sihanoukville, Cambodia',
            rating: 4.7,
            reviews: '932',
            img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            provinceId: 'preah-sihanouk'
        },
        {
            id: 'phnom-penh',
            title: 'Phnom Penh',
            location: 'Phnom Penh, Cambodia',
            rating: 4.6,
            reviews: '856',
            img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
            provinceId: 'phnom-penh'
        },
        {
            id: 'sihanoukville',
            title: 'Sihanoukville',
            location: 'Sihanoukville, Cambodia',
            rating: 4.5,
            reviews: '640',
            img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
            provinceId: 'preah-sihanouk'
        }
    ];

    // Featured Restaurants preview data (matching screenshot)
    const homeRestaurants = [
        {
            id: 1,
            title: 'Traditional Fish Amok',
            location: 'Phnom Penh, Cambodia',
            rating: 4.9,
            reviews: '1.1k',
            img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            title: 'Battambang Beef Lok Lak',
            location: 'Battambang, Cambodia',
            rating: 4.8,
            reviews: '840',
            img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            title: 'Kep Pepper Crab',
            location: 'Kep & Kampot, Cambodia',
            rating: 4.9,
            reviews: '980',
            img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 4,
            title: 'Kuy Teav Noodle Soup',
            location: 'Siem Reap, Cambodia',
            rating: 4.7,
            reviews: '720',
            img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 5,
            title: 'Nom Banh Chok Khmer',
            location: 'Kampot, Cambodia',
            rating: 4.8,
            reviews: '610',
            img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
        }
    ];

    // Packages state - Featured preview on home page
    const [activeFilter, setActiveFilter] = useState('All');
    const homePackagesList = [
        { id: 1, category: 'adventure', categoryLabel: 'Adventure', icon: 'fa-mountain', img: 'https://asiatravellinks.com/images/attractions/ta-prohm.webp', title: 'Jungle & Temples Adventure', location: 'Siem Reap, Cambodia', desc: 'Trek through dense jungles, discover hidden temples and experience the true wild side of Cambodia.', duration: '4 Days 3 Nights', people: '2-12 People', price: 299, rating: 4.9, reviews: '340' },
        { id: 2, category: 'relaxing', categoryLabel: 'Relaxing', icon: 'fa-umbrella-beach', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', title: 'Beach Escape in Koh Rong', location: 'Koh Rong, Cambodia', desc: "Relax on white sandy beaches and enjoy crystal-clear waters on Cambodia's beautiful island.", duration: '3 Days 2 Nights', people: '2-10 People', price: 249, rating: 4.8, reviews: '280' },
        { id: 3, category: 'culture', categoryLabel: 'Culture', icon: 'fa-landmark', img: 'https://cms.siemreaper.click/uploads/angkor_wat_sunrise_discovery2712_997b977984.jpg', title: 'Angkor Heritage Experience', location: 'Siem Reap, Cambodia', desc: "Explore the magnificent Angkor temples and immerse yourself in Cambodia's rich history and culture.", duration: '4 Days 3 Nights', people: '2-10 People', price: 319, rating: 4.9, reviews: '415' },
        { id: 4, category: 'food', categoryLabel: 'Food', icon: 'fa-utensils', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', title: 'Taste of Cambodia', location: 'Phnom Penh, Cambodia', desc: 'Savor authentic Cambodian cuisine and explore local markets with our food expert guides.', duration: '3 Days 2 Nights', people: '2-10 People', price: 199, rating: 4.7, reviews: '190' }
    ];

    const filteredPackages = activeFilter === 'All'
        ? homePackagesList
        : homePackagesList.filter(pkg => pkg.category === activeFilter);

    // Calculate Distance, Travel Time, Fuel
    const handleCalculation = (e) => {
        e.preventDefault();
        setIsCalculating(true);
        playBeep(soundEnabled);

        setTimeout(() => {
            const origin = calcOrigin;
            const dest = calcDest;
            let distance = typeof getDistance === 'function' ? getDistance(origin, dest) : 180;

            const v = vehiclesConfig[calcVehicle] || { speed: 80, consumption: 7.2, fuelType: 'gasoline' };
            const speed = v.speed;
            const economy = v.consumption;
            const fuelType = v.fuelType;
            const unitPrice = fuelPrices[fuelType] || 1.15;

            // Time Calculation
            const timeInHours = distance / speed;
            const hours = Math.floor(timeInHours);
            const minutes = Math.round((timeInHours - hours) * 60);

            // Fuel Calculation
            const totalFuel = (distance * economy) / 100;
            const totalCost = totalFuel * unitPrice;

            setCalcResults({
                distance: distance.toFixed(0),
                time: { hours, minutes },
                fuel: totalFuel.toFixed(1),
                cost: totalCost.toFixed(2),
                economy: economy.toFixed(1),
                fuelUnit: fuelType === 'electricity' ? 'kWh' : 'L'
            });
            setIsCalculating(false);
        }, 600);
    };

    const currentGemProvince = provincesData.find(p => p.id === gemProvinceId) || provincesData[0];
    const currentHiddenGem = (typeof hiddenGemsData !== 'undefined' && hiddenGemsData[gemProvinceId]) || {
        name: "Phnom Chisor Temple",
        khmerName: "ប្រាសាទភ្នំជីសូរ",
        desc: "An ancient 11th-century Angkorian sanctuary perched atop a panoramic hill in Takeo Province, offering breathtaking views over rice paddies and sacred lotus ponds.",
        history: "Constructed during the reign of King Suryavarman I, Phnom Chisor was dedicated to Hindu deities before gradually welcoming Buddhist worshipers through centuries of Cambodian history.",
        img: "https://images.unsplash.com/photo-1542319630-55fb7f7c944a?auto=format&fit=crop&w=1200&q=80",
        roadCondition: "Paved national road; stone steps leading up the hillside sanctuary.",
        contactLocalGuide: "+855 (0) 97 555 1234 (Local Heritage Association)"
    };

    return (
        <div>
            {/* Hero Section */}
            <header id="home" className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title">
                        {t('heroTitle1')} {t('heroTitle2')}
                    </h1>
                    <p className="hero-subtitle">{t('heroSubtitle')}</p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button
                            className="btn-primary"
                            style={{ borderRadius: '30px', background: '#0d6efd', padding: '15px 35px', fontWeight: 'bold' }}
                            onClick={() => { playBeep(soundEnabled); document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            {t('btnExplore').toUpperCase()}
                        </button>
                    </div>
                </div>

                {/* Features Info Bar */}
                <HeroInfoBar />
            </header>

            {/* Popular Destinations Section (Matching User's Screenshot) */}
            <section id="destinations" className="py-14 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800">
                <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Popular Destinations</h2>
                            <p className="text-slate-500 text-sm mt-1">Discover the most loved places by travelers.</p>
                        </div>
                        <button
                            onClick={() => { playBeep(soundEnabled); navigate('/destinations'); }}
                            className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {homeDestinations.map(item => (
                            <div
                                key={item.id}
                                onClick={() => { playBeep(soundEnabled); navigate('/destinations'); }}
                                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
                            >
                                <div className="h-[145px] w-full overflow-hidden relative">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 text-xs mt-1.5">
                                            {item.location}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-2">
                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                            {item.rating} <span className="text-slate-400 font-normal">({item.reviews} reviews)</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Special Offer Card (from screenshot) */}
                        <div
                            onClick={() => { playBeep(soundEnabled); navigate('/packages'); }}
                            className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 group min-h-[250px]"
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.2) 100%), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="relative z-10 max-w-[80%]">
                                <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">Special Offer</span>
                                <h3 className="text-xl font-extrabold text-slate-900 mt-2 leading-tight">Save Up to 50% on Hotels</h3>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">Book now and enjoy exclusive deals on your next stay.</p>
                            </div>
                            <div className="relative z-10 mt-4">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full inline-flex items-center shadow-md transition-colors"
                                >
                                    Explore Hotels
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Restaurants Section (Matching User's Screenshot) */}
            <section className="py-14 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Featured Restaurants</h2>
                            <p className="text-slate-500 text-sm mt-1">Taste the best local and international cuisine.</p>
                        </div>
                        <button
                            onClick={() => { playBeep(soundEnabled); navigate('/packages'); }}
                            className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {homeRestaurants.map(item => (
                            <div
                                key={item.id}
                                onClick={() => { playBeep(soundEnabled); navigate('/packages'); }}
                                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
                            >
                                <div className="h-[145px] w-full overflow-hidden relative">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3 className="font-bold text-slate-800 dark:text-white text-base leading-snug group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 text-xs mt-1.5">
                                            {item.location}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-2">
                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                            {item.rating} <span className="text-slate-400 font-normal">({item.reviews} reviews)</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages Content */}
            <section id="packages" className="py-14 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800">
                <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Exclusive Tour Packages</h2>
                            <p className="text-slate-500 text-sm mt-1">Handcrafted tour packages tailored for unforgettable memories across Cambodia.</p>
                        </div>
                        <button
                            onClick={() => { playBeep(soundEnabled); navigate('/packages'); }}
                            className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {filteredPackages.map(pkg => (
                            <div
                                key={pkg.id}
                                className="package-card pkg-card-new bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                                onClick={() => { playBeep(soundEnabled); navigate('/packages'); }}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="pkg-img" style={{ backgroundImage: `url('${pkg.img}')` }}>
                                    <span className={`pkg-tag ${pkg.category}`}>{pkg.categoryLabel}</span>
                                </div>
                                <div className="pkg-content p-5">
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1.5">{pkg.title}</h3>
                                    <p className="pkg-location text-xs text-slate-400 mb-2">{pkg.location}</p>
                                    <p className="pkg-desc text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{pkg.desc}</p>
                                    <div className="pkg-meta text-xs text-slate-400 flex items-center justify-between mb-4">
                                        <span>{pkg.duration}</span>
                                        <span>{pkg.people}</span>
                                    </div>
                                    <div className="pkg-footer flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                                        <div className="pkg-price"><span className="from-text text-xs text-slate-400">From</span> <strong className="text-xl font-bold text-blue-600">${pkg.price}</strong></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Distance & Fuel Calculator */}
            <section id="calculator" className="py-14 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
                <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{t('calcTitle')}</h2>
                            <p className="text-slate-500 text-sm mt-1">{t('calcSubtitle')}</p>
                        </div>
                        <button
                            onClick={() => { playBeep(soundEnabled); navigate('/calculator'); }}
                            className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                            {lang === 'en' ? 'Open Calculator' : 'បើកម៉ាស៊ីនគិតលេខ'}
                        </button>
                    </div>

                    <div className="calc-grid">
                        <div className="calc-inputs-panel glass-panel" style={{ padding: '40px' }}>
                            <form onSubmit={handleCalculation}>
                                <div className="form-group">
                                    <label>{t('calcOrigin')}</label>
                                    <CustomSelect
                                        options={provincesData.map(p => ({ value: p.id, label: p.name }))}
                                        selectedValue={calcOrigin}
                                        onChange={setCalcOrigin}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t('calcDest')}</label>
                                    <CustomSelect
                                        options={provincesData.map(p => ({ value: p.id, label: p.name }))}
                                        selectedValue={calcDest}
                                        onChange={setCalcDest}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t('calcVehicle')}</label>
                                    <CustomSelect
                                        options={Object.keys(vehiclesConfig).map(key => ({
                                            value: key,
                                            label: lang === 'en' ? vehiclesConfig[key].nameEn : vehiclesConfig[key].nameKh
                                        }))}
                                        selectedValue={calcVehicle}
                                        onChange={setCalcVehicle}
                                    />
                                </div>

                                <button type="submit" className="btn-primary w-100" disabled={isCalculating}>
                                    {isCalculating ? (
                                        <span>Calculating...</span>
                                    ) : (
                                        <span>{t('calcBtnSubmit')}</span>
                                    )}
                                </button>
                            </form>
                        </div>

                        <div className="calc-results-panel glass-panel">
                            {calcResults ? (
                                <div style={{ animation: 'fadeIn 0.5s ease' }}>
                                    <h3 className="text-center" style={{ fontSize: '1.45rem', marginBottom: '20px' }}>
                                        Trip Log Details
                                    </h3>

                                    <div className="calc-stat-group">
                                        <div className="calc-stat-card">
                                            <div className="calc-stat-label">{t('calcStatDist')}</div>
                                            <div className="calc-stat-value">{calcResults.distance} <span style={{ fontSize: '1rem' }}>km</span></div>
                                        </div>
                                        <div className="calc-stat-card">
                                            <div className="calc-stat-label">{t('calcStatTime')}</div>
                                            <div className="calc-stat-value">
                                                {calcResults.time.hours > 0 ? `${calcResults.time.hours}h ` : ''}
                                                {calcResults.time.minutes}m
                                            </div>
                                        </div>
                                        <div className="calc-stat-card">
                                            <div className="calc-stat-label">{t('calcStatFuel')}</div>
                                            <div className="calc-stat-value">{calcResults.fuel} <span style={{ fontSize: '1rem' }}>{calcResults.fuelUnit}</span></div>
                                        </div>
                                        <div className="calc-stat-card">
                                            <div className="calc-stat-label">{t('calcStatCost')}</div>
                                            <div className="calc-stat-value">${calcResults.cost}</div>
                                        </div>
                                    </div>

                                    {/* Visual Progress Bar */}
                                    <div className="calc-meter-container">
                                        <div className="calc-meter-label">
                                            <span>Route Progress</span>
                                            <span>{calcResults.distance} km</span>
                                        </div>
                                        <div className="calc-meter-bg">
                                            <div className="calc-meter-fill" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-light)', borderRadius: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        Calculated at vehicle rate of {calcResults.economy} {calcResults.fuelUnit}/100km. Average speed capped by {t('calcSpeedLimit')} rules.
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center" style={{ padding: '40px', color: 'var(--text-muted)' }}>
                                    <p>Select your starting province, destination, and vehicle type to generate a detailed fuel log, trip time, and cost estimation.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Hidden Gems Section */}
            <section id="gems" className="py-14 bg-slate-50 dark:bg-slate-900/40">
                <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-2">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{t('gemTitle')}</h2>
                            <p className="text-slate-500 text-sm mt-1">{t('gemSubtitle')}</p>
                        </div>
                        <button
                            onClick={() => { playBeep(soundEnabled); navigate('/hidden-gems'); }}
                            className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                            {lang === 'en' ? 'Explore Hidden Gems' : 'ស្វែងរកតំបន់អាថ៌កំបាំង'}
                        </button>
                    </div>

                    <div className="gems-filter-bar form-group">
                        <label style={{ justifyContent: 'center' }}>{t('gemPrompt')}</label>
                        <CustomSelect
                            options={provincesData.map(p => ({ value: p.id, label: p.name + " Province" }))}
                            selectedValue={gemProvinceId}
                            onChange={(val) => {
                                playBeep(soundEnabled);
                                setGemProvinceId(val);
                                setGemActiveTab('about');
                            }}
                        />
                    </div>

                    <div className="gem-layout glass-panel" style={{ padding: '30px', background: 'var(--bg-panel)' }}>
                        <div className="gem-image-card">
                            <img src={currentHiddenGem.img} alt={currentHiddenGem.name} className="gem-img" />
                            <div className="gem-image-overlay">
                                <div className="badge badge-light" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>Hidden Gem</div>
                                <h3>{currentHiddenGem.name}</h3>
                                <p>{currentGemProvince.name} Province</p>
                            </div>
                        </div>

                        <div className="gem-info-card">
                            <h3 className="gem-info-title">{currentHiddenGem.name}</h3>

                            {/* Tabs */}
                            <div className="gem-info-tabs">
                                <button
                                    className={`gem-tab ${gemActiveTab === 'about' ? 'active' : ''}`}
                                    onClick={() => { playBeep(soundEnabled); setGemActiveTab('about'); }}
                                >
                                    {t('gemTabAbout')}
                                </button>
                                <button
                                    className={`gem-tab ${gemActiveTab === 'history' ? 'active' : ''}`}
                                    onClick={() => { playBeep(soundEnabled); setGemActiveTab('history'); }}
                                >
                                    {t('gemTabHistory')}
                                </button>
                                <button
                                    className={`gem-tab ${gemActiveTab === 'how-to' ? 'active' : ''}`}
                                    onClick={() => { playBeep(soundEnabled); setGemActiveTab('how-to'); }}
                                >
                                    {t('gemTabHowTo')}
                                </button>
                            </div>

                            {/* Tab Contents */}
                            <div className="gem-tab-content">
                                {gemActiveTab === 'about' && (
                                    <div>
                                        <p style={{ marginBottom: '15px' }}>{currentHiddenGem.desc}</p>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                                            <span className="tech-tag">Authentic Khmer Heritage</span>
                                            <span className="tech-tag">Eco-friendly Spot</span>
                                        </div>
                                    </div>
                                )}

                                {gemActiveTab === 'history' && (
                                    <div>
                                        <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.92rem', lineHeight: '1.5' }}>{currentHiddenGem.history}</p>
                                    </div>
                                )}

                                {gemActiveTab === 'how-to' && (
                                    <div>
                                        <p style={{ marginBottom: '10px' }}><b>Road condition:</b> {currentHiddenGem.roadCondition}</p>
                                        <p style={{ marginBottom: '10px' }}><b>Contact Local Guide:</b> {currentHiddenGem.contactLocalGuide}</p>
                                        <button
                                            className="btn-secondary mt-2"
                                            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                                            onClick={() => {
                                                setCalcOrigin('takeo');
                                                setCalcDest(currentGemProvince.id);
                                                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            Calculate Travel Route
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Province / Place Drawer */}
            <DrawerModal
                province={activeProvince}
                activePlace={activePlace}
                setActivePlace={setActivePlace}
                onClose={() => { setActiveProvince(null); setActivePlace(null); }}
                soundEnabled={soundEnabled}
            />
        </div>
    );
}
