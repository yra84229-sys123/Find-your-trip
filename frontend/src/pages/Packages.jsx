import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroInfoBar from '../components/HeroInfoBar';
import { playBeep } from '../utils/sound';

const initialPackages = [
    {
        id: 1,
        title: "Angkor Wat Temple Tour",
        category: "culture",
        categoryLabel: "Cultural",
        icon: "fa-landmark",
        location: "Siem Reap, Cambodia",
        duration: "3 Days / 2 Nights",
        people: "2-10 People",
        price: 45,
        rating: 4.9,
        reviews: 248,
        img: "https://cms.siemreaper.click/uploads/angkor_wat_sunrise_discovery2712_997b977984.jpg",
        description: "Witness the magnificent sunrise over the ancient 12th-century Angkor Wat and discover the smiling stone faces of Bayon and tree-entangled Ta Prohm.",
        highlights: [
            "Iconic Angkor Wat Sunrise Experience",
            "Bayon Temple 216 smiling stone faces",
            "Ta Prohm (Tomb Raider Jungle Temple)",
            "Certified licensed English-speaking historian guide",
            "Air-conditioned private vehicle and cold refreshments"
        ],
        included: ["All temple transfers", "Licensed guide", "Cold drinking water & towels", "Hotel pickup & drop-off"],
        excluded: ["Angkor Archaeological Park pass", "Personal expenses & tips"]
    },
    {
        id: 2,
        title: "Phi Phi Islands Getaway",
        category: "beach",
        categoryLabel: "Beach",
        icon: "fa-umbrella-beach",
        location: "Krabi, Thailand",
        duration: "3 Days / 2 Nights",
        people: "2-8 People",
        price: 320,
        rating: 4.8,
        reviews: 182,
        img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
        description: "Cruise across crystal-clear turquoise waters, snorkel through vibrant coral reefs at Bamboo Island, and unwind on powdery white sand beaches.",
        highlights: [
            "Speedboat cruise to Maya Bay & Pileh Lagoon",
            "Snorkeling safari with tropical sea turtles",
            "Beachfront barbecue dinner under the stars",
            "Luxury island resort accommodation",
            "Viking Cave and Monkey Beach exploration"
        ],
        included: ["Resort stay (2 nights)", "Speedboat island excursions", "Snorkeling gear", "All meals on itinerary"],
        excluded: ["National Marine Park entrance fee", "Alcoholic beverages"]
    },
    {
        id: 3,
        title: "Banteay Srei Temple",
        category: "adventure",
        categoryLabel: "Adventure",
        icon: "fa-mountain",
        location: "Siem Reap, Cambodia",
        duration: "1 Day",
        people: "1-6 People",
        price: 30,
        rating: 4.9,
        reviews: 115,
        img: "https://asiatravellinks.com/images/attractions/ta-prohm.webp",
        description: "Admire the crown jewel of Khmer art, sculpted from rare pink sandstone with breathtaking 10th-century relief carvings in the rural countryside.",
        highlights: [
            "Intricately carved pink sandstone sanctuary",
            "Traditional Palm Sugar village cultural immersion",
            "Cambodia Landmine Museum educational visit",
            "Authentic local Khmer organic lunch",
            "Scenic countryside backroads ride"
        ],
        included: ["Round-trip transport", "Expert cultural guide", "Bottled mineral water", "Village craft demonstration"],
        excluded: ["Angkor pass", "Personal purchases"]
    },
    {
        id: 4,
        title: "Koh Rong Island",
        category: "nature",
        categoryLabel: "Nature",
        icon: "fa-leaf",
        location: "Sihanoukville, Cambodia",
        duration: "3 Days / 2 Nights",
        people: "2-8 People",
        price: 150,
        rating: 4.8,
        reviews: 140,
        img: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/669831377.jpg?k=05c5854a62fe60082176bfe779f50ab67fe1cfa854e61268380014d294503ec1&o=",
        description: "Unplug on pristine white sand bays, paddle through mangrove estuaries, and experience magical bioluminescent plankton glowing in the night sea.",
        highlights: [
            "High-speed modern ferry transfer from Sihanoukville",
            "Night boat tour to swim in glowing bioluminescent plankton",
            "Snorkeling around vibrant coral reefs & sea life",
            "Boutique beachfront bungalow stay",
            "Sunset kayaking along secluded bays"
        ],
        included: ["Return ferry tickets", "Bungalow accommodation", "Plankton night boat tour", "Breakfast included"],
        excluded: ["Lunch & Dinner", "Personal equipment rental"]
    },
    {
        id: 5,
        title: "Phnom Penh City Tour",
        category: "city",
        categoryLabel: "City Tour",
        icon: "fa-city",
        location: "Phnom Penh, Cambodia",
        duration: "1 Day",
        people: "1-8 People",
        price: 25,
        rating: 4.7,
        reviews: 205,
        img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        description: "Explore the bustling heart of Cambodia: the opulent Royal Palace, Silver Pagoda, historic Wat Phnom, vibrant markets, and a twilight Mekong sunset cruise.",
        highlights: [
            "Royal Palace complex and sacred Silver Pagoda",
            "Historic hilltop Wat Phnom monastery",
            "Art Deco Central Market (Phsar Thmey) shopping",
            "Sunset boat cruise along the Tonle Sap & Mekong",
            "Traditional remork (tuk-tuk) transport"
        ],
        included: ["All sightseeing transportation", "Sunset cruise ticket", "Experienced city guide", "Fresh coconut drink"],
        excluded: ["Royal Palace entrance ticket ($10)", "Lunch"]
    },
    {
        id: 6,
        title: "Kulen Mountain",
        category: "nature",
        categoryLabel: "Nature",
        icon: "fa-leaf",
        location: "Siem Reap, Cambodia",
        duration: "1 Day",
        people: "1-6 People",
        price: 40,
        rating: 4.8,
        reviews: 98,
        img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        description: "Ascend Cambodia's most sacred mountain, swim beneath cascading tropical waterfalls, and marvel at the 1,000 carved Shiva lingas in the riverbed.",
        highlights: [
            "Refreshing swim in multi-tiered Kulen Waterfall",
            "River of a Thousand Lingas sacred carvings",
            "Preah Ang Thom giant reclining Buddha shrine",
            "Scenic 4WD mountain drive through jungle trails",
            "Picnic beside crystal clear mountain stream"
        ],
        included: ["Phnom Kulen National Park entry ticket ($20 value)", "Private 4WD vehicle", "Guide", "Picnic snack"],
        excluded: ["Swimwear towel", "Gratuities"]
    },
    {
        id: 7,
        title: "Bokor Mountain Trek",
        category: "adventure",
        categoryLabel: "Adventure",
        icon: "fa-mountain",
        location: "Kampot, Cambodia",
        duration: "2 Days / 1 Night",
        people: "2-8 People",
        price: 85,
        rating: 4.7,
        reviews: 64,
        img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/12/4c/ca/2c.jpg",
        description: "Hike through misty pine plateaus, explore abandoned 1920s French colonial architecture, and witness panoramic views over the Gulf of Thailand.",
        highlights: [
            "Hauntingly beautiful Old Catholic Church & Palace",
            "Popokvil twin waterfalls and cliff overlooks",
            "Lok Yeay Mao sacred giant statue blessing",
            "Kampot organic pepper farm tasting tour",
            "Mountain sunset over the cliffs"
        ],
        included: ["Highland resort stay", "Guided trekking itinerary", "Farm tour tasting", "Private AC transport"],
        excluded: ["Personal gear", "Travel insurance"]
    },
    {
        id: 8,
        title: "Mekong River Dolphin Cruise",
        category: "nature",
        categoryLabel: "Nature",
        icon: "fa-leaf",
        location: "Kratie, Cambodia",
        duration: "2 Days / 1 Night",
        people: "2-10 People",
        price: 120,
        rating: 4.9,
        reviews: 72,
        img: "https://img.liveaboard.com/River%20Cruise/Countries/Cambodia%20River%20Cruise%20001.jpeg?tr=w-1920,h-800,pr-true,c-maintain_ratio,q-50",
        description: "Sail down the peaceful Mekong River in Kampi to spot rare freshwater Irrawaddy dolphins and cycle through the tranquil orchards of Koh Trong.",
        highlights: [
            "Traditional wooden boat tour to observe wild dolphins",
            "Bicycle circuit through fruit orchards on Koh Trong island",
            "Authentic riverside homestay or boutique eco-resort",
            "Sunset over the wide Mekong waters",
            "Fresh pomelo and local Mekong cuisine tasting"
        ],
        included: ["Eco-boat safari", "Koh Trong ferry & bike rental", "Accommodation", "Breakfast & Dinner"],
        excluded: ["Transport to Kratie", "Souvenirs"]
    },
    {
        id: 9,
        title: "Battambang Heritage & Bamboo Train",
        category: "culture",
        categoryLabel: "Cultural",
        icon: "fa-landmark",
        location: "Battambang, Cambodia",
        duration: "2 Days / 1 Night",
        people: "2-8 People",
        price: 95,
        rating: 4.8,
        reviews: 86,
        img: "https://xa6zemg4r8.cloudimg.io/_images_/Battambang%20Temples-yhUQyMTti0E05d2Jy2zO.jpg",
        description: "Ride the legendary original bamboo train through scenic rice fields, tour colonial French quarters, and watch millions of bats fly from Phnom Sampeau at dusk.",
        highlights: [
            "Thrilling Bamboo Train (Norry) ride along vintage tracks",
            "Phnom Sampeau Bat Cave exodus spectacle at sundown",
            "Killing Caves and hillside golden pagoda visit",
            "French colonial street architecture walking tour",
            "Local rice paper & banana chip artisan workshop"
        ],
        included: ["Bamboo train ride ticket", "Bat cave excursion transport", "Boutique hotel stay", "Local guide"],
        excluded: ["Food outside breakfast", "Gratuities"]
    }
];

export default function Packages() {
    const navigate = useNavigate();

    // Filter state
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState('popular');

    // Sidebar Filters State
    const [sidebarDestination, setSidebarDestination] = useState('All');
    const [travelDate, setTravelDate] = useState('');
    const [maxPrice, setMaxPrice] = useState(500);
    const [selectedTypes, setSelectedTypes] = useState({
        adventure: false,
        culture: false,
        beach: false,
        city: false,
        nature: false
    });

    // Favorites state
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('fyt-fav-packages');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    });

    // Detail Modal State
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Toggle Wishlist
    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        playBeep(true);
        setFavorites(prev => {
            const updated = { ...prev, [id]: !prev[id] };
            localStorage.setItem('fyt-fav-packages', JSON.stringify(updated));
            return updated;
        });
    };

    // Toggle Type Checkbox
    const handleTypeCheckbox = (type) => {
        playBeep(true);
        setSelectedTypes(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    // Filter Logic
    const filteredPackages = useMemo(() => {
        return initialPackages.filter(pkg => {
            // Pill filter
            if (activeFilter !== 'All') {
                if (pkg.category !== activeFilter) return false;
            }

            // Sidebar Destination filter
            if (sidebarDestination !== 'All') {
                if (!pkg.location.toLowerCase().includes(sidebarDestination.toLowerCase())) return false;
            }

            // Price filter
            if (pkg.price > maxPrice) return false;

            // Checkbox Types filter
            const activeCheckboxTypes = Object.keys(selectedTypes).filter(k => selectedTypes[k]);
            if (activeCheckboxTypes.length > 0) {
                if (!activeCheckboxTypes.includes(pkg.category)) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return b.reviews - a.reviews;
        });
    }, [activeFilter, sidebarDestination, maxPrice, selectedTypes, sortBy]);

    // Handle Quick Booking from Package
    const handleBookPackage = (pkg) => {
        playBeep(true);
        setSelectedPackage(null);
        navigate(`/booking?package=${encodeURIComponent(pkg.title)}&location=${encodeURIComponent(pkg.location)}&price=${pkg.price}`);
    };

    return (
        <div>
            {/* Top Hero Section (Kept intact matching the rest of the site) */}
            <header className="hero-section hero-page">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title">OUR PACKAGES</h1>
                    <p style={{ maxWidth: '800px', margin: '0 auto 40px auto', color: 'white', fontSize: '1.1rem', lineHeight: '1.6', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Discover our exclusive tour packages in Cambodia. Whether you are seeking adventure, relaxation, culture, or food - we have the perfect journey for you.
                    </p>
                    <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            className="btn-primary" 
                            style={{ borderRadius: '30px', background: '#0d6efd', padding: '12px 35px', fontWeight: 'bold' }} 
                            onClick={() => document.getElementById('popular-packages-section')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            PACKAGES
                        </button>
                    </div>
                </div>

                {/* Features Info Bar */}
                <HeroInfoBar />
            </header>

            {/* Popular Packages Redesigned Section */}
            <section id="popular-packages-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-slate-50 dark:bg-zinc-950 transition-colors">
                {/* Header: Title & Sort By */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight packages-title-underline pb-2">
                            Popular Packages
                        </h2>
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-4 py-2.5 shadow-sm">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sort by:</span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    playBeep(true);
                                    setSortBy(e.target.value);
                                }}
                                className="bg-transparent text-sm font-bold text-slate-800 dark:text-white pr-7 outline-none cursor-pointer appearance-none"
                            >
                                <option value="popular" className="dark:bg-zinc-900">Popular</option>
                                <option value="price-low" className="dark:bg-zinc-900">Price: Low to High</option>
                                <option value="price-high" className="dark:bg-zinc-900">Price: High to Low</option>
                                <option value="rating" className="dark:bg-zinc-900">Highest Rated</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Category Filter Pills Row */}
                <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
                    <button
                        className={`pkg-filter-pill ${activeFilter === 'All' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveFilter('All'); }}
                    >
                        <span>All</span>
                    </button>

                    <button
                        className={`pkg-filter-pill ${activeFilter === 'adventure' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveFilter('adventure'); }}
                    >
                        <span>Adventure</span>
                    </button>

                    <button
                        className={`pkg-filter-pill ${activeFilter === 'beach' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveFilter('beach'); }}
                    >
                        <span>Beach</span>
                    </button>

                    <button
                        className={`pkg-filter-pill ${activeFilter === 'culture' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveFilter('culture'); }}
                    >
                        <span>Culture</span>
                    </button>

                    <button
                        className={`pkg-filter-pill ${activeFilter === 'city' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveFilter('city'); }}
                    >
                        <span>City Tour</span>
                    </button>

                    <button
                        className={`pkg-filter-pill ${activeFilter === 'nature' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveFilter('nature'); }}
                    >
                        <span>Nature</span>
                    </button>
                </div>

                {/* 2-Column Split: Packages Grid on Left, Sidebar on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-8 items-start">
                    {/* Left: Packages Grid */}
                    <div>
                        {filteredPackages.length === 0 ? (
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-sm">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Packages Found</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                                    No packages match your active filters. Try clearing some selections.
                                </p>
                                <button
                                    onClick={() => {
                                        playBeep(true);
                                        setActiveFilter('All');
                                        setSidebarDestination('All');
                                        setMaxPrice(500);
                                        setSelectedTypes({ adventure: false, culture: false, beach: false, city: false, nature: false });
                                    }}
                                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/25"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredPackages.map((pkg) => {
                                    const isFav = !!favorites[pkg.id];
                                    return (
                                        <div
                                            key={pkg.id}
                                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col group"
                                            onClick={() => {
                                                playBeep(true);
                                                setSelectedPackage(pkg);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {/* Image & Badges */}
                                            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                                                <img
                                                    src={pkg.img}
                                                    alt={pkg.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />

                                                {/* Top Left Floating Category Badge */}
                                                <div className="absolute top-3 left-3 z-10 flex items-center px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-md">
                                                    <span>{pkg.categoryLabel}</span>
                                                </div>
                                            </div>

                                            {/* Card Content Area */}
                                            <div className="p-5 flex flex-col flex-1">
                                                {/* Title */}
                                                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                                                    {pkg.title}
                                                </h3>

                                                {/* Location */}
                                                <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium mb-3">
                                                    <span className="truncate">{pkg.location}</span>
                                                </div>

                                                {/* Meta Info Row */}
                                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium py-2.5 border-t border-b border-slate-100 dark:border-zinc-800/80 mb-4">
                                                    <div>
                                                        <span>{pkg.duration}</span>
                                                    </div>
                                                    <div>
                                                        <span>{pkg.people}</span>
                                                    </div>
                                                </div>

                                                {/* Price & View Details Button */}
                                                <div className="flex items-center justify-between mt-auto pt-1">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                                                            ${pkg.price}
                                                        </span>
                                                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                                                            / person
                                                        </span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            playBeep(true);
                                                            setSelectedPackage(pkg);
                                                        }}
                                                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40"
                                                    >
                                                        <span>View Details</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right: Sidebar with "Find Your Perfect Trip" and "Special Offer" */}
                    <aside className="space-y-6 lg:sticky lg:top-24">
                        {/* Find Your Perfect Trip Card */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                            <div className="text-slate-900 dark:text-white font-bold text-base mb-5 pb-3 border-b border-slate-100 dark:border-zinc-800">
                                <span className="tracking-tight">Find Your Perfect Trip</span>
                            </div>

                            {/* Destination */}
                            <div className="mb-5">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                                    <span>Destination</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={sidebarDestination}
                                        onChange={(e) => {
                                            playBeep(true);
                                            setSidebarDestination(e.target.value);
                                        }}
                                        className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="All">All Destinations</option>
                                        <option value="Siem Reap">Siem Reap, Cambodia</option>
                                        <option value="Phnom Penh">Phnom Penh, Cambodia</option>
                                        <option value="Sihanoukville">Sihanoukville, Cambodia</option>
                                        <option value="Kampot">Kampot, Cambodia</option>
                                        <option value="Krabi">Krabi, Thailand</option>
                                        <option value="Kratie">Kratie, Cambodia</option>
                                        <option value="Battambang">Battambang, Cambodia</option>
                                    </select>
                                </div>
                            </div>

                            {/* Travel Date */}
                            <div className="mb-5">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                                    <span>Travel Date</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={travelDate}
                                        onChange={(e) => setTravelDate(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Price Range Slider */}
                            <div className="mb-5">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                                        <span>Price Range</span>
                                    </label>
                                    <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
                                        Up to ${maxPrice}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="20"
                                    max="500"
                                    step="10"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="pkg-range-slider my-2"
                                />

                                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500">
                                    <span>$0</span>
                                    <span>$2,000+</span>
                                </div>
                            </div>

                            {/* Type Checkboxes */}
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
                                    <span>Type</span>
                                </label>

                                <div className="space-y-2.5">
                                    {[
                                        { id: 'adventure', label: 'Adventure' },
                                        { id: 'culture', label: 'Cultural' },
                                        { id: 'beach', label: 'Beach' },
                                        { id: 'city', label: 'City Tour' },
                                        { id: 'nature', label: 'Nature' }
                                    ].map((item) => (
                                        <label
                                            key={item.id}
                                            className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none group"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes[item.id]}
                                                onChange={() => handleTypeCheckbox(item.id)}
                                                className="pkg-checkbox"
                                            />
                                            <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {item.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Search Packages Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    playBeep(true);
                                    document.getElementById('popular-packages-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-[0.98]"
                            >
                                <span>Search Packages</span>
                            </button>
                        </div>

                        {/* Special Offer Banner */}
                        <div
                            className="rounded-2xl p-6 text-white relative overflow-hidden shadow-xl"
                            style={{
                                background: 'linear-gradient(135deg, #0d6efd 0%, #00a6f5 100%)'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    right: '-20px',
                                    bottom: '-20px',
                                    width: '160px',
                                    height: '160px',
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.12)',
                                    pointerEvents: 'none'
                                }}
                            ></div>

                            <div className="relative z-10">
                                <div className="mb-3">
                                    <h3 className="text-xl font-extrabold tracking-tight">Special Offer</h3>
                                </div>

                                <p className="text-xs text-blue-50 font-normal leading-relaxed mb-5 max-w-[220px]">
                                    Get up to 25% off on selected travel packages.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        playBeep(true);
                                        navigate('/booking?discount=SPECIAL25');
                                    }}
                                    className="inline-flex items-center px-5 py-2.5 rounded-full bg-white hover:bg-blue-50 text-blue-600 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                                >
                                    <span>Explore Now</span>
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* View Details Interactive Modal */}
            {selectedPackage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedPackage(null)}
                >
                    <div
                        className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header Image */}
                        <div className="relative h-64 w-full overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-zinc-800">
                            <img
                                src={selectedPackage.img}
                                alt={selectedPackage.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }}></div>

                            <button
                                type="button"
                                onClick={() => setSelectedPackage(null)}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center text-sm transition-all"
                            >
                                ✕
                            </button>

                            <div className="absolute bottom-4 left-6 right-6 text-white">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold mb-2">
                                    {selectedPackage.categoryLabel}
                                </span>
                                <h3 className="text-2xl font-black">{selectedPackage.title}</h3>
                                <div className="flex items-center text-xs text-blue-200 mt-1">
                                    <span>{selectedPackage.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 space-y-6">
                            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-800 text-center">
                                <div>
                                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Duration</span>
                                    <span className="text-sm font-bold text-slate-800 dark:text-white block">
                                        {selectedPackage.duration}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Group Size</span>
                                    <span className="text-sm font-bold text-slate-800 dark:text-white block">
                                        {selectedPackage.people}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">Price / Person</span>
                                    <span className="text-lg font-black text-blue-600 dark:text-blue-400 block">
                                        ${selectedPackage.price}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                                    Tour Overview
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {selectedPackage.description}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                                    Experience Highlights
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    {selectedPackage.highlights.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <span className="text-blue-600 font-bold">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30">
                                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 block mb-2">
                                        ✓ What's Included
                                    </span>
                                    <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-300">
                                        {selectedPackage.included.map((inc, i) => (
                                            <li key={i}>• {inc}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/50 dark:border-zinc-800">
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2">
                                        ✗ Excluded
                                    </span>
                                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                                        {selectedPackage.excluded.map((exc, i) => (
                                            <li key={i}>• {exc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
                                <div>
                                    <span className="text-xs text-slate-400 block">Total from</span>
                                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                                        ${selectedPackage.price} <span className="text-xs font-normal text-slate-500">/ traveler</span>
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPackage(null)}
                                        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleBookPackage(selectedPackage)}
                                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center"
                                    >
                                        <span>Book This Package</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
