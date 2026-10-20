import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Home, Calendar, Clock, FileText, Bell, XCircle, Star,
    Settings, LogOut, Mail, Phone, MapPin, Edit3, Camera,
    Download, Heart, ChevronRight, CheckCircle2, Info,
    Headphones, Plus, ExternalLink, ShieldCheck, Globe,
    Lock, X, Check, Compass, FileCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserDashboard() {
    const { user, logout, updateProfile } = useAuth();
    const navigate = useNavigate();

    // Active Sidebar Tab
    const [activeSidebarTab, setActiveSidebarTab] = useState('my-account');

    // Saved Items Tab: 'destinations' | 'hotels' | 'packages'
    const [savedTab, setSavedTab] = useState('destinations');

    // Favorites state
    const [favorites, setFavorites] = useState({
        'angkor-wat': true,
        'kampot-river': false,
        'bokor-mountain': false,
        'koh-rong': false
    });

    // Edit Profile Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Traveler',
        email: user?.email || '',
        phone: user?.phone || '+855 12 345 678',
        location: user?.location || 'Phnom Penh, Cambodia',
        avatar: user?.avatar || (user?.name ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}` : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80')
    });

    // Keep profile data synchronized with current authenticated user
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || 'Traveler',
                email: user.email || '',
                phone: user.phone || '+855 12 345 678',
                location: user.location || 'Phnom Penh, Cambodia',
                avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || 'Traveler')}`
            });
        }
    }, [user]);

    // Toast feedback for actions (e.g., download receipt)
    const [toastMessage, setToastMessage] = useState(null);

    const triggerToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const toggleFavorite = (id) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
        triggerToast(!favorites[id] ? 'Added to Saved Items' : 'Removed from Saved Items');
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (updateProfile) {
            updateProfile(profileData);
        }
        setIsEditModalOpen(false);
        triggerToast('Profile updated successfully!');
    };

    const handleDownloadReceipt = (code) => {
        triggerToast(`Downloading receipt ${code}.pdf ...`);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-100/80 dark:bg-slate-950 flex flex-col lg:flex-row transition-colors">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* =========================================================================
                1. LEFT SIDEBAR
            ========================================================================= */}
            <aside className="w-full lg:w-64 xl:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shrink-0 shadow-sm">
                <div className="space-y-6">
                    {/* User Mini Profile Header */}
                    <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 dark:border-slate-800">
                        <div className="relative">
                            <img
                                src={profileData.avatar}
                                alt={profileData.name}
                                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-blue-500/30 shadow-sm"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="font-extrabold text-slate-800 dark:text-white text-base truncate">
                                {profileData.name}
                            </h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                {profileData.email}
                            </p>
                            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-[11px] font-bold">
                                Traveler
                            </span>
                        </div>
                    </div>

                    {/* Sidebar Nav Links */}
                    <nav className="space-y-1">
                        {[
                            { id: 'my-account', label: 'My Account', icon: Home },
                            { id: 'bookings', label: 'My Bookings', icon: Calendar },
                            { id: 'history', label: 'Booking History', icon: Clock },
                            { id: 'receipts', label: 'Saved Receipts', icon: FileText },
                            { id: 'notifications', label: 'Notifications', icon: Bell, badge: '2' },
                            { id: 'cancelled', label: 'Cancelled Bookings', icon: XCircle },
                            { id: 'reviews', label: 'Reviews', icon: Star },
                            { id: 'settings', label: 'Account Settings', icon: Settings },
                        ].map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSidebarTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveSidebarTab(item.id);
                                        const el = document.getElementById(item.id);
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                        isActive
                                            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                                        <span>{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors pt-2"
                        >
                            <LogOut className="w-4 h-4 text-slate-400 hover:text-red-600" />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>

                {/* Bottom Artistic Watermark: "Explore Dream Discover" */}
                <div className="pt-8 pb-3 text-center hidden lg:block opacity-60">
                    <div className="relative inline-block">
                        <svg className="w-32 h-16 mx-auto text-blue-200 dark:text-blue-900/40" viewBox="0 0 160 80" fill="none" stroke="currentColor">
                            {/* Angkor silhouette outline */}
                            <path d="M10 70 L30 70 L35 55 L45 55 L50 40 L55 40 L60 25 L65 40 L70 40 L75 55 L85 55 L90 70 L150 70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M60 25 L60 15 L62 15" strokeWidth="1.5" />
                            {/* Paper plane */}
                            <path d="M120 20 L145 15 L130 35 L125 25 Z" strokeWidth="1.2" />
                            <path d="M110 32 Q120 28 125 25" strokeWidth="1" strokeDasharray="2 2" />
                        </svg>
                        <p className="font-serif italic text-blue-400 dark:text-blue-500 text-sm -mt-2 tracking-wide font-medium">
                            Explore Dream Discover
                        </p>
                    </div>
                </div>
            </aside>

            {/* =========================================================================
                2. MAIN CONTENT AREA
            ========================================================================= */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto overflow-y-auto">
                {/* 1. TOP WELCOME PANORAMIC BANNER */}
                <div className="relative rounded-2xl overflow-hidden shadow-md min-h-[160px] sm:min-h-[180px] flex items-center px-6 sm:px-10">
                    {/* Background Image of Angkor Wat */}
                    <img
                        src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=80"
                        alt="Angkor Wat Panorama"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/30"></div>

                    {/* Banner Content */}
                    <div className="relative z-10 max-w-2xl space-y-1.5 py-4">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                            Welcome back, {profileData.name}!
                        </h1>
                        <p className="text-white/80 text-xs sm:text-sm font-medium leading-relaxed">
                            Manage your trips, bookings, and account all in one place.
                        </p>
                    </div>
                </div>

                {/* 2. TOP ROW (3 CARDS): Profile Info, Quick Actions, Promo Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Card 1: Profile Information */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                        <div className="space-y-4">
                            <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">
                                Profile Information
                            </h3>

                            <div className="flex items-start gap-4">
                                <div className="relative shrink-0">
                                    <img
                                        src={profileData.avatar}
                                        alt={profileData.name}
                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/20 shadow-sm"
                                    />
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors"
                                        title="Change avatar"
                                    >
                                        <Camera className="w-3 h-3" />
                                    </button>
                                </div>
                                <div className="space-y-1.5 text-xs flex-1">
                                    <h4 className="font-extrabold text-slate-800 dark:text-white text-base">
                                        {profileData.name}
                                    </h4>
                                    <p className="text-slate-500 flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span className="truncate">{profileData.email}</span>
                                    </p>
                                    <p className="text-slate-500 flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span>{profileData.phone}</span>
                                    </p>
                                    <p className="text-slate-500 flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span>{profileData.location}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit Profile</span>
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Quick Actions */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                        <div>
                            <h3 className="font-extrabold text-slate-800 dark:text-white text-sm mb-4">
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    to="/packages"
                                    className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 hover:bg-blue-100/70 dark:hover:bg-blue-900/50 border border-blue-100 dark:border-blue-900/50 flex flex-col items-center justify-center text-center gap-2 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">New Booking</span>
                                </Link>

                                <button
                                    onClick={() => {
                                        const el = document.getElementById('receipts');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="p-3.5 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/40 hover:bg-cyan-100/70 dark:hover:bg-cyan-900/50 border border-cyan-100 dark:border-cyan-900/50 flex flex-col items-center justify-center text-center gap-2 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                        <FileCheck className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">View Receipts</span>
                                </button>

                                <button
                                    onClick={() => triggerToast('My Reviews will open soon!')}
                                    className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 hover:bg-amber-100/70 dark:hover:bg-amber-900/50 border border-amber-100 dark:border-amber-900/50 flex flex-col items-center justify-center text-center gap-2 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">My Reviews</span>
                                </button>

                                <Link
                                    to="/contact"
                                    className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-900/50 flex flex-col items-center justify-center text-center gap-2 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                                        <Headphones className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Get Support</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: "Your Next Adventure is Waiting!" Promo Card */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-200/90 dark:border-slate-800 p-6 flex flex-col justify-between text-white md:col-span-2 xl:col-span-1 min-h-[220px]">
                        <img
                            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                            alt="Adventure in Cambodia"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/30"></div>

                        <div className="relative z-10 space-y-2">
                            <h3 className="font-extrabold text-lg sm:text-xl text-white leading-snug">
                                Your Next Adventure <br /> is Waiting!
                            </h3>
                            <p className="text-white/80 text-xs leading-relaxed max-w-xs">
                                Explore more destinations and create new memories.
                            </p>
                        </div>

                        <div className="relative z-10 pt-4">
                            <Link
                                to="/destinations"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 active:scale-98 text-blue-600 text-xs font-extrabold shadow-sm transition-all"
                            >
                                <span>Explore Destinations</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 3. MIDDLE ROW: My Bookings & Saved Items */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="bookings">
                    {/* Left & Center: My Bookings (8 cols) */}
                    <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                                My Bookings
                            </h3>
                            <button
                                onClick={() => triggerToast('Viewing all bookings')}
                                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View All
                            </button>
                        </div>

                        {/* List of 3 Bookings */}
                        <div className="space-y-3.5">
                            {/* Booking 1: Confirmed */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 transition-all gap-4">
                                <div className="flex items-center gap-3.5">
                                    <img
                                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80"
                                        alt="Angkor Paradise Hotel"
                                        className="w-16 h-14 sm:w-18 sm:h-16 rounded-xl object-cover shrink-0 shadow-xs"
                                    />
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                                            Angkor Paradise Hotel
                                        </h4>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            <span>Siem Reap, Cambodia</span>
                                        </p>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <span>12 Apr 2026 – 16 Apr 2026 (4 nights)</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                                        Confirmed
                                    </span>
                                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        $320.00
                                    </span>
                                    <button
                                        onClick={() => triggerToast('Booking #TR20261003 details')}
                                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                    >
                                        <span>View Details</span>
                                        <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Booking 2: Pending */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 transition-all gap-4">
                                <div className="flex items-center gap-3.5">
                                    <img
                                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80"
                                        alt="Sokha Beach Resort"
                                        className="w-16 h-14 sm:w-18 sm:h-16 rounded-xl object-cover shrink-0 shadow-xs"
                                    />
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                                            Sokha Beach Resort
                                        </h4>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            <span>Sihanoukville, Cambodia</span>
                                        </p>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <span>5 May 2026 – 8 May 2026 (3 nights)</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                                        Pending
                                    </span>
                                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        $210.00
                                    </span>
                                    <button
                                        onClick={() => triggerToast('Booking #TR20260505 details')}
                                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                    >
                                        <span>View Details</span>
                                        <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Booking 3: Cancelled */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 transition-all gap-4">
                                <div className="flex items-center gap-3.5">
                                    <img
                                        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80"
                                        alt="Bokor Mountain Package"
                                        className="w-16 h-14 sm:w-18 sm:h-16 rounded-xl object-cover shrink-0 shadow-xs"
                                    />
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                                            Bokor Mountain Package
                                        </h4>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            <span>Kampot, Cambodia</span>
                                        </p>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            <span>20 Jun 2026 – 22 Jun 2026 (2 nights)</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-[11px] font-bold">
                                        Cancelled
                                    </span>
                                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        $180.00
                                    </span>
                                    <button
                                        onClick={() => triggerToast('Cancelled booking details')}
                                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                    >
                                        <span>View Details</span>
                                        <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Saved Items (4 cols) */}
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                                Saved Items
                            </h3>
                            <button
                                onClick={() => triggerToast('Viewing all saved items')}
                                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View All
                            </button>
                        </div>

                        {/* Tabs: Destinations, Hotels, Packages */}
                        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/70 text-xs font-bold">
                            {[
                                { id: 'destinations', label: 'Destinations' },
                                { id: 'hotels', label: 'Hotels' },
                                { id: 'packages', label: 'Packages' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSavedTab(tab.id)}
                                    className={`flex-1 py-1.5 text-center rounded-lg transition-all ${
                                        savedTab === tab.id
                                            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Saved Items List */}
                        <div className="space-y-3 pt-1">
                            {[
                                {
                                    id: 'angkor-wat',
                                    title: 'Angkor Wat',
                                    loc: 'Siem Reap',
                                    img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=400&q=80'
                                },
                                {
                                    id: 'kampot-river',
                                    title: 'Kampot River',
                                    loc: 'Kampot',
                                    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80'
                                },
                                {
                                    id: 'bokor-mountain',
                                    title: 'Bokor Mountain',
                                    loc: 'Kampot',
                                    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80'
                                },
                                {
                                    id: 'koh-rong',
                                    title: 'Koh Rong',
                                    loc: 'Sihanoukville',
                                    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80'
                                }
                            ].map((item) => {
                                const isFav = favorites[item.id];
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-11 h-11 rounded-lg object-cover shadow-xs"
                                            />
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-white text-xs">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[11px] text-slate-400">
                                                    {item.loc}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleFavorite(item.id)}
                                            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors"
                                            title="Toggle saved item"
                                        >
                                            <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 4. BOTTOM ROW (3 CARDS): Recent Notifications, Saved Receipts, Account Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Card 1: Recent Notifications */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4" id="notifications">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">
                                Recent Notifications
                            </h3>
                            <button
                                onClick={() => triggerToast('Viewing all notifications')}
                                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View All
                            </button>
                        </div>

                        <div className="space-y-3.5 text-xs">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div className="flex-1 space-y-0.5">
                                    <h4 className="font-bold text-slate-800 dark:text-white">
                                        Your booking #TR20261003 is confirmed!
                                    </h4>
                                    <p className="text-[11px] text-slate-400">
                                        Angkor Paradise Hotel • 12 Apr 2026
                                    </p>
                                </div>
                                <span className="text-[10px] text-slate-400 shrink-0">2h ago</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                    <Info className="w-4 h-4" />
                                </div>
                                <div className="flex-1 space-y-0.5">
                                    <h4 className="font-bold text-slate-800 dark:text-white">
                                        Payment received
                                    </h4>
                                    <p className="text-[11px] text-slate-400">
                                        $320.00 • Booking #TR20261003
                                    </p>
                                </div>
                                <span className="text-[10px] text-slate-400 shrink-0">4h ago</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                    <Star className="w-4 h-4" />
                                </div>
                                <div className="flex-1 space-y-0.5">
                                    <h4 className="font-bold text-slate-800 dark:text-white">
                                        Special discount for next trip!
                                    </h4>
                                    <p className="text-[11px] text-slate-400">
                                        Get 15% OFF on selected packages.
                                    </p>
                                </div>
                                <span className="text-[10px] text-slate-400 shrink-0">1 day ago</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                                    <Bell className="w-4 h-4" />
                                </div>
                                <div className="flex-1 space-y-0.5">
                                    <h4 className="font-bold text-slate-800 dark:text-white">
                                        Your trip reminder
                                    </h4>
                                    <p className="text-[11px] text-slate-400">
                                        Your trip to Siem Reap is in 3 days.
                                    </p>
                                </div>
                                <span className="text-[10px] text-slate-400 shrink-0">2 days ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Saved Receipts */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4" id="receipts">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">
                                Saved Receipts
                            </h3>
                            <button
                                onClick={() => triggerToast('Viewing all receipts')}
                                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View All
                            </button>
                        </div>

                        <div className="space-y-3.5">
                            {[
                                { code: 'TR20261003', title: 'Hotel Booking', date: '12 Apr 2026', price: '$320.00' },
                                { code: 'TR20260315', title: 'Package', date: '5 Mar 2026', price: '$210.00' },
                                { code: 'TR20251220', title: 'Hotel Booking', date: '20 Dec 2025', price: '$180.00' }
                            ].map((rec) => (
                                <div
                                    key={rec.code}
                                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-white text-xs">
                                                {rec.code} – {rec.title}
                                            </h4>
                                            <p className="text-[11px] text-slate-400">
                                                {rec.date} • {rec.price}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownloadReceipt(rec.code)}
                                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 p-1"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Download</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 3: Account Settings */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 md:col-span-2 xl:col-span-1" id="settings">
                        <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-extrabold text-slate-800 dark:text-white text-sm">
                                Account Settings
                            </h3>
                        </div>

                        <div className="space-y-1 text-xs">
                            <button
                                onClick={() => triggerToast('Change password modal')}
                                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Lock className="w-4 h-4 text-slate-400" />
                                    <span className="font-semibold">Change Password</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            </button>

                            <button
                                onClick={() => triggerToast('Language set to English')}
                                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-slate-400" />
                                    <span className="font-semibold">Language</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <span>English</span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>

                            <button
                                onClick={() => triggerToast('Privacy & security is active')}
                                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                                    <span className="font-semibold">Privacy & Security</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            </button>

                            <Link
                                to="/contact"
                                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Headphones className="w-4 h-4 text-slate-400" />
                                    <span className="font-semibold">Help & Support</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 transition-colors pt-2"
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut className="w-4 h-4" />
                                    <span className="font-bold">Logout</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* =========================================================================
                3. EDIT PROFILE MODAL
            ========================================================================= */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                                Edit Profile
                            </h3>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Avatar Photo URL
                                </label>
                                <input
                                    type="url"
                                    value={profileData.avatar}
                                    onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/25 flex items-center gap-1.5"
                                >
                                    <Check className="w-4 h-4" />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
