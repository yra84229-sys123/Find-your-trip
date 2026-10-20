import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroInfoBar from '../components/HeroInfoBar';
import { playBeep } from '../utils/sound';
import { useAuth } from '../context/AuthContext';

// Restaurants Data
const initialRestaurants = [
    {
        id: 'r1',
        name: "The Sugar Palm",
        rating: 4.8,
        reviews: "1.2k",
        cuisineTags: "Khmer • Asian • Western",
        location: "Siem Reap, Cambodia",
        priceRange: "$10 – $25",
        priceUnit: "per person",
        hours: "Open 10:00 AM – 11:00 PM",
        img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        desc: "Celebrated home-style authentic Cambodian dining created by Chef Kethana Dunnet, featuring traditional Fish Amok served in young fresh coconuts.",
        popularDishes: ["Fish Amok in Young Coconut", "Beef Lok Lak with Kampot Pepper", "Eggplant with Minced Pork", "Banana in Coconut Milk"]
    },
    {
        id: 'r2',
        name: "Chanrey Tree",
        rating: 4.6,
        reviews: "856",
        cuisineTags: "Khmer • Cambodian • Fine Dining",
        location: "Siem Reap, Cambodia",
        priceRange: "$15 – $35",
        priceUnit: "per person",
        hours: "Open 11:00 AM – 10:00 PM",
        img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        desc: "Riverside lush garden sanctuary serving elevated traditional countryside recipes in an elegant restored traditional wooden pavilion.",
        popularDishes: ["Crispy Sticky Rice with Natang Sauce", "Roasted Honey Ginger Duck", "Prawn Salad with Pomelo", "Lemongrass Chicken Soup"]
    },
    {
        id: 'r3',
        name: "Malis Restaurant",
        rating: 4.5,
        reviews: "672",
        cuisineTags: "Khmer • Asian • Vegetarian",
        location: "Siem Reap, Cambodia",
        priceRange: "$8 – $20",
        priceUnit: "per person",
        hours: "Open 6:00 AM – 10:00 PM",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        desc: "Founded by Master Chef Luu Meng, Malis showcases living Cambodian cuisine in a serene setting overlooking a lotus water garden.",
        popularDishes: ["Royal Mak Mee Noodle", "Hidden Treasure Sweet Corn", "Kampot Crab Fried Rice", "Kaffir Lime Sorbet"]
    },
    {
        id: 'r4',
        name: "Red Piano",
        rating: 4.4,
        reviews: "540",
        cuisineTags: "Western • Italian • Bar",
        location: "Siem Reap, Cambodia",
        priceRange: "$12 – $30",
        priceUnit: "per person",
        hours: "Open 11:00 AM – 12:00 AM",
        img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
        desc: "Famous Pub Street colonial bistro popular since Angelina Jolie frequented while filming Tomb Raider, serving Italian pasta, pizza, and signature cocktails.",
        popularDishes: ["Tomb Raider Cocktail", "Wood-fired Margherita Pizza", "Spaghetti Carbonara", "Belgian Chocolate Fondant"]
    }
];

// Hotels Data
const initialHotels = [
    {
        id: 'h1',
        name: "Sokha Angkor Resort",
        rating: 4.9,
        reviews: "2.1k",
        propertyType: "5★ Resort",
        location: "Siem Reap, Cambodia",
        price: 120,
        priceUnit: "night",
        img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/96085585.jpg?k=1542fee04fc563a20d8d3b1f4e267f2d4569a41f0d4ee4343219b4f98481ab26&o=",
        desc: "A palatial 5-star resort boasting handcrafted Khmer wood carvings, an expansive saltwater pool with cascading waterfalls, and world-class spa facilities.",
        amenities: ["Free Airport Shuttle", "Saltwater Lagoon Pool", "Jasmine Spa", "Fitness Center", "Free Breakfast"]
    },
    {
        id: 'h2',
        name: "Hotel Tara Angkor",
        rating: 4.7,
        reviews: "1.5k",
        propertyType: "4★ Hotel",
        location: "Siem Reap, Cambodia",
        price: 76,
        priceUnit: "night",
        img: "https://cdn.kiwicollection.com/media/property/PR003310/ll/003310-26-Freeform-Swimming-Pool-Park%20Hyatt%20Siem%20Reap%202024.jpg?cb=1733525399",
        desc: "Ideally positioned on the main road to Angkor Wat, offering sleek modern guest rooms, tranquil tropical gardens, and swimming pool cocktails.",
        amenities: ["Outdoor Swimming Pool", "Buffet Breakfast", "Free High-speed Wi-Fi", "Angkor Wat Concierge", "Sauna & Jacuzzi"]
    },
    {
        id: 'h3',
        name: "Memoire d'Angkor",
        rating: 4.6,
        reviews: "962",
        propertyType: "5★ Boutique Hotel",
        location: "Siem Reap, Cambodia",
        price: 95,
        priceUnit: "night",
        img: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/104/2020/09/18085904/Nothing-Like-Siem-Reap-1170x780.jpg",
        desc: "An art-inspired luxury boutique hotel curated with contemporary Cambodian artwork, personalized butler service, and private plunge pool options.",
        amenities: ["Art Gallery Lobby", "Poolside Cocktail Bar", "Complimentary Massage Voucher", "Bicycle Rental", "Airport Pickup"]
    },
    {
        id: 'h4',
        name: "Borei Angkor Resort",
        rating: 4.4,
        reviews: "730",
        propertyType: "4★ Resort",
        location: "Siem Reap, Cambodia",
        price: 68,
        priceUnit: "night",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9M-HCjg1Z43Vc4daXyQemJJBz9PRJvDPKAfND4dDjOA&s=10",
        desc: "Warm authentic Cambodian hospitality surrounded by fragrant tropical gardens, authentic architecture, and central access to Night Market.",
        amenities: ["Large Freeform Pool", "Traditional Mudita Spa", "Khmer Cooking Classes", "Poolside Dining", "24/7 Front Desk"]
    }
];

export default function Booking() {
    const location = useLocation();
    const navigate = useNavigate();
    const { addBooking } = useAuth();

    // Top filter pills: 'all', 'restaurants', 'hotels', 'attractions'
    const [activeTab, setActiveTab] = useState('all');

    // Wishlist favorites
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('fyt-fav-bookings');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    });

    // Booking modal state
    const [bookingItem, setBookingItem] = useState(null);
    const [bookDate, setBookDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [guests, setGuests] = useState(2);
    const [specialNotes, setSpecialNotes] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Read query params if routed from packages
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pkgName = params.get('package');
        const pkgLoc = params.get('location');
        const pkgPrice = params.get('price');
        if (pkgName) {
            setBookingItem({
                name: pkgName,
                type: 'package',
                location: pkgLoc || 'Siem Reap, Cambodia',
                price: Number(pkgPrice) || 45,
                img: 'https://cms.siemreaper.click/uploads/angkor_wat_sunrise_discovery2712_997b977984.jpg'
            });
        }
    }, [location.search]);

    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        playBeep(true);
        setFavorites(prev => {
            const updated = { ...prev, [id]: !prev[id] };
            localStorage.setItem('fyt-fav-bookings', JSON.stringify(updated));
            return updated;
        });
    };

    // Open booking modal
    const handleOpenBooking = (item, type) => {
        playBeep(true);
        setBookingItem({ ...item, type });
        setBookingSuccess(false);
    };

    // Confirm booking
    const handleConfirmBooking = (e) => {
        e.preventDefault();
        playBeep(true);

        if (bookingItem) {
            addBooking({
                itemName: bookingItem.name,
                itemType: bookingItem.type || 'Hotel',
                location: bookingItem.location,
                date: bookDate,
                guests: guests,
                totalPrice: (bookingItem.price || 45) * guests,
                notes: specialNotes
            });
        }

        setBookingSuccess(true);
        setTimeout(() => {
            setBookingItem(null);
            setBookingSuccess(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div>
            {/* Top Hero Section (Kept intact matching the rest of the site) */}
            <header id="home" className="hero-section hero-page">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title" style={{ color: 'white', textTransform: 'uppercase', fontSize: '4.5rem', lineHeight: '1.2' }}>
                        BOOKING
                    </h1>
                    <p className="hero-subtitle">Reserve your perfect hotel stay and dining experience.</p>
                </div>
                <HeroInfoBar />
            </header>

            {/* Main Interactive Booking Section matching reference */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-slate-50 dark:bg-zinc-950 transition-colors">
                {/* Top Filter Pills Row */}
                <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
                    <button
                        className={`pkg-filter-pill ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveTab('all'); }}
                    >
                        <span>All</span>
                    </button>

                    <button
                        className={`pkg-filter-pill ${activeTab === 'restaurants' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveTab('restaurants'); }}
                    >
                        <span>Restaurants</span>
                    </button>

                    <button
                        className={`pkg-filter-pill ${activeTab === 'hotels' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveTab('hotels'); }}
                    >
                        <span>Hotels</span>
                    </button>

                    <button
                        className={`pkg-filter-pill ${activeTab === 'attractions' ? 'active' : ''}`}
                        onClick={() => { playBeep(true); setActiveTab('attractions'); }}
                    >
                        <span>Attractions</span>
                    </button>
                </div>

                {/* 2-Column Split: Main Content on Left, Sticky Sidebar on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_350px] gap-8 items-start">
                    {/* Left Column: Popular Sections */}
                    <div className="space-y-12">
                        {/* Section 1: Popular Restaurants */}
                        {(activeTab === 'all' || activeTab === 'restaurants') && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                                Popular Restaurants
                                            </h2>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            Taste the best food from local and international cuisines.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => { playBeep(true); setActiveTab('restaurants'); }}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition-colors"
                                    >
                                        <span>View All →</span>
                                    </button>
                                </div>

                                {/* 4-Column Restaurant Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                                    {initialRestaurants.map((rest) => {
                                        const isFav = !!favorites[rest.id];
                                        return (
                                            <div
                                                key={rest.id}
                                                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col group"
                                                onClick={() => handleOpenBooking(rest, 'restaurant')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {/* Image Area */}
                                                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                                                    <img
                                                        src={rest.img}
                                                        alt={rest.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />

                                                    {/* Top Left Rating Badge */}
                                                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md">
                                                        <span>★ {rest.rating}</span>
                                                        <span className="opacity-80">({rest.reviews})</span>
                                                    </div>

                                                    {/* Top Right Heart Wishlist */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => toggleFavorite(rest.id, e)}
                                                        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                                            isFav
                                                                ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/40'
                                                                : 'bg-black/35 hover:bg-white text-white hover:text-rose-500 backdrop-blur-md border border-white/30'
                                                        }`}
                                                        aria-label="Save restaurant"
                                                    >
                                                        <span>{isFav ? '♥' : '♡'}</span>
                                                    </button>
                                                </div>

                                                {/* Card Content Area */}
                                                <div className="p-4 flex flex-col flex-1">
                                                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                                                        {rest.name}
                                                    </h3>

                                                    <p className="text-xs text-blue-500 dark:text-blue-400 font-medium truncate mb-2">
                                                        {rest.cuisineTags}
                                                    </p>

                                                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium mb-3">
                                                        <span className="truncate">{rest.location}</span>
                                                    </div>

                                                    <div className="mt-auto pt-2 border-t border-slate-100 dark:border-zinc-800">
                                                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1.5">
                                                            {rest.priceRange}{' '}
                                                            <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">
                                                                {rest.priceUnit}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                                            <span className="truncate">{rest.hours}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Section 2: Popular Hotels */}
                        {(activeTab === 'all' || activeTab === 'hotels') && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                                Popular Hotels
                                            </h2>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            Comfortable stays for a better journey.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => { playBeep(true); setActiveTab('hotels'); }}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition-colors"
                                    >
                                        <span>View All →</span>
                                    </button>
                                </div>

                                {/* 4-Column Hotel Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                                    {initialHotels.map((hotel) => {
                                        const isFav = !!favorites[hotel.id];
                                        return (
                                            <div
                                                key={hotel.id}
                                                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col group"
                                                onClick={() => handleOpenBooking(hotel, 'hotel')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {/* Image Area */}
                                                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                                                    <img
                                                        src={hotel.img}
                                                        alt={hotel.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />

                                                    {/* Top Left Rating Badge */}
                                                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md">
                                                        <span>★ {hotel.rating}</span>
                                                        <span className="opacity-80">({hotel.reviews})</span>
                                                    </div>

                                                    {/* Top Right Heart Wishlist */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => toggleFavorite(hotel.id, e)}
                                                        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                                            isFav
                                                                ? 'bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/40'
                                                                : 'bg-black/35 hover:bg-white text-white hover:text-rose-500 backdrop-blur-md border border-white/30'
                                                        }`}
                                                        aria-label="Save hotel"
                                                    >
                                                        <span>{isFav ? '♥' : '♡'}</span>
                                                    </button>
                                                </div>

                                                {/* Card Content Area */}
                                                <div className="p-4 flex flex-col flex-1">
                                                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                                                        {hotel.name}
                                                    </h3>

                                                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium mb-1.5">
                                                        <span className="truncate">{hotel.location}</span>
                                                    </div>

                                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-3 flex items-center gap-1">
                                                        <span>{hotel.propertyType}</span>
                                                    </div>

                                                    {/* Price & Book Now Button */}
                                                    <div className="mt-auto pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                                                                ${hotel.price}
                                                            </span>
                                                            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                                                                / {hotel.priceUnit}
                                                            </span>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleOpenBooking(hotel, 'hotel');
                                                            }}
                                                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40"
                                                        >
                                                            Book Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Section 3: Popular Attractions (When Attractions Tab Selected) */}
                        {activeTab === 'attractions' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                                Popular Attractions
                                            </h2>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            Top landmarks and world wonders in Cambodia.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                                    {[
                                        { id: 'a1', name: 'Angkor Wat Sunrise', location: 'Siem Reap', rating: 4.9, reviews: '3.4k', price: 37, img: 'https://cms.siemreaper.click/uploads/angkor_wat_sunrise_discovery2712_997b977984.jpg' },
                                        { id: 'a2', name: 'Royal Palace & Pagoda', location: 'Phnom Penh', rating: 4.7, reviews: '1.8k', price: 10, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80' },
                                        { id: 'a3', name: 'Koh Rong Bioluminescent Bay', location: 'Sihanoukville', rating: 4.8, reviews: '950', price: 25, img: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/669831377.jpg?k=05c5854a62fe60082176bfe779f50ab67fe1cfa854e61268380014d294503ec1&o=' },
                                        { id: 'a4', name: 'Phnom Kulen Waterfall', location: 'Siem Reap', rating: 4.8, reviews: '810', price: 20, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80' }
                                    ].map((attr) => (
                                        <div
                                            key={attr.id}
                                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col group cursor-pointer"
                                            onClick={() => handleOpenBooking(attr, 'attraction')}
                                        >
                                            <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                                                <img src={attr.img} alt={attr.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md">
                                                    <span>★ {attr.rating} ({attr.reviews})</span>
                                                </div>
                                            </div>
                                            <div className="p-4 flex flex-col flex-1">
                                                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">{attr.name}</h3>
                                                <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-3">
                                                    <span>{attr.location}, Cambodia</span>
                                                </div>
                                                <div className="mt-auto pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                                                    <span className="text-xl font-black text-blue-600">${attr.price} <span className="text-[11px] text-slate-400 font-normal">/ person</span></span>
                                                    <button type="button" className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs">Book Tour</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sticky Sidebar matching screenshot */}
                    <aside className="space-y-5 lg:sticky lg:top-24">
                        {/* Box 1: Why Book With Us? */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-base mb-5 pb-3 border-b border-slate-100 dark:border-zinc-800">
                                <span className="tracking-tight">Why Book With Us?</span>
                            </div>

                            <div className="space-y-4 mb-6">
                                {/* Item 1 */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Best Price Guarantee</h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">Get the lowest prices, always.</p>
                                </div>

                                {/* Item 2 */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">Trusted & Secure</h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">Your information is safe with us.</p>
                                </div>

                                {/* Item 3 */}
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">24/7 Customer Support</h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">We're here to help anytime.</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    playBeep(true);
                                    navigate('/register');
                                }}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-[0.98]"
                            >
                                <span>Sign Up Now</span>
                            </button>
                        </div>

                        {/* Box 2: Special Deals Promo Card */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=200&q=80"
                                alt="Special Deals"
                                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">Special Deals</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mb-2.5">
                                    Up to 50% off on hotels and restaurants
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        playBeep(true);
                                        setActiveTab('hotels');
                                    }}
                                    className="px-3.5 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[11px] font-bold flex items-center gap-1 transition-all"
                                >
                                    <span>Explore Deals →</span>
                                </button>
                            </div>
                        </div>

                        {/* Box 3: Local Cuisine Promo Card */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80"
                                alt="Local Cuisine"
                                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">Local Cuisine</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mb-2.5">
                                    Discover authentic Cambodian flavors
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        playBeep(true);
                                        setActiveTab('restaurants');
                                    }}
                                    className="px-3.5 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[11px] font-bold flex items-center gap-1 transition-all"
                                >
                                    <span>View Restaurants →</span>
                                </button>
                            </div>
                        </div>

                        {/* Box 4: Need a Hotel? Quick Action Card */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Need a Hotel?</h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Find the perfect stay for your trip.</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    playBeep(true);
                                    setActiveTab('hotels');
                                }}
                                className="mt-3 w-full py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                            >
                                <span>Browse Hotels →</span>
                            </button>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Interactive Booking / Reservation Modal */}
            {bookingItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setBookingItem(null)}
                >
                    <div
                        className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                            <img
                                src={bookingItem.img}
                                alt={bookingItem.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)' }}></div>

                            <button
                                type="button"
                                onClick={() => setBookingItem(null)}
                                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center text-xs transition-all font-bold"
                            >
                                ✕
                            </button>

                            <div className="absolute bottom-3.5 left-5 right-5 text-white">
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-600 mb-1 inline-block">
                                    {bookingItem.type === 'restaurant' ? 'Restaurant Reservation' : 'Hotel Booking'}
                                </span>
                                <h3 className="text-xl font-extrabold">{bookingItem.name}</h3>
                                <p className="text-xs text-blue-200 flex items-center gap-1 mt-0.5">
                                    <span>{bookingItem.location}</span>
                                </p>
                            </div>
                        </div>

                        {/* Modal Body / Form */}
                        <div className="p-6">
                            {bookingSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center text-2xl font-bold animate-bounce">
                                        ✓
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                        Booking Confirmed!
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Your reservation has been added to your Dashboard. Redirecting...
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleConfirmBooking} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                                Reservation Date
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={bookDate}
                                                onChange={(e) => setBookDate(e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                                Number of Guests
                                            </label>
                                            <select
                                                value={guests}
                                                onChange={(e) => setGuests(Number(e.target.value))}
                                                className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                                            >
                                                <option value={1}>1 Guest</option>
                                                <option value={2}>2 Guests</option>
                                                <option value={3}>3 Guests</option>
                                                <option value={4}>4 Guests</option>
                                                <option value={5}>5+ Guests</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                            Special Request / Notes (Optional)
                                        </label>
                                        <textarea
                                            rows="2"
                                            value={specialNotes}
                                            onChange={(e) => setSpecialNotes(e.target.value)}
                                            placeholder="E.g., Window seat, quiet room, late check-in..."
                                            className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                                        <div>
                                            <span className="text-[11px] text-slate-400 block">Estimated Price</span>
                                            <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                                                {bookingItem.price ? `$${bookingItem.price * guests}` : (bookingItem.priceRange || 'Pay at venue')}
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setBookingItem(null)}
                                                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-1.5"
                                            >
                                                <span>Confirm Reservation</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
