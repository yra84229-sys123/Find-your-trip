import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { provincesData, getDistance } from '../data/provincesData';
import { vehiclesConfig, fuelPrices } from '../data/packagesData';
import HeroInfoBar from '../components/HeroInfoBar';
import { playBeep } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Calculator() {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const navigate = useNavigate();

    // Active Calculator Mode Tab: 'distance' | 'gear' | 'fuel'
    const [activeTab, setActiveTab] = useState('distance');

    // Step 1: Locations
    const [originId, setOriginId] = useState('phnom-penh');
    const [destId, setDestId] = useState('siem-reap');

    // Step 2: Travel Mode
    const [travelMode, setTravelMode] = useState('car'); // 'car' | 'bus' | 'motorcycle' | 'flight'

    // Fuel Calculator specifics
    const [selectedVehicle, setSelectedVehicle] = useState('sedan');

    // Gear Calculator specifics
    const [gearItems, setGearItems] = useState([
        { id: 1, name: 'Backpack / Luggage Bag', weight: 2.5, checked: true },
        { id: 2, name: 'Clothing & Footwear', weight: 4.0, checked: true },
        { id: 3, name: 'Toiletries & Personal Care', weight: 1.2, checked: true },
        { id: 4, name: 'Camera & Electronics', weight: 2.0, checked: true },
        { id: 5, name: 'Camping Tent & Sleeping Bag', weight: 3.8, checked: false },
        { id: 6, name: 'Water & Snacks', weight: 1.5, checked: true }
    ]);

    // Calculation Trigger
    const [isCalculating, setIsCalculating] = useState(false);

    // Get Province objects
    const originProvince = useMemo(() => {
        return provincesData.find(p => p.id === originId) || provincesData[0];
    }, [originId]);

    const destProvince = useMemo(() => {
        return provincesData.find(p => p.id === destId) || provincesData[1];
    }, [destId]);

    // Distance Calculation
    const distanceKm = useMemo(() => {
        if (originId === destId) return 25;
        // Default specific distance for popular Phnom Penh -> Siem Reap
        if ((originId === 'phnom-penh' && destId === 'siem-reap') || (originId === 'siem-reap' && destId === 'phnom-penh')) {
            return 315;
        }
        return getDistance(originId, destId);
    }, [originId, destId]);

    // Estimated Times across all 4 modes
    const modeTimes = useMemo(() => {
        // Car: ~57 km/h avg
        const carHours = distanceKm / 57;
        const cH = Math.floor(carHours);
        const cM = Math.round((carHours - cH) * 60);

        // Bus: ~48 km/h avg
        const busHours = distanceKm / 48;
        const bH = Math.floor(busHours);
        const bM = Math.round((busHours - bH) * 60);

        // Motorcycle: ~42 km/h avg
        const motoHours = distanceKm / 42;
        const mH = Math.floor(motoHours);
        const mM = Math.round((motoHours - mH) * 60);

        // Flight: if airports available (Phnom Penh, Siem Reap, Sihanoukville)
        const hasFlight = (originId === 'phnom-penh' && (destId === 'siem-reap' || destId === 'preah-sihanouk')) ||
                          (originId === 'siem-reap' && (destId === 'phnom-penh' || destId === 'preah-sihanouk')) ||
                          (originId === 'preah-sihanouk' && (destId === 'phnom-penh' || destId === 'siem-reap'));

        const flightText = hasFlight ? '45 min' : 'No direct flight (1 h 15 min connecting)';

        return {
            car: `${cH} h ${cM} min`,
            bus: `${bH} h ${bM} min`,
            motorcycle: `${mH} h ${mM} min`,
            flight: flightText
        };
    }, [distanceKm, originId, destId]);

    // Fuel calculation
    const fuelCalc = useMemo(() => {
        const v = vehiclesConfig[selectedVehicle] || { speed: 80, consumption: 7.2, fuelType: 'gasoline' };
        const unitPrice = fuelPrices[v.fuelType] || 1.15;
        const totalFuel = (distanceKm * v.consumption) / 100;
        const totalCost = totalFuel * unitPrice;
        return {
            liters: totalFuel.toFixed(1),
            cost: totalCost.toFixed(2),
            unit: v.fuelType === 'electricity' ? 'kWh' : 'L',
            rate: v.consumption
        };
    }, [distanceKm, selectedVehicle]);

    // Gear total weight
    const totalGearWeight = useMemo(() => {
        return gearItems.filter(i => i.checked).reduce((sum, i) => sum + i.weight, 0).toFixed(1);
    }, [gearItems]);

    const handleCalculate = (e) => {
        if (e) e.preventDefault();
        playBeep(true);
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
        }, 300);
    };

    const toggleGear = (id) => {
        playBeep(true);
        setGearItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    const isPopular = (originId === 'phnom-penh' && destId === 'siem-reap') ||
                      (originId === 'siem-reap' && destId === 'phnom-penh') ||
                      (originId === 'phnom-penh' && destId === 'preah-sihanouk') ||
                      (originId === 'phnom-penh' && destId === 'kampot');

    return (
        <div>
            {/* Hero Section */}
            <header id="home" className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title" style={{ color: 'white', textTransform: 'uppercase', fontSize: '4.5rem', lineHeight: '1.2' }}>
                        DISTANCE & ROUTE <br /> CALCULATOR
                    </h1>
                    <p className="hero-subtitle">
                        Calculate exact province distances, travel times across car, bus, motorcycle, and flights, plus estimated fuel costs in Cambodia.
                    </p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            className="btn-primary" 
                            style={{ borderRadius: '30px', background: '#0d6efd', padding: '15px 35px', fontWeight: 'bold' }} 
                            onClick={() => { playBeep(true); document.getElementById('calc-main-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            CALCULATE NOW
                        </button>
                    </div>
                </div>

                {/* Features Info Bar */}
                <HeroInfoBar />
            </header>

            {/* Calculator Main Section */}
            <section id="calc-main-section" style={{ background: 'var(--bg-main)', padding: '50px 0 80px 0' }}>
                <style>{`
                    .calc-wide-container {
                        width: 96%;
                        max-width: 1720px;
                        margin: 0 auto;
                        padding: 0 16px;
                    }
                    .calc-grid-wrapper {
                        display: grid;
                        grid-template-columns: 1.45fr 1fr;
                        gap: 24px;
                        align-items: start;
                    }
                    .calc-mode-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        padding: 14px 18px;
                        border-radius: 10px;
                        border: 1px solid var(--border-color, #e2e8f0);
                        background: var(--bg-light, #ffffff);
                        color: var(--text-main, #1e293b);
                        font-weight: 600;
                        font-size: 0.95rem;
                        cursor: pointer;
                        transition: all 0.2s;
                        flex: 1;
                    }
                    .calc-mode-btn:hover {
                        border-color: #0d6efd;
                        color: #0d6efd;
                    }
                    .calc-mode-btn.active {
                        border: 2px solid #0d6efd;
                        background: rgba(13, 110, 253, 0.08);
                        color: #0d6efd;
                    }
                    .calc-select {
                        width: 100%;
                        border: none;
                        background: transparent;
                        font-size: 1.05rem;
                        font-weight: 600;
                        color: var(--text-main, #1e293b);
                        outline: none;
                        cursor: pointer;
                    }
                    .calc-select option {
                        background-color: var(--bg-panel, #ffffff);
                        color: var(--text-main, #1e293b);
                    }
                    body.dark-theme .calc-select,
                    body.dark-theme .calc-select option {
                        color-scheme: dark !important;
                        background-color: #141b2d !important;
                        color: #f8fafc !important;
                    }
                    body.light-theme .calc-select,
                    body.light-theme .calc-select option {
                        color-scheme: light !important;
                        background-color: #ffffff !important;
                        color: #1e293b !important;
                    }
                    @media (max-width: 1200px) {
                        .calc-grid-wrapper {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
                <div className="calc-wide-container">
                    
                    {/* Top 3 Tab Switchers */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        {/* Tab 1: Distance Calculator */}
                        <div 
                            onClick={() => { playBeep(true); setActiveTab('distance'); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '16px 20px',
                                borderRadius: '12px',
                                background: 'var(--bg-panel, #ffffff)',
                                border: activeTab === 'distance' ? '2px solid #0d6efd' : '1px solid var(--border-color, #e2e8f0)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeTab === 'distance' ? '0 4px 15px rgba(13, 110, 253, 0.15)' : 'none'
                            }}
                        >
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: activeTab === 'distance' ? '#0d6efd' : 'var(--text-main, #1e293b)' }}>Distance Calculator</h4>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)' }}>Calculate distance (km)</span>
                            </div>
                        </div>

                        {/* Tab 2: Gear Calculator */}
                        <div 
                            onClick={() => { playBeep(true); setActiveTab('gear'); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '16px 20px',
                                borderRadius: '12px',
                                background: 'var(--bg-panel, #ffffff)',
                                border: activeTab === 'gear' ? '2px solid #0d6efd' : '1px solid var(--border-color, #e2e8f0)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeTab === 'gear' ? '0 4px 15px rgba(13, 110, 253, 0.15)' : 'none'
                            }}
                        >
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: activeTab === 'gear' ? '#0d6efd' : 'var(--text-main, #1e293b)' }}>Gear Calculator</h4>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)' }}>Calculate gear/weight</span>
                            </div>
                        </div>

                        {/* Tab 3: Fuel Calculator */}
                        <div 
                            onClick={() => { playBeep(true); setActiveTab('fuel'); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '16px 20px',
                                borderRadius: '12px',
                                background: 'var(--bg-panel, #ffffff)',
                                border: activeTab === 'fuel' ? '2px solid #0d6efd' : '1px solid var(--border-color, #e2e8f0)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeTab === 'fuel' ? '0 4px 15px rgba(13, 110, 253, 0.15)' : 'none'
                            }}
                        >
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: activeTab === 'fuel' ? '#0d6efd' : 'var(--text-main, #1e293b)' }}>Fuel Calculator</h4>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)' }}>Estimate fuel cost</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Two-Column Layout */}
                    <div className="calc-grid-wrapper">

                        {/* LEFT COLUMN: Main Steps Card */}
                        <div style={{
                            background: 'var(--bg-panel, #ffffff)',
                            border: '1px solid var(--border-color, #e2e8f0)',
                            borderRadius: '16px',
                            padding: '35px 32px',
                            boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.05))',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px'
                        }}>
                            {/* Step 1: Select Locations */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#0d6efd', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                                        1
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                        Select Locations
                                    </h3>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                                    {/* From Input */}
                                    <div style={{
                                        border: '1px solid var(--border-color, #e2e8f0)',
                                        borderRadius: '10px',
                                        padding: '12px 16px',
                                        background: 'var(--bg-light, #ffffff)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>From</span>
                                        </div>
                                        <select 
                                            value={originId}
                                            onChange={(e) => setOriginId(e.target.value)}
                                            className="calc-select"
                                        >
                                            {provincesData.map(p => (
                                                <option key={`from-${p.id}`} value={p.id}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* To Input */}
                                    <div style={{
                                        border: '1px solid var(--border-color, #e2e8f0)',
                                        borderRadius: '10px',
                                        padding: '12px 16px',
                                        background: 'var(--bg-light, #ffffff)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>To</span>
                                        </div>
                                        <select 
                                            value={destId}
                                            onChange={(e) => setDestId(e.target.value)}
                                            className="calc-select"
                                        >
                                            {provincesData.map(p => (
                                                <option key={`to-${p.id}`} value={p.id}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Choose Travel Mode or Tab options */}
                            {activeTab === 'distance' && (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#0d6efd', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                                            2
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                            Choose Travel Mode
                                        </h3>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '12px' }}>
                                        <button 
                                            type="button"
                                            className={`calc-mode-btn ${travelMode === 'car' ? 'active' : ''}`}
                                            onClick={() => { playBeep(true); setTravelMode('car'); }}
                                        >
                                            Car
                                        </button>
                                        <button 
                                            type="button"
                                            className={`calc-mode-btn ${travelMode === 'bus' ? 'active' : ''}`}
                                            onClick={() => { playBeep(true); setTravelMode('bus'); }}
                                        >
                                            Bus
                                        </button>
                                        <button 
                                            type="button"
                                            className={`calc-mode-btn ${travelMode === 'motorcycle' ? 'active' : ''}`}
                                            onClick={() => { playBeep(true); setTravelMode('motorcycle'); }}
                                        >
                                            Motorcycle
                                        </button>
                                        <button 
                                            type="button"
                                            className={`calc-mode-btn ${travelMode === 'flight' ? 'active' : ''}`}
                                            onClick={() => { playBeep(true); setTravelMode('flight'); }}
                                        >
                                            Flight
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'fuel' && (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#0d6efd', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                                            2
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                            Select Vehicle Type
                                        </h3>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                                        {Object.keys(vehiclesConfig).map(vKey => (
                                            <button 
                                                key={vKey}
                                                type="button"
                                                className={`calc-mode-btn ${selectedVehicle === vKey ? 'active' : ''}`}
                                                onClick={() => { playBeep(true); setSelectedVehicle(vKey); }}
                                            >
                                                {vehiclesConfig[vKey].nameEn}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'gear' && (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#0d6efd', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                                            2
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                            Travel Gear Checklist
                                        </h3>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                                        {gearItems.map(item => (
                                            <div 
                                                key={item.id}
                                                onClick={() => toggleGear(item.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '12px 16px',
                                                    borderRadius: '8px',
                                                    border: item.checked ? '2px solid #0d6efd' : '1px solid var(--border-color, #e2e8f0)',
                                                    background: item.checked ? 'rgba(13, 110, 253, 0.06)' : 'var(--bg-light, #ffffff)',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main, #1e293b)' }}>{item.name}</span>
                                                <span style={{ fontSize: '0.85rem', color: '#0d6efd', fontWeight: 700 }}>+{item.weight} kg</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Get Distance Button */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#0d6efd', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                                        3
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                        {activeTab === 'distance' ? 'Get Distance' : activeTab === 'gear' ? 'Calculate Gear Weight' : 'Calculate Fuel'}
                                    </h3>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCalculate}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        borderRadius: '8px',
                                        background: '#0d6efd',
                                        color: 'white',
                                        border: 'none',
                                        fontWeight: 700,
                                        fontSize: '1.05rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(13, 110, 253, 0.25)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {isCalculating ? 'Updating...' : activeTab === 'distance' ? 'Calculate Distance' : activeTab === 'gear' ? 'Calculate Weight' : 'Calculate Fuel'}
                                </button>
                            </div>

                            {/* Distance Result Banner */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                                gap: '20px',
                                padding: '24px 28px',
                                borderRadius: '12px',
                                background: 'rgba(13, 110, 253, 0.05)',
                                border: '1px solid rgba(13, 110, 253, 0.15)',
                                alignItems: 'center'
                            }}>
                                {/* Left Result */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>Distance Result</div>
                                        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0d6efd', lineHeight: '1.1', margin: '4px 0' }}>
                                            {distanceKm} km
                                        </div>
                                        <div style={{ fontSize: '0.84rem', color: 'var(--text-main, #1e293b)', fontWeight: 600 }}>
                                            {originProvince.name} → {destProvince.name}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Mode Breakdown Times */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: travelMode === 'car' ? '#0d6efd' : 'var(--text-main, #1e293b)', fontWeight: travelMode === 'car' ? 700 : 500 }}>
                                        <span>By Car: <strong>{modeTimes.car}</strong> (approx.)</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: travelMode === 'bus' ? '#0d6efd' : 'var(--text-main, #1e293b)', fontWeight: travelMode === 'bus' ? 700 : 500 }}>
                                        <span>By Bus: <strong>{modeTimes.bus}</strong> (approx.)</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: travelMode === 'motorcycle' ? '#0d6efd' : 'var(--text-main, #1e293b)', fontWeight: travelMode === 'motorcycle' ? 700 : 500 }}>
                                        <span>By Motorcycle: <strong>{modeTimes.motorcycle}</strong> (approx.)</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: travelMode === 'flight' ? '#0d6efd' : 'var(--text-main, #1e293b)', fontWeight: travelMode === 'flight' ? 700 : 500 }}>
                                        <span>By Flight: <strong>{modeTimes.flight}</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Route Preview & Trip Information Card */}
                        <div style={{
                            background: 'var(--bg-panel, #ffffff)',
                            border: '1px solid var(--border-color, #e2e8f0)',
                            borderRadius: '16px',
                            padding: '30px',
                            boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.05))',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px'
                        }}>
                            {/* Route Header Banner */}
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border-color, #e2e8f0)' }}>
                                <img 
                                    src={destProvince.coverImg || "https://asiatravellinks.com/images/attractions/ta-prohm.webp"} 
                                    alt={destProvince.name}
                                    style={{ width: '110px', height: '80px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                                />
                                <div>
                                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                        {originProvince.name} → {destProvince.name}
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.85rem', color: 'var(--text-muted, #64748b)', marginBottom: '8px' }}>
                                        <span>{distanceKm} km</span>
                                        <span>{modeTimes[travelMode]} (by {travelMode})</span>
                                    </div>
                                    {isPopular && (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(13, 110, 253, 0.1)', color: '#0d6efd', fontSize: '0.78rem', fontWeight: 700 }}>
                                            ★ Popular route
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trip Information Heading */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                    Trip Information
                                </h4>
                            </div>

                            {/* Information Rows */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.92rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted, #64748b)', width: '160px', flexShrink: 0 }}>
                                        <span>Road condition</span>
                                    </div>
                                    <span style={{ fontWeight: 600, color: 'var(--text-main, #1e293b)', textAlign: 'right' }}>Good (National Highway)</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted, #64748b)', width: '160px', flexShrink: 0 }}>
                                        <span>Toll fee</span>
                                    </div>
                                    <span style={{ fontWeight: 600, color: 'var(--text-main, #1e293b)', textAlign: 'right' }}>$2 – $5 (approx.)</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted, #64748b)', width: '160px', flexShrink: 0 }}>
                                        <span>Best time to travel</span>
                                    </div>
                                    <span style={{ fontWeight: 600, color: 'var(--text-main, #1e293b)', textAlign: 'right' }}>Nov – Mar (dry season)</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted, #64748b)', width: '160px', flexShrink: 0 }}>
                                        <span>Travel tips</span>
                                    </div>
                                    <span style={{ fontWeight: 500, color: 'var(--text-main, #1e293b)', textAlign: 'right', fontSize: '0.86rem', lineHeight: '1.4' }}>
                                        Bring water, snacks, and check your vehicle before the trip.
                                    </span>
                                </div>

                                {activeTab === 'fuel' && (
                                    <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(13, 110, 253, 0.08)', marginTop: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                            <span>Estimated Fuel Required:</span>
                                            <strong style={{ color: '#0d6efd' }}>{fuelCalc.liters} {fuelCalc.unit}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Estimated Fuel Cost:</span>
                                            <strong style={{ color: '#0d6efd', fontSize: '1.1rem' }}>${fuelCalc.cost}</strong>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'gear' && (
                                    <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(13, 110, 253, 0.08)', marginTop: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                            <span>Packed Gear Weight:</span>
                                            <strong style={{ color: '#0d6efd', fontSize: '1.1rem' }}>{totalGearWeight} kg</strong>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
                                            Recommended airline carry-on limit: 7.0 kg | Trekking limit: 15.0 kg
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Good to know Notice Box */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '16px 20px',
                                borderRadius: '12px',
                                background: 'rgba(16, 185, 129, 0.08)',
                                border: '1px solid rgba(16, 185, 129, 0.25)',
                                marginTop: 'auto'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#10b981' }}>Good to know</div>
                                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted, #64748b)', marginTop: '2px' }}>
                                        The distance may vary depending on your exact starting and ending points.
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Row: More Travel Tools Banner */}
                    <div style={{
                        marginTop: '28px',
                        background: 'var(--bg-panel, #ffffff)',
                        border: '1px solid var(--border-color, #e2e8f0)',
                        borderRadius: '16px',
                        padding: '24px 30px',
                        boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.05))',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '20px'
                    }}>
                        {/* Left Info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                    More Travel Tools
                                </h4>
                                <p style={{ margin: '3px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted, #64748b)' }}>
                                    Use our other tools to plan your perfect trip.
                                </p>
                            </div>
                        </div>

                        {/* Right Quick Action Links */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            <Link 
                                to="/trip-planner"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 22px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--border-color, #e2e8f0)',
                                    background: 'var(--bg-light, #ffffff)',
                                    color: 'var(--text-main, #1e293b)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Trip Planner
                            </Link>

                            <Link 
                                to="/booking"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 22px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--border-color, #e2e8f0)',
                                    background: 'var(--bg-light, #ffffff)',
                                    color: 'var(--text-main, #1e293b)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Hotel Search
                            </Link>

                            <Link 
                                to="/packages"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 22px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--border-color, #e2e8f0)',
                                    background: 'var(--bg-light, #ffffff)',
                                    color: 'var(--text-main, #1e293b)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Package Deals
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
