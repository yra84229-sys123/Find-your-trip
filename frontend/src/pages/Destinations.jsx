import React from 'react';
import HeroInfoBar from '../components/HeroInfoBar';
import DestinationsExplorer from '../components/DestinationsExplorer';

export default function Destinations() {
    return (
        <div>
            {/* Top Hero Section (Same style as before & matching Home, Packages, etc.) */}
            <header id="home" className="hero-section hero-page">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title" style={{ color: 'white', textTransform: 'uppercase', fontSize: '4.5rem', lineHeight: '1.2' }}>
                        POPULAR DESTINATION <br/> IN CAMBODIA
                    </h1>
                    <p className="hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto 40px auto', color: 'white', fontSize: '1.1rem', lineHeight: '1.6', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Discover the most popular destinations in Cambodia. From the ancient wonders of Angkor Wat to the pristine beaches of the south, experience the rich culture and breathtaking landscapes of the Kingdom of Wonder.
                    </p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            className="btn-primary" 
                            style={{ borderRadius: '30px', background: '#0d6efd', padding: '12px 35px', fontWeight: 'bold' }} 
                            onClick={() => document.getElementById('destinations-explorer')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            EXPLORE DESTINATIONS
                        </button>
                    </div>
                </div>

                {/* Features Info Bar */}
                <HeroInfoBar />
            </header>

            {/* Main Interactive Destinations Explorer */}
            <section id="destinations-explorer" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-12 px-3 sm:px-6 lg:px-8">
                <div className="max-w-[1440px] mx-auto">
                    <DestinationsExplorer showTitle={true} />
                </div>
            </section>
        </div>
    );
}
