import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isActive = (path) => location.pathname === path;

    // Dedicated clean light dashboard navbar matching Image 2
    if (location.pathname === '/dashboard') {
        const userName = user?.name || 'Traveler';
        const userAvatar = user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}`;

        return (
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 px-4 sm:px-8 py-3.5 transition-colors">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    {/* Left: TOURLY Logo */}
                    <Link to="/" className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-extrabold text-xl tracking-wide">
                        <i className="fa-solid fa-plane-departure text-xl"></i>
                        <span>TOURLY</span>
                    </Link>

                    {/* Center: Navigation Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold transition-colors">
                            Home
                        </Link>
                        <Link to="/destinations" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold transition-colors">
                            Destinations
                        </Link>
                        <Link to="/packages" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold transition-colors">
                            Packages
                        </Link>
                        <Link to="/trip-planner" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold transition-colors">
                            Trip Planner
                        </Link>
                        <Link to="/calculator" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold transition-colors">
                            Calculator
                        </Link>
                        <Link to="/dashboard" className="text-blue-600 dark:text-blue-400 text-sm font-bold border-b-2 border-blue-600 pb-0.5">
                            My Account
                        </Link>
                    </div>

                    {/* Right: Search, Notification Bell, User Avatar */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:white transition-colors" title="Search">
                            <i className="fa-solid fa-magnifying-glass text-base"></i>
                        </button>
                        <div className="relative cursor-pointer" title="Notifications">
                            <i className="fa-regular fa-bell text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:white text-lg transition-colors"></i>
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                2
                            </span>
                        </div>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
                                />
                                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                                    {userName}
                                </span>
                                <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 hidden sm:inline"></i>
                            </button>
                            {profileDropdownOpen && (
                                <div className="absolute right-0 top-11 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 flex flex-col gap-1">
                                    <Link to="/dashboard" className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2">
                                        <i className="fa-solid fa-user text-blue-500"></i> My Profile
                                    </Link>
                                    <hr className="border-slate-100 dark:border-slate-800 my-1" />
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg flex items-center gap-2"
                                    >
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <>
            {/* Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-top">
                    <div className="nav-contact">
                        <div className="nav-contact-icon"><i className="fa-solid fa-phone"></i></div>
                        <div className="nav-contact-text">
                            <span>For Further Inquires :</span>
                            <strong>+855 017 573 688</strong>
                        </div>
                    </div>
                    <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <i className="fa-solid fa-plane-departure"></i>
                        <span>TOURLY</span>
                    </Link>
                    <div className="nav-search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="nav-bottom">
                    <div className="nav-social">
                        <a href="https://www.facebook.com/share/14hLmmP1Gvx/?mibextid=wwXIfr" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/iur.aaaa" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                    <div className="nav-links">
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>HOME</Link>
                        <Link to="/destinations" className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}>POPULAR DESTINATIONS</Link>
                        <Link to="/packages" className={`nav-link ${isActive('/packages') ? 'active' : ''}`}>PACKAGES</Link>
                        <Link to="/trip-planner" className={`nav-link ${isActive('/trip-planner') ? 'active' : ''}`}>TRIP PLANNER</Link>
                        <Link to="/calculator" className={`nav-link ${isActive('/calculator') ? 'active' : ''}`}>CALCULATOR</Link>
                        <Link to="/hidden-gems" className={`nav-link ${isActive('/hidden-gems') ? 'active' : ''}`}>HIDDEN GEMS</Link>
                        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>ABOUT US</Link>
                    </div>

                    {/* Login Button or User Profile Dropdown */}
                    {user ? (
                        <div 
                            ref={dropdownRef}
                            id="user-profile-btn" 
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                backgroundColor: '#e83e8c',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginLeft: '15px',
                                marginRight: '10px',
                                border: '2px solid white',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                position: 'relative',
                                zIndex: 100,
                                flexShrink: 0
                            }}
                        >
                            {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                            {profileDropdownOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '48px',
                                    right: 0,
                                    background: 'var(--bg-panel, white)',
                                    borderRadius: '8px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                                    width: '190px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                    padding: '5px 0',
                                    border: '1px solid var(--border-color, #eee)',
                                    zIndex: 1000
                                }}>
                                    <div style={{ padding: '10px 15px', fontSize: '0.85rem', color: 'var(--text-muted, #666)', borderBottom: '1px solid var(--border-color, #eee)', wordBreak: 'break-all', fontWeight: 'normal' }}>
                                        {user.email || user.name}
                                    </div>
                                    <Link 
                                        to="/dashboard" 
                                        onClick={() => setProfileDropdownOpen(false)}
                                        style={{ padding: '12px 15px', textDecoration: 'none', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--text-main, #333)', display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}
                                    >
                                        <i className="fa-solid fa-gauge" style={{ color: 'var(--primary, #0d6efd)' }}></i> Dashboard
                                    </Link>
                                    <button 
                                        onClick={() => { logout(); setProfileDropdownOpen(false); }} 
                                        style={{ padding: '12px 15px', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', fontSize: '0.95rem', color: '#e83e8c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            id="nav-login-btn" 
                            className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                            style={{ 
                                marginLeft: '15px', 
                                marginRight: '10px', 
                                fontWeight: 700, 
                                color: scrolled ? 'var(--text-main)' : 'white', 
                                display: 'flex', 
                                alignItems: 'center', 
                                textDecoration: 'none',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <i className="fa-solid fa-user" style={{ marginRight: '6px' }}></i> LOGIN
                        </Link>
                    )}

                    <Link to="/booking" className="nav-book-btn">BOOK NOW</Link>
                    
                    <button 
                        className="mobile-menu-btn" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                        style={{ color: "white" }}
                    >
                        <i className={"fa-solid " + (mobileMenuOpen ? "fa-xmark" : "fa-bars")}></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={"mobile-menu " + (mobileMenuOpen ? "open" : "")}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div className="nav-logo" style={{ color: 'var(--text-main)' }}>
                        <i className="fa-solid fa-plane-departure"></i>
                        <span>TOURLY</span>
                    </div>
                    <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', display: 'block' }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
                <Link to="/destinations" onClick={() => setMobileMenuOpen(false)}>POPULAR DESTINATIONS</Link>
                <Link to="/packages" onClick={() => setMobileMenuOpen(false)}>PACKAGES</Link>
                <Link to="/trip-planner" onClick={() => setMobileMenuOpen(false)}>TRIP PLANNER</Link>
                <Link to="/calculator" onClick={() => setMobileMenuOpen(false)}>CALCULATOR</Link>
                <Link to="/hidden-gems" onClick={() => setMobileMenuOpen(false)}>HIDDEN GEMS</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>ABOUT US</Link>
                {user ? (
                    <>
                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>DASHBOARD</Link>
                        <button 
                            onClick={() => { logout(); setMobileMenuOpen(false); }} 
                            style={{ background: 'none', border: 'none', color: '#e83e8c', textAlign: 'left', padding: '10px 0', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                            LOGOUT
                        </button>
                    </>
                ) : (
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>LOGIN</Link>
                )}
                <Link to="/booking" className="btn-primary" style={{ marginTop: '20px', textAlign: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                    BOOK NOW
                </Link>
            </div>
        </>
    );
}
