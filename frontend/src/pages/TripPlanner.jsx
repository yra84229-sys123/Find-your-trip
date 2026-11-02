import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroInfoBar from '../components/HeroInfoBar';
import { playBeep } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';
import { provincesData } from '../data/provincesData';

export default function TripPlanner() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark' || theme === 'glass';

    // Wizard Stepper State
    const [activeStep, setActiveStep] = useState(1);

    // Form States
    const [destination, setDestination] = useState('Siem Reap');
    const [checkInDate, setCheckInDate] = useState('2026-11-15');
    const [checkOutDate, setCheckOutDate] = useState('2026-11-19');
    const [adults, setAdults] = useState('2');
    const [children, setChildren] = useState('1');

    // Budget & Preferences
    const [budgetRange, setBudgetRange] = useState('$100 – $200');
    const [hotelType, setHotelType] = useState('4 Star & Above');
    const [activityType, setActivityType] = useState('Temple Tour, Culture, Nature');
    const [transportation, setTransportation] = useState('Private Car');

    // Feedback States
    const [isSaved, setIsSaved] = useState(false);
    const [savedMessage, setSavedMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showBreakdownModal, setShowBreakdownModal] = useState(false);

    // Base destination thumbnails & handcrafted details
    const customDestData = {
        'Siem Reap': {
            image: 'https://asiatravellinks.com/images/attractions/ta-prohm.webp',
            rating: '4.8',
            reviews: '324',
            dayImages: [
                'https://asiatravellinks.com/images/attractions/ta-prohm.webp',
                'https://www.siemreap.net/wp-content/uploads/2019/02/Equinox-at-Angkor-Wat.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfDseZecOZorQu2wlyHAD9qLfoQt2nGsH1IFqn2yuUfb-av2QN5ThEecgX&s=10',
                'https://siemreaphappycycling.tours/wp-content/uploads/2023/05/Siem-Reap-Half-Day-Countryside-Cycling-and-Sunset.jpg'
            ],
            itinerary: [
                {
                    title: 'Arrive & Hotel Check-in',
                    bullets: ['Arrive at Siem Reap Airport', 'Hotel check-in (4 Star Hotel)', 'Evening: Pub Street & Night Market']
                },
                {
                    title: 'Angkor Wat Grand Circuit',
                    bullets: ['Angkor Wat (Sunrise tour)', 'Bayon Temple & Terrace of Elephants', 'Dinner at authentic local restaurant']
                },
                {
                    title: 'Jungle Temples & Cultural Market',
                    bullets: ['Ta Prohm Temple (Tomb Raider)', 'Banteay Srei Temple (Pink Sandstone)', 'Shopping at Old Market & Artisan D\'Angkor']
                },
                {
                    title: 'Leisure & Departure',
                    bullets: ['Free time / Optional countryside cycling', 'Check-out from hotel', 'Return flight or transfer to Phnom Penh']
                }
            ]
        },
        'Phnom Penh': {
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/1b/43/d2/entrance-driveway.jpg?w=900&h=500&s=1',
            rating: '4.6',
            reviews: '210',
            dayImages: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYzIuNDmvpncrusyATjjJ3848owLi4Dx-iDo7R4yrs6EpbdCY-DdwVk4k&s=10',
                'https://www.indochinavoyages.com/wp-content/uploads/2019/06/silver_pagoda_1.jpg',
                'https://justiceinconflict.org/wp-content/uploads/2019/01/cambodia-tuol-sleng-genoc-001.jpg?w=584',
                'https://files.intocambodia.org/content/small/adfb128d97ca55fe045fd0dc2af2c285.jpg'
            ],
            itinerary: [
                {
                    title: 'Capital Arrival & Riverfront',
                    bullets: ['Arrive at Phnom Penh International Airport', 'Hotel check-in & freshen up', 'Sunset stroll along Sisowath Quay']
                },
                {
                    title: 'Royal Heritage & History',
                    bullets: ['Royal Palace & Silver Pagoda tour', 'National Museum of Cambodia', 'Evening Mekong River Sunset Cruise']
                },
                {
                    title: 'Cultural Heritage & Local Life',
                    bullets: ['Tuol Sleng Genocide Museum & Killing Fields', 'Central Market (Phsar Thmey) shopping', 'Fine Khmer dining at Malis Restaurant']
                },
                {
                    title: 'City Exploration & Departure',
                    bullets: ['Wat Phnom historic sanctuary', 'Souvenir hunting at Russian Market', 'Airport departure transfer']
                }
            ]
        },
        'Kampot': {
            image: 'https://www.siemreap.net/wp-content/uploads/2016/08/kampot.jpg',
            rating: '4.5',
            reviews: '156',
            dayImages: [
                'https://www.cambotours.com/userfiles/thumbs/private-sunset-cruise-in-kep-city.jpg',
                'https://www.indochinavoyages.com/wp-content/uploads/2014/09/Bokor-Palace-Hotel-Casino-in-the-French-colonial-period.jpg',
                'https://laplantation.com/wp-content/uploads/2022/11/3-visite-vuedrone.jpg',
                'https://www.mrlinhadventure.com/UserFiles/image/New%20Country%20Guide/Kayaking_Prek-Kampot.jpg'
            ],
            itinerary: [
                {
                    title: 'Riverside Arrival',
                    bullets: ['Scenic drive from Phnom Penh to Kampot', 'Riverside Eco-Resort check-in', 'Evening river cruise with fireflies']
                },
                {
                    title: 'Bokor Mountain National Park',
                    bullets: ['Historic Bokor Hill Station & Cloud Forest', 'Popokvil Waterfall & Old Catholic Church', 'Sunset viewpoint over the Gulf of Thailand']
                },
                {
                    title: 'Pepper Plantations & Caves',
                    bullets: ['La Plantation organic pepper farm tasting', 'Phnom Chhngok Hindu cave temple', 'Fresh crab dinner in nearby Kep']
                },
                {
                    title: 'Morning Kayaking & Departure',
                    bullets: ['Sunrise paddle through the Green Cathedral', 'Check-out & local market visit', 'Private transfer back to Phnom Penh']
                }
            ]
        },
        'Preah Sihanouk': {
            image: 'https://www.hecktictravels.com/wp-content/uploads/2013/12/Sihanoukville.jpg',
            rating: '4.4',
            reviews: '120',
            dayImages: [
                'https://pix10.agoda.net/hotelImages/335/335279/335279_14010515460018005883.jpg?ca=2&ce=1&s=414x232',
                'https://cambotours.com/userfiles/thumbs/snorkeling-tour-at-koh-rong-samloem-island.jpg',
                'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/k4ejw88la9my8juydt2a.jpg',
                'https://pix10.agoda.net/hotelImages/28934651/-1/0e69823b1fab511b7c61d892171695bf.jpg?ce=0&s=414x232'
            ],
            itinerary: [
                {
                    title: 'Coastal Arrival & Beach Check-in',
                    bullets: ['Express highway drive or flight arrival', 'Beachfront resort check-in', 'Sunset cocktail at Otres Beach']
                },
                {
                    title: 'Island Hopping Adventure',
                    bullets: ['Speedboat to Koh Rong Sanloem', 'Snorkeling in clear turquoise lagoons', 'Seafood BBQ on Saracen Bay']
                },
                {
                    title: 'Marine Sports & Leisure',
                    bullets: ['Paddleboarding & coastal relaxation', 'Visit Ream National Park mangroves', 'Seaside beach club evening dinner']
                },
                {
                    title: 'Leisurely Brunch & Departure',
                    bullets: ['Morning beach walk & infinity pool relaxation', 'Resort check-out', 'Transfer to airport or highway transit']
                }
            ]
        },
        'Battambang': {
            image: 'https://cdn.getyourguide.com/image/format=auto%2Cfit=crop%2Cgravity=auto%2Cquality=60%2Cwidth=400%2Cheight=265%2Cdpr=2/tour_img/0b5764cfb111dd034fab8a1e214334dd8f0388344f0918fca195ef2f320c6e47.jpg',
            rating: '4.7',
            reviews: '178',
            dayImages: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdWKKqo0uIweMWAMfwH6rIw86pmQLP_KrLx5DJjF1dki4R6u5j3fD4Zog&s=10',
                'https://ak-d.tripcdn.com/images/1mi2l224x99i1413j322B_Q90.jpg?proc=source/trip',
                'https://www.asiakingtravel.com/cuploads/files/Ek-Phnom-Temple-1.jpg',
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/e3/2d/c3/caption.jpg?w=1100&h=1100&s=1'
            ],
            itinerary: [
                {
                    title: 'Colonial City Arrival',
                    bullets: ['Arrive in Battambang French colonial town', 'Heritage boutique hotel check-in', 'Evening street food and art gallery tour']
                },
                {
                    title: 'Bamboo Train & Bat Caves',
                    bullets: ['Iconic ride on the Norry Bamboo Train', 'Phnom Sampov & Killing Caves', 'Spectacular sunset bat flight phenomenon']
                },
                {
                    title: 'Ancient Temples & Phare Circus',
                    bullets: ['Ek Phnom & Wat Banan temple ruins', 'Local rice paper and fruit craft villages', 'Evening Phare Ponleu Selpak Circus show']
                },
                {
                    title: 'Artisan Heritage & Departure',
                    bullets: ['Morning French architectural walking tour', 'Hotel check-out', 'Scenic transfer back to Siem Reap / Phnom Penh']
                }
            ]
        
    
        },
        'Kep': {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShOdUnhlccPzuVgDLa3CdEznXw0AL4MILv_K4pHsLZW83o7Fb1WiSMshEv&s=10',
            rating: '4.5',
            reviews: '135',
            dayImages: [
                'https://www.youngpioneertours.com/wp-content/uploads/2024/03/417445540_10161445626409078_6685084633569602965_n.jpg',
                'https://pub-cdc692527515432c93070f8e3ad6c005.r2.dev/pack-lightly.com/2025/12/Koh-Rong-Cambodia-1024x683.jpg',
                'https://www.cambotours.com/uploads/kep_national_park.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqwRqxdgmzlcyhRXGj4RcBfBGfEjLUFND6vQsly8zghPEEyjpfn__3-8Ds&s=10'
            ],
            itinerary: [
                {
                    title: 'Coastal Haven Arrival',
                    bullets: ['Scenic coastal drive to Kep Province', 'Check-in to historic boutique villa', 'Famous fresh Kep Crab Market dinner']
                },
                {
                    title: 'Rabbit Island (Koh Tonsay)',
                    bullets: ['Traditional longtail wooden boat ride', 'Relaxation on pristine secluded beaches', 'Fresh ocean seafood grilled on shore']
                },
                {
                    title: 'Kep National Park & Villas',
                    bullets: ['Stirrup Trail mountain viewpoint hike', 'French colonial villa ruins photography', 'Sunset sailing trip along the coast']
                },
                {
                    title: 'Departure & Pepper Market',
                    bullets: ['Morning market pepper shopping', 'Resort check-out & coffee by the sea', 'Transfer to Phnom Penh']
                }
            ]
        }
    };

    // Build complete destination dictionary covering exactly the 25 official provinces
    const destData = useMemo(() => {
        const fullDict = {};

        // Dynamically add all 25 provinces from provincesData in strict order
        if (Array.isArray(provincesData)) {
            provincesData.forEach(p => {
                // Use handcrafted custom data if available (e.g. Siem Reap, Phnom Penh, Kampot, Preah Sihanouk, Battambang, Kep)
                const custom = customDestData[p.name] || (p.name === 'Preah Sihanouk' ? customDestData['Sihanoukville'] : null);
                if (custom) {
                    fullDict[p.name] = custom;
                    return;
                }

                const places = p.places || [];
                const dayImages = places.slice(0, 4).map(pl => pl.img).filter(Boolean);
                if (dayImages.length === 0 && p.coverImg) dayImages.push(p.coverImg);

                fullDict[p.name] = {
                    image: p.coverImg || (places[0] && places[0].img) || 'https://asiatravellinks.com/images/attractions/ta-prohm.webp',
                    rating: '4.7',
                    reviews: '142',
                    dayImages: dayImages.length >= 4 
                        ? dayImages 
                        : [p.coverImg, p.detailImg || p.coverImg, ...(places.map(pl => pl.img))].slice(0, 4),
                    itinerary: [
                        {
                            title: `Arrive in ${p.name} & City Exploration`,
                            bullets: [
                                `Scenic transfer to ${p.name} province and hotel check-in`,
                                places[0] ? `Excursion to ${places[0].name}: ${places[0].desc}` : `Orientation tour of ${p.name}`,
                                'Evening leisure and traditional local cuisine dinner'
                            ]
                        },
                        {
                            title: places[1] ? `${places[1].name} Excursion` : `Natural & Cultural Highlights`,
                            bullets: [
                                places[1] ? `Guided excursion to ${places[1].name}` : `Scenic countryside nature tour`,
                                places[2] ? `Discover ${places[2].name}: ${places[2].desc}` : `Local community and market walk`,
                                'Sunset photography and scenic viewpoints'
                            ]
                        },
                        {
                            title: places[3] ? `${places[3].name} & Heritage` : `Heritage & Nature Discovery`,
                            bullets: [
                                places[3] ? `Morning expedition to ${places[3].name}` : `Morning eco-trail and cultural tour`,
                                places[4] ? `Explore ${places[4].name}: ${places[4].desc}` : `Visit local artisan village`,
                                'Traditional Khmer dinner and relaxation'
                            ]
                        },
                        {
                            title: 'Local Markets & Departure',
                            bullets: [
                                `Morning visit to ${p.name} local markets and souvenir shopping`,
                                'Hotel check-out and departure transfer',
                                'Safe onward journey across Cambodia'
                            ]
                        }
                    ]
                };
            });
        }

        return fullDict;
    }, []);

    // Current destination details
    const activeDestData = destData[destination] || destData['Siem Reap'];

    // Calculate days/nights between dates
    const tripDays = useMemo(() => {
        try {
            const start = new Date(checkInDate);
            const end = new Date(checkOutDate);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 4;
        } catch {
            return 4;
        }
    }, [checkInDate, checkOutDate]);

    // Format Date Range String
    const formattedDates = useMemo(() => {
        try {
            const s = new Date(checkInDate);
            const e = new Date(checkOutDate);
            const sStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const eStr = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return `${sStr} – ${eStr} (${tripDays} days)`;
        } catch {
            return `Nov 15 – Nov 19, 2026 (4 days)`;
        }
    }, [checkInDate, checkOutDate, tripDays]);

    // Dynamic Itinerary Day List
    const daysList = useMemo(() => {
        const list = [];
        const baseItinerary = activeDestData.itinerary || [];
        const start = new Date(checkInDate);

        for (let i = 0; i < tripDays; i++) {
            const curDate = new Date(start);
            curDate.setDate(start.getDate() + i);
            const dateStr = curDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            const itinTemplate = baseItinerary[i % baseItinerary.length] || {
                title: `Explore ${destination}`,
                bullets: [`Morning exploration in ${destination}`, `Guided cultural excursion`, `Evening leisure and dinner`]
            };
            
            const img = activeDestData.dayImages[i % activeDestData.dayImages.length] || activeDestData.image;

            list.push({
                dayNum: i + 1,
                date: dateStr,
                image: img,
                title: itinTemplate.title,
                bullets: itinTemplate.bullets
            });
        }
        return list;
    }, [tripDays, checkInDate, destination, activeDestData]);

    // Cost Calculation
    const costSummary = useMemo(() => {
        const numAdults = parseInt(adults, 10) || 1;
        const numChildren = parseInt(children, 10) || 0;
        const totalPeople = numAdults + numChildren;

        let hotelBase = 65;
        if (hotelType.includes('5 Star')) hotelBase = 140;
        else if (hotelType.includes('4 Star')) hotelBase = 85;
        else if (hotelType.includes('Boutique')) hotelBase = 95;

        let transportDaily = 30;
        if (transportation.includes('VIP')) transportDaily = 55;
        else if (transportation.includes('Tuk-Tuk')) transportDaily = 18;
        else if (transportation.includes('Shared')) transportDaily = 12;

        let activityDaily = 35;
        if (budgetRange.includes('200 – $350') || budgetRange.includes('350')) activityDaily = 55;
        else if (budgetRange.includes('50 – $100')) activityDaily = 20;

        const totalHotel = hotelBase * tripDays;
        const totalTransport = transportDaily * tripDays;
        const totalActivities = activityDaily * tripDays * totalPeople;

        const totalTripCost = totalHotel + totalTransport + totalActivities;
        const perPersonCost = Math.round(totalTripCost / (numAdults + numChildren * 0.5));

        return {
            perPerson: perPersonCost > 0 ? perPersonCost : 520,
            totalTripCost,
            hotelBase,
            transportDaily,
            activityDaily
        };
    }, [adults, children, tripDays, hotelType, transportation, budgetRange]);

    // Handlers
    const handleGenerateItinerary = (e) => {
        if (e) e.preventDefault();
        playBeep(true);
        setIsGenerating(true);
        setActiveStep(2);
        setTimeout(() => {
            setIsGenerating(false);
            const el = document.getElementById('itinerary-preview-card');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 350);
    };

    const handleSaveTrip = () => {
        playBeep(true);
        setIsSaved(true);
        setActiveStep(3);
        setSavedMessage('Trip successfully saved to your itinerary wishlist!');
        setTimeout(() => setSavedMessage(''), 3500);
    };

    const handleSelectPopularDest = (destName) => {
        playBeep(true);
        setDestination(destName);
        setActiveStep(1);
    };

    const handleProceedToBooking = () => {
        playBeep(true);
        localStorage.setItem('pending-booking', JSON.stringify({
            destination,
            package: `${destination} Getaway (${hotelType})`,
            dates: `${checkInDate} to ${checkOutDate}`,
            guests: `${adults} Adults, ${children} Children`,
            totalPrice: costSummary.perPerson * (parseInt(adults, 10) + parseInt(children, 10))
        }));
        navigate('/booking');
    };

    return (
        <div>
            {/* Hero Section */}
            <header id="home" className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title" style={{ color: 'white', textTransform: 'uppercase', fontSize: '4.5rem', lineHeight: '1.2' }}>
                        TRIP PLANNER
                    </h1>
                    <p className="hero-subtitle">
                        Build your personalized dream itinerary across Cambodia with custom dates, hotel choices, transportation, and live cost calculation.
                    </p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            className="btn-primary" 
                            style={{ borderRadius: '30px', background: '#0d6efd', padding: '15px 35px', fontWeight: 'bold' }} 
                            onClick={() => { playBeep(true); document.getElementById('trip-planner-calc')?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            START PLANNING
                        </button>
                    </div>
                </div>

                {/* Features Info Bar */}
                <HeroInfoBar />
            </header>

            {/* Main Planner Section */}
            <section id="trip-planner-calc" style={{ background: 'var(--bg-main)', padding: '50px 0 90px 0' }}>
                <style>{`
                    .planner-wide-container {
                        width: 96%;
                        max-width: 1720px;
                        margin: 0 auto;
                        padding: 0 16px;
                    }
                    /* Clean Sleek Stepper */
                    .clean-stepper-wrap {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: var(--bg-panel, #ffffff);
                        border: 1px solid var(--border-color, #e2e8f0);
                        border-radius: 16px;
                        padding: 12px 24px;
                        margin-bottom: 26px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
                    }
                    .clean-step-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        cursor: pointer;
                        padding: 8px 16px;
                        border-radius: 30px;
                        transition: all 0.25s ease;
                    }
                    .clean-step-item.active {
                        background: rgba(13, 110, 253, 0.1);
                    }
                    .clean-step-badge {
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 700;
                        font-size: 0.85rem;
                        transition: all 0.25s ease;
                    }
                    .clean-step-badge.active {
                        background: #0d6efd;
                        color: white;
                        box-shadow: 0 0 10px rgba(13, 110, 253, 0.4);
                    }
                    .clean-step-badge.inactive {
                        border: 2px solid var(--border-color, #cbd5e1);
                        color: var(--text-muted, #94a3b8);
                        background: transparent;
                    }
                    .clean-step-label {
                        font-size: 0.95rem;
                        font-weight: 600;
                        color: var(--text-main, #1e293b);
                    }
                    .clean-step-item.active .clean-step-label {
                        color: #0d6efd;
                        font-weight: 700;
                    }
                    .clean-step-line {
                        flex: 1;
                        height: 1px;
                        background: var(--border-color, #e2e8f0);
                        margin: 0 16px;
                    }
                    /* Main Grid */
                    .planner-grid-wrapper {
                        display: grid;
                        grid-template-columns: 1.35fr 1fr;
                        gap: 28px;
                        align-items: start;
                    }
                    .clean-card {
                        background: var(--bg-panel, #ffffff);
                        border: 1px solid var(--border-color, #e2e8f0);
                        border-radius: 18px;
                        padding: 32px 34px;
                        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.04);
                    }
                    /* Ultra-Clean Input Fields */
                    .clean-input-box {
                        background: var(--bg-light, #f8fafc);
                        border: 1px solid var(--border-color, #e2e8f0);
                        border-radius: 12px;
                        padding: 12px 16px;
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                        transition: all 0.2s ease;
                        position: relative;
                    }
                    .clean-input-box:focus-within {
                        border-color: #0d6efd !important;
                        box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.12) !important;
                        background: var(--bg-panel, #ffffff) !important;
                    }
                    .clean-input-label {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 0.74rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.6px;
                        color: var(--text-muted, #64748b);
                    }
                    .clean-input-label i {
                        font-size: 0.82rem;
                        color: #0d6efd;
                    }
                    .clean-select-input {
                        width: 100%;
                        border: none;
                        background: transparent;
                        font-size: 0.95rem;
                        font-weight: 600;
                        color: var(--text-main, #1e293b);
                        outline: none;
                        cursor: pointer;
                        padding: 2px 0;
                        color-scheme: light dark;
                    }
                    .clean-select-input option {
                        background-color: var(--bg-panel, #ffffff);
                        color: var(--text-main, #1e293b);
                        padding: 8px;
                    }
                    body.dark-theme .clean-select-input,
                    body.dark-theme .clean-select-input option {
                        color-scheme: dark !important;
                        background-color: #141b2d !important;
                        color: #f8fafc !important;
                    }
                    body.light-theme .clean-select-input,
                    body.light-theme .clean-select-input option {
                        color-scheme: light !important;
                        background-color: #ffffff !important;
                        color: #1e293b !important;
                    }
                    .clean-date-input {
                        border: none;
                        background: transparent;
                        font-size: 0.92rem;
                        font-weight: 600;
                        color: var(--text-main, #1e293b);
                        outline: none;
                        cursor: pointer;
                        width: 100%;
                        padding: 2px 0;
                    }
                    .custom-date-picker::-webkit-calendar-picker-indicator {
                        cursor: pointer !important;
                        filter: invert(1) brightness(2) !important;
                        opacity: 0.95 !important;
                    }
                    body.light-theme .custom-date-picker::-webkit-calendar-picker-indicator {
                        filter: none !important;
                        opacity: 0.75 !important;
                    }
                    /* Timeline Polish */
                    .timeline-node-clean {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: #0d6efd;
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 700;
                        font-size: 0.85rem;
                        flex-shrink: 0;
                        box-shadow: 0 0 12px rgba(13, 110, 253, 0.4);
                        z-index: 2;
                    }
                    .timeline-line-clean {
                        position: absolute;
                        left: 14px;
                        top: 30px;
                        bottom: -18px;
                        width: 2px;
                        background: rgba(13, 110, 253, 0.2);
                        z-index: 1;
                    }
                    .itinerary-day-box {
                        background: var(--bg-light, #f8fafc);
                        border: 1px solid var(--border-color, #e2e8f0);
                        border-radius: 14px;
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        gap: 18px;
                        flex: 1;
                        transition: all 0.25s ease;
                    }
                    .itinerary-day-box:hover {
                        border-color: #0d6efd;
                        background: var(--bg-panel, #ffffff);
                        transform: translateX(4px);
                        box-shadow: 0 4px 15px rgba(13, 110, 253, 0.08);
                    }
                    .popular-card-clean {
                        background: var(--bg-light, #f8fafc);
                        border: 1px solid var(--border-color, #e2e8f0);
                        border-radius: 14px;
                        overflow: hidden;
                        cursor: pointer;
                        transition: all 0.25s ease;
                        display: flex;
                        flex-direction: column;
                    }
                    .popular-card-clean:hover {
                        border-color: #0d6efd;
                        transform: translateY(-4px);
                        box-shadow: 0 12px 25px rgba(13, 110, 253, 0.12);
                    }
                    @media (max-width: 1200px) {
                        .planner-grid-wrapper {
                            grid-template-columns: 1fr;
                        }
                        .clean-stepper-wrap {
                            padding: 12px 16px;
                        }
                    }
                `}</style>
                <div className="planner-wide-container">

                    {/* Top Wizard Stepper */}
                    <div className="clean-stepper-wrap">
                        <div className={`clean-step-item ${activeStep === 1 ? 'active' : ''}`} onClick={() => setActiveStep(1)}>
                            <div className={`clean-step-badge ${activeStep >= 1 ? 'active' : 'inactive'}`}>1</div>
                            <span className="clean-step-label">Plan Your Trip</span>
                        </div>
                        <div className="clean-step-line"></div>
                        <div className={`clean-step-item ${activeStep === 2 ? 'active' : ''}`} onClick={() => setActiveStep(2)}>
                            <div className={`clean-step-badge ${activeStep >= 2 ? 'active' : 'inactive'}`}>2</div>
                            <span className="clean-step-label">Get Itinerary</span>
                        </div>
                        <div className="clean-step-line"></div>
                        <div className={`clean-step-item ${activeStep === 3 ? 'active' : ''}`} onClick={() => setActiveStep(3)}>
                            <div className={`clean-step-badge ${activeStep >= 3 ? 'active' : 'inactive'}`}>3</div>
                            <span className="clean-step-label">Save & Book</span>
                        </div>
                    </div>

                    {/* Saved notification banner */}
                    {savedMessage && (
                        <div style={{
                            padding: '14px 22px',
                            background: 'rgba(0, 166, 153, 0.12)',
                            border: '1px solid #00a699',
                            color: '#00a699',
                            borderRadius: '12px',
                            marginBottom: '24px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '0.95rem'
                        }}>
                            {savedMessage}
                        </div>
                    )}

                    {/* Main Two-Column Layout */}
                    <div className="planner-grid-wrapper">

                        {/* LEFT COLUMN */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>

                            {/* Card 1: Main Planning Form */}
                            <div className="clean-card">
                                
                                {/* Section 1: Trip Details */}
                                <div style={{ marginBottom: '32px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                                1. Trip Details
                                            </h3>
                                            <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted, #64748b)' }}>
                                                Tell us your travel preferences
                                            </p>
                                        </div>
                                    </div>

                                    {/* Clean Trip Details Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        
                                        {/* Destination */}
                                        <div className="clean-input-box">
                                            <div className="clean-input-label">
                                                <span>Destination</span>
                                            </div>
                                            <select 
                                                value={destination}
                                                onChange={(e) => { playBeep(true); setDestination(e.target.value); }}
                                                className="clean-select-input"
                                            >
                                                {Object.keys(destData).map(d => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Travelers */}
                                        <div className="clean-input-box">
                                            <div className="clean-input-label">
                                                <span>Travelers</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <select 
                                                        value={adults}
                                                        onChange={(e) => setAdults(e.target.value)}
                                                        className="clean-select-input"
                                                    >
                                                        <option value="1">1 Adult</option>
                                                        <option value="2">2 Adults</option>
                                                        <option value="3">3 Adults</option>
                                                        <option value="4">4 Adults</option>
                                                        <option value="5">5+ Adults</option>
                                                    </select>
                                                </div>
                                                <div style={{ width: '1px', height: '22px', background: 'var(--border-color, #e2e8f0)' }}></div>
                                                <div style={{ flex: 1 }}>
                                                    <select 
                                                        value={children}
                                                        onChange={(e) => setChildren(e.target.value)}
                                                        className="clean-select-input"
                                                    >
                                                        <option value="0">0 Children</option>
                                                        <option value="1">1 Child</option>
                                                        <option value="2">2 Children</option>
                                                        <option value="3">3 Children</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Check-In Date */}
                                        <div className="clean-input-box">
                                            <div className="clean-input-label">
                                                <span>Check-In Date</span>
                                            </div>
                                            <input 
                                                type="date"
                                                value={checkInDate}
                                                onChange={(e) => setCheckInDate(e.target.value)}
                                                className="clean-date-input custom-date-picker"
                                            />
                                        </div>

                                        {/* Check-Out Date */}
                                        <div className="clean-input-box">
                                            <div className="clean-input-label">
                                                <span>Check-Out Date ({tripDays} Days)</span>
                                            </div>
                                            <input 
                                                type="date"
                                                value={checkOutDate}
                                                onChange={(e) => setCheckOutDate(e.target.value)}
                                                className="clean-date-input custom-date-picker"
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Section 2: Budget & Preferences (Symmetrical 2x2 Grid) */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                                2. Budget & Preferences
                                            </h3>
                                            <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted, #64748b)' }}>
                                                Help us find the best options for you
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2x2 Spacious Symmetrical Grid */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '16px',
                                        marginBottom: '28px'
                                     }}>
                                        
                                        {/* Budget */}
                                        <div className="clean-input-box">
                                            <div className="clean-input-label">
                                                <span>Budget (per person)</span>
                                            </div>
                                            <select 
                                                value={budgetRange}
                                                onChange={(e) => setBudgetRange(e.target.value)}
                                                className="clean-select-input"
                                            >
                                                <option value="$50 – $100">$50 – $100 (Budget Friendly)</option>
                                                <option value="$100 – $200">$100 – $200 (Standard Comfort)</option>
                                                <option value="$200 – $350">$200 – $350 (Premium Experience)</option>
                                                <option value="$350+">$350+ (Luxury VIP)</option>
                                            </select>
                                        </div>

                                        {/* Hotel Type */}
                                        <div className="clean-input-box">
                                            <div className="clean-input-label">
                                                <span>Hotel Type</span>
                                            </div>
                                            <select 
                                                value={hotelType}
                                                onChange={(e) => setHotelType(e.target.value)}
                                                className="clean-select-input"
                                            >
                                                <option value="3 Star Standard">3 Star Standard Hotel</option>
                                                <option value="4 Star & Above">4 Star & Above (Recommended)</option>
                                                <option value="5 Star Luxury Resort">5 Star Luxury Resort</option>
                                                <option value="Eco Lodge / Boutique">Eco Lodge / Boutique Villa</option>
                                            </select>
                                        </div>

                                        {/* Activities */}
                                        <div className="clean-input-box">
                                            <div className="clean-input-label">
                                                <span>Activities</span>
                                            </div>
                                            <select 
                                                value={activityType}
                                                onChange={(e) => setActivityType(e.target.value)}
                                                className="clean-select-input"
                                            >
                                                <option value="Temple Tour, Culture, Nature">Temple Tour, Culture & Nature</option>
                                                <option value="Beach & Relaxation">Beach & Tropical Relaxation</option>
                                                <option value="Adventure & Eco-trekking">Adventure & Eco-trekking</option>
                                                <option value="City Sightseeing & Food">City Sightseeing & Food Tour</option>
                                            </select>
                                        </div>

                                        {/* Transportation */}
                                        <div className="clean-input-box">
                                            <div className="clean-input-label">
                                                <span>Transportation</span>
                                            </div>
                                            <select 
                                                value={transportation}
                                                onChange={(e) => setTransportation(e.target.value)}
                                                className="clean-select-input"
                                            >
                                                <option value="Private Car">Private Car (Air-conditioned)</option>
                                                <option value="VIP Luxury Minivan">VIP Luxury Minivan</option>
                                                <option value="Tuk-Tuk & Local Driver">Tuk-Tuk & Local Driver</option>
                                                <option value="Shared Bus / Self">Shared Bus / Self-Arranged</option>
                                            </select>
                                        </div>

                                    </div>

                                    {/* Action Button: Generate My Itinerary */}
                                    <button 
                                        type="button"
                                        onClick={handleGenerateItinerary}
                                        style={{
                                            width: '100%',
                                            padding: '17px',
                                            borderRadius: '14px',
                                            background: 'linear-gradient(135deg, #0d6efd 0%, #0056b3 100%)',
                                            color: 'white',
                                            border: 'none',
                                            fontSize: '1.05rem',
                                            fontWeight: 700,
                                            letterSpacing: '0.4px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            boxShadow: '0 6px 20px rgba(13, 110, 253, 0.35)',
                                            transition: 'all 0.25s ease'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(13, 110, 253, 0.45)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.35)'; }}
                                    >
                                        {isGenerating ? 'Generating Itinerary...' : 'Generate My Itinerary'}
                                    </button>

                                </div>
                            </div>

                            {/* Card 2: Popular Destinations */}
                            <div className="clean-card">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '1.12rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                                Popular Destinations
                                            </h4>
                                            <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
                                                You can also choose from our top destinations
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => { playBeep(true); navigate('/destinations'); }}
                                        style={{ background: 'transparent', border: 'none', color: '#0d6efd', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                                    >
                                        View All Destinations →
                                    </button>
                                </div>

                                {/* 4 Clean Destination Cards Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                                    {[
                                        { name: 'Siem Reap', img: destData['Siem Reap'].image, rating: '4.8', reviews: '324' },
                                        { name: 'Phnom Penh', img: destData['Phnom Penh'].image, rating: '4.6', reviews: '210' },
                                        { name: 'Kampot', img: destData['Kampot'].image, rating: '4.5', reviews: '156' },
                                        { name: 'Preah Sihanouk', img: (destData['Preah Sihanouk'] || destData['Siem Reap']).image, rating: '4.4', reviews: '120' }
                                    ].map(item => (
                                        <div 
                                            key={item.name}
                                            className="popular-card-clean"
                                            onClick={() => handleSelectPopularDest(item.name)}
                                            style={{
                                                border: destination === item.name ? '2px solid #0d6efd' : '1px solid var(--border-color, #e2e8f0)',
                                                boxShadow: destination === item.name ? '0 0 0 3px rgba(13, 110, 253, 0.18)' : 'none'
                                            }}
                                        >
                                            <div style={{ height: '105px', overflow: 'hidden', position: 'relative' }}>
                                                <img 
                                                    src={item.img} 
                                                    alt={item.name} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                />
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    background: 'rgba(0, 0, 0, 0.65)',
                                                    backdropFilter: 'blur(6px)',
                                                    borderRadius: '20px',
                                                    padding: '3px 8px',
                                                    fontSize: '0.72rem',
                                                    fontWeight: 700,
                                                    color: '#fbbf24',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}>
                                                    ★ {item.rating}
                                                </div>
                                            </div>
                                            <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main, #1e293b)' }}>
                                                        {item.name}
                                                    </div>
                                                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted, #64748b)' }}>
                                                        {item.reviews} reviews
                                                    </span>
                                                </div>
                                                <div style={{
                                                    width: '26px',
                                                    height: '26px',
                                                    borderRadius: '50%',
                                                    background: destination === item.name ? '#0d6efd' : 'rgba(13, 110, 253, 0.08)',
                                                    color: destination === item.name ? 'white' : '#0d6efd',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.85rem'
                                                }}>
                                                    →
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 3: Need help planning? */}
                            <div className="clean-card" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '22px 28px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                            Need help planning?
                                        </h4>
                                        <p style={{ margin: '3px 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted, #64748b)' }}>
                                            Our travel experts are here to help you create the perfect trip.
                                        </p>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => { playBeep(true); navigate('/contact'); }}
                                    style={{
                                        padding: '11px 22px',
                                        borderRadius: '30px',
                                        border: '1px solid #0d6efd',
                                        background: 'transparent',
                                        color: '#0d6efd',
                                        fontWeight: 600,
                                        fontSize: '0.88rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#0d6efd'; e.currentTarget.style.color = 'white'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0d6efd'; }}
                                >
                                    Contact Us
                                </button>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Itinerary & Cost Summary */}
                        <div id="itinerary-preview-card" style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                            
                            {/* Card: Your Trip Itinerary Header + Preview */}
                            <div className="clean-card">
                                
                                {/* Header Bar */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                            Your Trip Itinerary
                                        </h3>
                                    </div>

                                    <button 
                                        type="button"
                                        onClick={handleSaveTrip}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '9px 18px',
                                            borderRadius: '10px',
                                            border: '1px solid var(--border-color, #e2e8f0)',
                                            background: isSaved ? 'rgba(0, 166, 153, 0.12)' : 'var(--bg-light, #ffffff)',
                                            color: isSaved ? '#00a699' : '#0d6efd',
                                            fontWeight: 600,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {isSaved ? 'Saved' : 'Save Trip'}
                                    </button>
                                </div>

                                {/* Destination Summary Thumbnail Card */}
                                <div style={{
                                    display: 'flex',
                                    gap: '18px',
                                    background: 'var(--bg-light, #f8fafc)',
                                    borderRadius: '14px',
                                    padding: '14px',
                                    border: '1px solid var(--border-color, #e2e8f0)',
                                    marginBottom: '26px'
                                }}>
                                    <div style={{ width: '135px', height: '100px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                                        <img 
                                            src={activeDestData.image} 
                                            alt={destination} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px' }}>
                                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main, #1e293b)' }}>
                                            {destination} Getaway
                                        </h4>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {destination}, Cambodia
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {formattedDates}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {adults} Adults {parseInt(children, 10) > 0 ? `+ ${children} Child` : ''}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#0d6efd', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            Budget: {budgetRange}/person
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical Timeline Day Cards */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative' }}>
                                    {daysList.map((dayItem, idx) => (
                                        <div key={dayItem.dayNum} style={{ display: 'flex', alignItems: 'stretch', gap: '18px', position: 'relative' }}>
                                            {/* Node Circle */}
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '30px' }}>
                                                <div className="timeline-node-clean">
                                                    {dayItem.dayNum}
                                                </div>
                                                {idx < daysList.length - 1 && <div className="timeline-line-clean"></div>}
                                            </div>

                                            {/* Content Card */}
                                            <div className="itinerary-day-box">
                                                <div style={{ width: '90px', height: '70px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                                                    <img 
                                                        src={dayItem.image} 
                                                        alt={`Day ${dayItem.dayNum}`} 
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                                                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0d6efd' }}>
                                                             Day {dayItem.dayNum}
                                                        </span>
                                                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)' }}>
                                                            {dayItem.date}
                                                        </span>
                                                    </div>
                                                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: 'var(--text-main, #1e293b)', lineHeight: '1.45' }}>
                                                        {dayItem.bullets.map((b, bIdx) => (
                                                            <li key={bIdx} style={{ marginBottom: '2px' }}>{b}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Card: Estimated Cost Card */}
                            <div className="clean-card">
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted, #64748b)', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                                                Estimated Cost
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                            <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#0d6efd', lineHeight: 1 }}>
                                                ${costSummary.perPerson}
                                            </span>
                                            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted, #64748b)' }}>
                                                / person
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <button 
                                            onClick={() => setShowBreakdownModal(!showBreakdownModal)}
                                            style={{ background: 'transparent', border: 'none', color: '#0d6efd', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                                        >
                                            {showBreakdownModal ? 'Hide Details ↑' : 'View Details →'}
                                        </button>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main, #1e293b)' }}>
                                                <span style={{ color: '#00a699', fontWeight: 'bold' }}>✓</span>
                                                Hotel ({hotelType})
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main, #1e293b)' }}>
                                                <span style={{ color: '#00a699', fontWeight: 'bold' }}>✓</span>
                                                Daily activities
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main, #1e293b)' }}>
                                                <span style={{ color: '#00a699', fontWeight: 'bold' }}>✓</span>
                                                Private transportation
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main, #1e293b)' }}>
                                                <span style={{ color: '#00a699', fontWeight: 'bold' }}>✓</span>
                                                Breakfast included
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {showBreakdownModal && (
                                    <div style={{
                                        background: 'var(--bg-light, #f8fafc)',
                                        border: '1px solid var(--border-color, #e2e8f0)',
                                        borderRadius: '10px',
                                        padding: '14px 18px',
                                        fontSize: '0.82rem',
                                        color: 'var(--text-muted, #64748b)',
                                        marginBottom: '18px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span>Accommodations ({tripDays} nights):</span>
                                            <strong style={{ color: 'var(--text-main, #1e293b)' }}>${costSummary.hotelBase * tripDays}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span>Transportation ({transportation}):</span>
                                            <strong style={{ color: 'var(--text-main, #1e293b)' }}>${costSummary.transportDaily * tripDays}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Activities & Guide:</span>
                                            <strong style={{ color: 'var(--text-main, #1e293b)' }}>${costSummary.activityDaily * tripDays * (parseInt(adults, 10) + parseInt(children, 10))}</strong>
                                        </div>
                                    </div>
                                )}

                                {/* Proceed to Booking Button */}
                                <button 
                                    type="button"
                                    onClick={handleProceedToBooking}
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #0d6efd, #0b5ed7)',
                                        color: 'white',
                                        border: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        boxShadow: '0 4px 15px rgba(13, 110, 253, 0.28)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    Book This Itinerary
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}
