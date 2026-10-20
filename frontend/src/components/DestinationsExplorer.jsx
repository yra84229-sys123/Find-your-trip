import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { provincesData } from '../data/provincesData';
import PlaceModal from './PlaceModal';

export const PROVINCE_METADATA = {
    'siem-reap': {
        subLabel: 'Angkor Wat, Temples, Culture',
        tags: 'Temples • Culture • History • Adventure',
        about: 'Siem Reap is the gateway to the Angkor Archaeological Park, home to the world-famous Angkor Wat and many ancient temples. It\'s also a vibrant city with local markets, delicious food, and a rich culture.',
        attractionsSummary: 'Angkor Wat, Bayon Temple, Ta Prohm, Pub Street',
        hotelsSummary: 'Luxury, Mid-range, Budget ($25 - $250/night)',
        restaurantsSummary: 'Khmer food, International, Street food',
        activitiesSummary: 'Temple tours, Quad biking, Cooking class, Floating village',
        transportationSummary: 'Tuk tuk, Taxi, Bus, Car rental',
        estimatedCosts: '$30 – $100 / day (per person)',
        bestTime: 'Nov – Mar (dry season)',
        travelTips: 'Wear comfortable clothes, bring sunscreen, stay hydrated',
        hotels: [
            { name: 'Jaya House River Park', rating: 4.9, price: '$180/night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', desc: '5-star eco-luxury by the river' },
            { name: 'Heritage Suites Hotel', rating: 4.7, price: '$95/night', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80', desc: 'Colonial style with tropical gardens' },
            { name: 'Lub d Cambodia Siem Reap', rating: 4.6, price: '$35/night', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', desc: 'Social vibe with swim-up bar' }
        ],
        restaurants: [
            { name: 'Cuisine Wat Damnak', type: 'Fine Dining Khmer', price: '$$$', dish: 'Cambodian degustation menus' },
            { name: 'Haven Training Restaurant', type: 'Asian Fusion & Swiss', price: '$$', dish: 'Crispy fish with green mango' },
            { name: 'Pub Street Night Market', type: 'Street Food & BBQ', price: '$', dish: 'Fried noodles, spring rolls, skewers' }
        ],
        activities: [
            { title: 'Angkor Sunrise Guided Tour', duration: 'Full Day', price: '$45', tag: 'Most Popular' },
            { title: 'Tonle Sap Floating Village Boat', duration: 'Half Day', price: '$28', tag: 'Cultural' },
            { title: 'Phnom Kulen Waterfall Trek', duration: 'Full Day', price: '$55', tag: 'Nature & Adventure' }
        ]
    },
    'phnom-penh': {
        subLabel: 'Royal Palace, Museums, Riverside',
        tags: 'Capital • History • Riverside • Cuisine',
        about: 'Phnom Penh, Cambodia\'s bustling capital, blends ancient Khmer tradition with French colonial charm and modern riverside energy along the junction of the Mekong and Tonle Sap rivers.',
        attractionsSummary: 'Royal Palace, Silver Pagoda, National Museum, Wat Phnom',
        hotelsSummary: 'Boutique riverside, 5-star luxury, budget stays ($20 - $220/night)',
        restaurantsSummary: 'Royal Khmer cuisine, French bistros, Night markets',
        activitiesSummary: 'Sunset river cruises, historical walking tours, cooking classes',
        transportationSummary: 'Grab PassApp, Tuk tuk, Metered taxi',
        estimatedCosts: '$35 – $110 / day (per person)',
        bestTime: 'Nov – Feb (cooler dry period)',
        travelTips: 'Use PassApp or Grab for fair tuk-tuk prices, dress modestly for temples',
        hotels: [
            { name: 'Rosewood Phnom Penh', rating: 4.9, price: '$260/night', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80', desc: 'Ultra-luxury high-rise overlooking the city' },
            { name: 'Palace Gate Hotel & Resort', rating: 4.8, price: '$110/night', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80', desc: 'Colonial luxury next to the Royal Palace' },
            { name: 'The Plantation Urban Resort', rating: 4.6, price: '$65/night', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=400&q=80', desc: 'Oasis resort with two swimming pools' }
        ],
        restaurants: [
            { name: 'Malis Restaurant', type: 'Living Cambodian Cuisine', price: '$$$', dish: 'Baked goby fish & kampot crab' },
            { name: 'Romdeng', type: 'Creative Khmer & Tapas', price: '$$', dish: 'Tarantula crispies & beef lok lak' },
            { name: 'Riverside Food Stalls', type: 'Street Eats', price: '$', dish: 'Grilled meats & coconut pancakes' }
        ],
        activities: [
            { title: 'Royal Palace & National Museum Tour', duration: 'Half Day', price: '$35', tag: 'History' },
            { title: 'Mekong Sunset Cruise with Dinner', duration: '2 Hours', price: '$25', tag: 'Scenic' },
            { title: 'Street Food Night Tuk-Tuk Safari', duration: '3.5 Hours', price: '$40', tag: 'Foodie' }
        ]
    },
    'kampot': {
        subLabel: 'River, Pepper Farms, Nature',
        tags: 'Riverside • Mountains • Pepper Farms • Kayaking',
        about: 'Kampot is celebrated for its laid-back riverfront atmosphere, world-renowned Kampot pepper farms, French colonial architecture, and the mist-shrouded peaks of Bokor National Park.',
        attractionsSummary: 'Bokor Hill Station, Pepper Plantations, Green Cathedral, Teuk Chhou',
        hotelsSummary: 'River bungalows, eco-lodges, boutique resorts ($15 - $120/night)',
        restaurantsSummary: 'Pepper-seasoned crab, artisan bakeries, organic cafes',
        activitiesSummary: 'River kayaking, pepper plantation tastings, Bokor mountain drive',
        transportationSummary: 'Motorbike rental, Tuk tuk, Bicycle',
        estimatedCosts: '$25 – $70 / day (per person)',
        bestTime: 'Oct – Apr (pleasant breeze)',
        travelTips: 'Rent a scooter to explore Bokor Mountain and rural pepper farms',
        hotels: [
            { name: 'Champa Lodge', rating: 4.8, price: '$75/night', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', desc: 'Traditional wooden houses by the river' },
            { name: 'Sabay Beach Resort', rating: 4.7, price: '$55/night', img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=400&q=80', desc: 'Treehouses overlooking Green Cathedral' },
            { name: 'The Columns Kampot', rating: 4.5, price: '$35/night', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80', desc: 'Charming French colonial townhouse' }
        ],
        restaurants: [
            { name: 'Atelier Kampot', type: 'French Khmer Bistro', price: '$$', dish: 'Fresh Kampot pepper steak' },
            { name: 'La Plantation Restaurant', type: 'Organic Farm Cuisine', price: '$$', dish: 'Signature pepper-infused specialties' },
            { name: 'Rusty Keyhole', type: 'Pub & Smokehouse', price: '$', dish: 'Famous BBQ ribs & cold craft beer' }
        ],
        activities: [
            { title: 'La Plantation Organic Pepper Tour', duration: 'Half Day', price: '$20', tag: 'Gastronomy' },
            { title: 'Green Cathedral River Kayak Tour', duration: '3 Hours', price: '$15', tag: 'Adventure' },
            { title: 'Preah Monivong Bokor National Park', duration: 'Full Day', price: '$38', tag: 'Scenic View' }
        ]
    },
    'battambang': {
        subLabel: 'Art, Rice Fields, Local Life',
        tags: 'Art • Colonial • Bamboo Train • Caves',
        about: 'Battambang is Cambodia\'s creative capital, famed for preserved French colonial mansions, thriving contemporary art galleries, lush rice paddies, and the legendary Bamboo Train.',
        attractionsSummary: 'Bamboo Train (Norry), Phnom Sampeau Bat Caves, Wat Banan, Ek Phnom',
        hotelsSummary: 'Art boutiques, heritage villas, family homestays ($15 - $80/night)',
        restaurantsSummary: 'Battambang-style noodles, street food, French bistros',
        activitiesSummary: 'Bat cave evening spectacle, bamboo train rides, rural cycle tours',
        transportationSummary: 'Tuk tuk, bicycle, motorbike rental',
        estimatedCosts: '$20 – $60 / day (per person)',
        bestTime: 'Nov – Feb (cool and clear)',
        travelTips: 'Arrive at Phnom Sampeau around 5:30 PM to watch millions of bats exit the caves',
        hotels: [
            { name: 'Bambu Hotel Battambang', rating: 4.8, price: '$68/night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', desc: 'Boutique hotel with classic colonial pool' },
            { name: 'Maisons Wat Kor', rating: 4.7, price: '$60/night', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80', desc: 'Traditional Khmer wooden houses' },
            { name: 'Classy Hotel & Spa', rating: 4.4, price: '$32/night', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', desc: 'Central stay with panoramic rooftop' }
        ],
        restaurants: [
            { name: 'Jaan Bai Restaurant', type: 'Social Enterprise Dining', price: '$$', dish: 'Banana flower salad & duck curry' },
            { name: 'White Rose Restaurant', type: 'Classic Khmer & Western', price: '$', dish: 'Fresh tropical fruit shakes & amok' },
            { name: 'Nary Kitchen', type: 'Home Kitchen & Classes', price: '$', dish: 'Authentic lok lak & spring rolls' }
        ],
        activities: [
            { title: 'Classic Bamboo Train Experience', duration: '2 Hours', price: '$10', tag: 'Iconic' },
            { title: 'Phnom Sampeau Bat Cave Sunset', duration: '3 Hours', price: '$18', tag: 'Nature Spectacle' },
            { title: 'Rural Village Cycling Expedition', duration: 'Half Day', price: '$22', tag: 'Local Culture' }
        ]
    },
    'preah-sihanouk': {
        subLabel: 'Beaches, Islands, Relax',
        tags: 'Islands • White Sand • Diving • Sunset',
        about: 'Preah Sihanouk and its outlying islands like Koh Rong and Koh Rong Sanloem are Cambodia’s premier beach paradises, featuring crystal-clear waters, bioluminescent plankton, and white sand shores.',
        attractionsSummary: 'Koh Rong, Koh Rong Sanloem, Otres Beach, Ream National Park',
        hotelsSummary: 'Island beach bungalows, 5-star private island resorts ($25 - $400/night)',
        restaurantsSummary: 'Fresh seafood BBQ, beachfront bars, Italian & Khmer grills',
        activitiesSummary: 'Island hopping, scuba diving, glowing plankton boat tours',
        transportationSummary: 'Speed ferries, Tuk tuk, Island water taxis',
        estimatedCosts: '$35 – $130 / day (per person)',
        bestTime: 'Nov – May (calm seas and sunshine)',
        travelTips: 'Take the fast ferry from Sihanoukville port to Koh Rong or Koh Rong Sanloem',
        hotels: [
            { name: 'The Royal Sands Koh Rong', rating: 4.9, price: '$380/night', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', desc: 'Ultra-luxurious private beachfront villas' },
            { name: 'Sara Resort Koh Rong Sanloem', rating: 4.7, price: '$85/night', img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=400&q=80', desc: 'Direct access to Saracen Bay turquoise waters' },
            { name: 'Sok San Beach Resort', rating: 4.6, price: '$70/night', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80', desc: 'Pristine white sand stretches on Koh Rong' }
        ],
        restaurants: [
            { name: 'Treehouse Bungalow Restaurant', type: 'Island Seafood', price: '$$', dish: 'Wood-fired pizzas & grilled squid' },
            { name: 'Enso Cafe', type: 'Beachfront Healthy Eats', price: '$$', dish: 'Smoothie bowls & iced coconut coffee' },
            { name: 'Otres Night Market', type: 'Street Market & Live Music', price: '$', dish: 'BBQ skewers & fresh oysters' }
        ],
        activities: [
            { title: 'Bioluminescent Plankton Night Snorkel', duration: '2 Hours', price: '$20', tag: 'Magical' },
            { title: 'Koh Rong 3-Island Snorkel Cruise', duration: 'Full Day', price: '$35', tag: 'Water Fun' },
            { title: 'Ream National Park Mangrove Boat', duration: 'Half Day', price: '$30', tag: 'Wildlife' }
        ]
    },
    'kep': {
        subLabel: 'Crab, Beach, Island',
        tags: 'Crab Market • National Park • Rabbit Island',
        about: 'Kep is a serene coastal gem renowned across Southeast Asia for its vibrant Crab Market, fragrant green pepper seafood stir-fries, and peaceful retro-colonial atmosphere.',
        attractionsSummary: 'Kep Crab Market, Kep National Park, Rabbit Island (Koh Tonsay), Kep Beach',
        hotelsSummary: 'Boutique hill villas, eco-bungalows, coastal retreats ($25 - $150/night)',
        restaurantsSummary: 'Fresh blue crab stir-fried with green Kampot pepper',
        activitiesSummary: 'Crab feast dining, Rabbit Island boat day-trip, jungle trail hikes',
        transportationSummary: 'Bicycle, Tuk tuk, Walking',
        estimatedCosts: '$25 – $75 / day (per person)',
        bestTime: 'Nov – Apr (warm sunny days)',
        travelTips: 'Order blue swimmer crab cooked on the spot at the Crab Market seaside wooden huts',
        hotels: [
            { name: 'Knai Bang Chatt Resort', rating: 4.9, price: '$190/night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', desc: 'Minimalist modernist coastal haven' },
            { name: 'Veranda Natural Resort', rating: 4.7, price: '$75/night', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80', desc: 'Hillside retreat nestled in Kep National Park' },
            { name: 'Samanea Beach Resort', rating: 4.6, price: '$90/night', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', desc: 'Private pier and lush mangrove coastline' }
        ],
        restaurants: [
            { name: 'Holy Crab Restaurant', type: 'Seaside Seafood', price: '$$', dish: 'Signature Kep crab with fresh peppercorns' },
            { name: 'The Sailing Club', type: 'Sunset Cocktails & Mediterranean', price: '$$$', dish: 'Sunset tapas & grilled sea bass' },
            { name: 'Crab Market Fresh Stalls', type: 'Local Market Seafood', price: '$', dish: 'Steamed live crabs & spicy lime dip' }
        ],
        activities: [
            { title: 'Rabbit Island (Koh Tonsay) Day Trip', duration: 'Full Day', price: '$15', tag: 'Island Retreat' },
            { title: 'Kep National Park Stairway to Heaven Trail', duration: '3 Hours', price: '$5', tag: 'Hiking' },
            { title: 'Sunset Catamaran Sailing Cruise', duration: '2 Hours', price: '$35', tag: 'Romantic' }
        ]
    },
    'mondulkiri': {
        subLabel: 'Nature, Elephant, Waterfall',
        tags: 'Elephants • Waterfalls • Pine Hills • Cool Breeze',
        about: 'Mondulkiri is Cambodia\'s wild frontier, known for rolling green hills, cooler mountain breezes, ethical elephant sanctuaries, and thundering jungle waterfalls.',
        attractionsSummary: 'Bou Sra Waterfall, Elephant Valley Project, Sen Monorom, Pine Tree Ridge',
        hotelsSummary: 'Hilltop lodges, eco-glamping, cozy guest cottages ($18 - $90/night)',
        restaurantsSummary: 'Indigenous Bunong herbal dishes, mountain BBQ, Khmer soups',
        activitiesSummary: 'Ethical elephant walking, waterfall swimming, coffee plantation visits',
        transportationSummary: 'Motorbike rental, 4WD taxi, Local guide',
        estimatedCosts: '$30 – $80 / day (per person)',
        bestTime: 'Oct – Feb (lush green hills & waterfalls)',
        travelTips: 'Pack a light jacket as evening temperatures in Sen Monorom get pleasantly cool',
        hotels: [
            { name: 'Nature Lodge Mondulkiri', rating: 4.7, price: '$35/night', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', desc: 'Rustic cabins spread across gentle green pastures' },
            { name: 'Mayura Hill Resort', rating: 4.6, price: '$65/night', img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=400&q=80', desc: 'Boutique villas with infinity hill views' },
            { name: 'Pidoma Resort', rating: 4.5, price: '$50/night', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80', desc: 'Hillside bungalows with misty sunrises' }
        ],
        restaurants: [
            { name: 'Cinnamon Cafe & Bakery', type: 'Western & Khmer', price: '$', dish: 'Fresh carrot cake & local Mondulkiri coffee' },
            { name: 'Mondulkiri Pizza House', type: 'Italian & Fusion', price: '$$', dish: 'Wood-fired pizzas & herb chicken' },
            { name: 'Bunong Kitchen Community', type: 'Indigenous Heritage', price: '$', dish: 'Bamboo soup & jungle vegetable stir-fry' }
        ],
        activities: [
            { title: 'Elephant Valley Ethical Sanctuary Walk', duration: 'Full Day', price: '$65', tag: 'Unforgettable' },
            { title: 'Bou Sra Twin Cascades Waterfall', duration: 'Half Day', price: '$20', tag: 'Nature Wonder' },
            { title: 'Mondulkiri High Altitude Coffee Tour', duration: '2 Hours', price: '$12', tag: 'Local Craft' }
        ]
    },
    'ratanakiri': {
        subLabel: 'Waterfalls, Ethnic Culture, Crater Lake',
        tags: 'Yeak Laom • Crater Lake • Waterfalls • Red Earth',
        about: 'Ratanakiri is legendary for its crystal-clear volcanic crater lake of Yeak Laom, remote indigenous tribal villages, dramatic cascades, and ancient dense jungles.',
        attractionsSummary: 'Yeak Laom Crater Lake, Ka Chanh Waterfall, Cha Ung, Lumphat',
        hotelsSummary: 'Eco-resorts, lakeside wooden bungalows ($15 - $70/night)',
        restaurantsSummary: 'Local roasted chicken, fresh fruit, mountain rice dishes',
        activitiesSummary: 'Crater lake swimming, rainforest trekking, gem mining history',
        transportationSummary: 'Motorbike, 4x4 pickup, Local guide',
        estimatedCosts: '$20 – $60 / day (per person)',
        bestTime: 'Nov – Mar (sunny days & accessible roads)',
        travelTips: 'Yeak Laom Lake is sacred to the indigenous Tampuan people; please respect local customs when swimming',
        hotels: [
            { name: 'Terres Rouges Lodge', rating: 4.8, price: '$60/night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', desc: 'Historic wooden manor beside serene lake' },
            { name: 'Yeak Loam Hotel', rating: 4.4, price: '$30/night', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80', desc: 'Convenient stay near the crater lake' },
            { name: 'Banlung Balcony', rating: 4.3, price: '$20/night', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', desc: 'Backpacker favorite with sunset patio' }
        ],
        restaurants: [
            { name: 'Cafe Aretousa', type: 'Mediterranean & Khmer', price: '$$', dish: 'Homemade pasta & local fresh salads' },
            { name: 'Phum Khmer Restaurant', type: 'Traditional Khmer', price: '$', dish: 'Grilled freshwater fish with mango sauce' },
            { name: 'Banlung Night Market', type: 'Street Stalls', price: '$', dish: 'Papaya salad & grilled sticky rice' }
        ],
        activities: [
            { title: 'Yeak Laom Volcanic Crater Lake Swim', duration: 'Half Day', price: '$10', tag: 'Natural Wonder' },
            { title: 'Ka Chanh & Katieng Waterfall Tour', duration: '4 Hours', price: '$20', tag: 'Waterfalls' },
            { title: 'Virachey National Park Jungle Trek', duration: 'Full Day', price: '$45', tag: 'Deep Trek' }
        ]
    }
};

export default function DestinationsExplorer({ showTitle = false }) {
    const navigate = useNavigate();
    const priorityIds = ['siem-reap', 'phnom-penh', 'kampot', 'battambang', 'preah-sihanouk', 'kep', 'mondulkiri', 'ratanakiri'];

    const sortedProvinces = useMemo(() => {
        const priority = [];
        const others = [];

        priorityIds.forEach(id => {
            const found = provincesData.find(p => p.id === id);
            if (found) priority.push(found);
        });

        provincesData.forEach(p => {
            if (!priorityIds.includes(p.id)) {
                others.push(p);
            }
        });

        return [...priority, ...others];
    }, []);

    const [selectedProvinceId, setSelectedProvinceId] = useState('siem-reap');
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [lightboxImg, setLightboxImg] = useState(null);
    const [showAllProvinces, setShowAllProvinces] = useState(false);
    const [travelDates, setTravelDates] = useState('Nov 15 - Nov 20, 2026');
    const [startDate, setStartDate] = useState('2026-11-15');
    const [endDate, setEndDate] = useState('2026-11-20');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datePickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        }
        if (showDatePicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDatePicker]);

    const handleDateChange = (newStart, newEnd) => {
        const s = newStart !== null ? newStart : startDate;
        const e = newEnd !== null ? newEnd : endDate;
        if (newStart !== null) setStartDate(newStart);
        if (newEnd !== null) setEndDate(newEnd);

        if (s && e) {
            const sObj = new Date(s + 'T00:00:00');
            const eObj = new Date(e + 'T00:00:00');
            if (!isNaN(sObj.getTime()) && !isNaN(eObj.getTime())) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const formatted = `${months[sObj.getMonth()]} ${sObj.getDate()} - ${months[eObj.getMonth()]} ${eObj.getDate()}, ${eObj.getFullYear()}`;
                setTravelDates(formatted);
            }
        }
    };

    const currentProvince = useMemo(() => {
        return provincesData.find(p => p.id === selectedProvinceId) || provincesData[0];
    }, [selectedProvinceId]);

    const currentMeta = useMemo(() => {
        const meta = PROVINCE_METADATA[currentProvince.id];
        if (meta) return meta;

        return {
            subLabel: currentProvince.tagline || 'Nature, Culture, History',
            tags: 'Culture • Nature • Scenery • Discovery',
            about: `${currentProvince.name} (${currentProvince.khmerName}) offers an authentic slice of Cambodian culture and scenic landscapes with peaceful countryside, rich history, and friendly local communities.`,
            attractionsSummary: currentProvince.places?.map(p => p.name).slice(0, 4).join(', ') || 'Local attractions',
            hotelsSummary: 'Boutique hotels, Riverside stays, Budget ($15 - $80/night)',
            restaurantsSummary: 'Authentic Khmer food, Fresh market produce',
            activitiesSummary: 'Sightseeing, cultural tours, market visits',
            transportationSummary: 'Tuk tuk, Motorbike taxi, Local bus',
            estimatedCosts: '$20 – $60 / day (per person)',
            bestTime: 'Nov – Mar (dry season)',
            travelTips: 'Carry small cash in Riel or USD for local markets',
            hotels: [
                { name: `${currentProvince.name} Riverside Resort`, rating: 4.6, price: '$45/night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', desc: 'Peaceful accommodation with river views' },
                { name: `${currentProvince.name} Central Hotel`, rating: 4.4, price: '$28/night', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80', desc: 'Convenient central location' }
            ],
            restaurants: [
                { name: `Traditional ${currentProvince.name} Kitchen`, type: 'Local Khmer', price: '$', dish: 'Fresh fish amok and steamed jasmine rice' },
                { name: 'Riverside Sunset Cafe', type: 'Khmer & Asian', price: '$$', dish: 'Khmer noodle soup and fresh coconut' }
            ],
            activities: [
                { title: `Highlights of ${currentProvince.name}`, duration: 'Half Day', price: '$25', tag: 'Discovery' },
                { title: 'Countryside & Village Bicycle Tour', duration: '3 Hours', price: '$15', tag: 'Eco Tour' }
            ]
        };
    }, [currentProvince]);

    const displayedProvinces = useMemo(() => {
        let list = sortedProvinces;
        if (searchTerm.trim()) {
            list = list.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (!showAllProvinces && !searchTerm) {
            return list.slice(0, 8);
        }
        return list;
    }, [sortedProvinces, searchTerm, showAllProvinces]);

    const galleryPhotos = useMemo(() => {
        const photos = [];
        if (currentProvince.coverImg) photos.push(currentProvince.coverImg);
        if (currentProvince.detailImg && currentProvince.detailImg !== currentProvince.coverImg) photos.push(currentProvince.detailImg);
        if (currentProvince.places) {
            currentProvince.places.forEach(p => {
                if (p.img && !photos.includes(p.img)) {
                    photos.push(p.img);
                }
            });
        }
        const stockPhotos = [
            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'
        ];
        let idx = 0;
        while (photos.length < 5) {
            photos.push(stockPhotos[idx % stockPhotos.length]);
            idx++;
        }
        return photos.slice(0, 5);
    }, [currentProvince]);

    const handleQuickBook = (itemTitle) => {
        localStorage.setItem('pending-booking', JSON.stringify({
            item: itemTitle,
            type: 'tour',
            redirectUrl: '/booking'
        }));
        navigate('/booking');
    };

    return (
        <div className="space-y-6">
            {showTitle && (
                <div className="section-header text-center" style={{ marginBottom: '35px' }}>
                    <span className="badge">Featured Guide</span>
                    <h2 className="section-title text-slate-900 dark:text-white">POPULAR DESTINATIONS IN CAMBODIA</h2>
                    <div className="title-underline"></div>
                </div>
            )}

            {/* 1. TOP FILTER BAR */}
            <header className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                    {/* Dropdown 1: All Provinces */}
                    <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700/60">
                        <select
                            value={selectedProvinceId}
                            onChange={(e) => setSelectedProvinceId(e.target.value)}
                            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-4"
                        >
                            <option value="" disabled>Select Province</option>
                            {provincesData.map(p => (
                                <option key={p.id} value={p.id} className="dark:bg-slate-900">
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Dropdown 2: Travel Dates */}
                    <div className="relative flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3.5 py-2 border border-slate-200 dark:border-slate-700/60" ref={datePickerRef}>
                        <input
                            type="text"
                            value={travelDates}
                            onChange={(e) => setTravelDates(e.target.value)}
                            placeholder="e.g. Nov 15 - Nov 20, 2026"
                            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                            title="Type travel dates or click Pick to select"
                        />
                        <button
                            type="button"
                            onClick={() => setShowDatePicker(prev => !prev)}
                            className="ml-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 px-2.5 py-1 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 hover:bg-emerald-200/80 transition-colors whitespace-nowrap"
                            title="Select dates from calendar"
                        >
                            Pick
                        </button>

                        {/* Date Picker Popover */}
                        {showDatePicker && (
                            <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-xl flex flex-col gap-2.5 min-w-[260px]">
                                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 pb-1 border-b border-slate-100 dark:border-slate-800">
                                    Select Travel Dates
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Start Date</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => handleDateChange(e.target.value, null)}
                                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400">End Date</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        min={startDate}
                                        onChange={(e) => handleDateChange(null, e.target.value)}
                                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="flex justify-end pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowDatePicker(false)}
                                        className="text-xs px-3 py-1 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dropdown 3: Guests */}
                    <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/60 rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700/60">
                        <select
                            defaultValue="1 Adult"
                            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-4"
                        >
                            <option value="1 Adult" className="dark:bg-slate-900">1 Adult</option>
                            <option value="2 Adults" className="dark:bg-slate-900">2 Adults</option>
                            <option value="2 Adults, 1 Child" className="dark:bg-slate-900">2 Adults, 1 Child</option>
                            <option value="Family / Group (4+)" className="dark:bg-slate-900">Family / Group (4+)</option>
                        </select>
                    </div>
                </div>

                {/* Search Action Button */}
                <button
                    onClick={() => {
                        const target = document.getElementById('explorer-main-view');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center transition-all shrink-0 active:scale-95"
                >
                    <span>Search</span>
                </button>
            </header>

            {/* 2. THREE COLUMN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

                {/* LEFT SIDEBAR: Cambodia Provinces */}
                <aside className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm p-4 space-y-3">
                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            Cambodia Provinces
                        </h2>
                    </div>

                    {showAllProvinces && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search 25 provinces..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none"
                            />
                        </div>
                    )}

                    <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
                        {displayedProvinces.map((prov) => {
                            const isSelected = prov.id === selectedProvinceId;
                            const meta = PROVINCE_METADATA[prov.id];
                            const subtitle = meta ? meta.subLabel : (prov.tagline || 'Cambodia destination');

                            return (
                                <div
                                    key={prov.id}
                                    onClick={() => {
                                        setSelectedProvinceId(prov.id);
                                        setActiveTab('overview');
                                    }}
                                    className={`group flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all border ${
                                        isSelected
                                            ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 shadow-xs'
                                            : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                    }`}
                                >
                                    <img
                                        src={prov.coverImg}
                                        alt={prov.name}
                                        className="w-11 h-11 rounded-lg object-cover shrink-0 border border-slate-200/60 dark:border-slate-700"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=150&q=80';
                                        }}
                                    />
                                    <div className="flex-1 min-w-0 text-left">
                                        <h3 className={`text-xs font-bold truncate ${
                                            isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                        }`}>
                                            {prov.name}
                                        </h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                            {subtitle}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setShowAllProvinces(!showAllProvinces)}
                        className="w-full pt-3 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center border-t border-slate-100 dark:border-slate-800"
                    >
                        <span>{showAllProvinces ? 'Collapse List' : 'View All Provinces'}</span>
                    </button>
                </aside>

                {/* CENTER COLUMN: Hero, Tabs, Details, Gallery */}
                <main id="explorer-main-view" className="lg:col-span-6 space-y-5">
                    {/* Hero Banner Card */}
                    <div className="relative rounded-2xl overflow-hidden shadow-sm h-64 sm:h-72 lg:h-80 border border-slate-200/80 dark:border-slate-800 group">
                        <img
                            src={currentProvince.detailImg || currentProvince.coverImg}
                            alt={currentProvince.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-5 sm:p-7">
                            <div className="text-white text-2xl sm:text-3xl font-black drop-shadow-md">
                                <h1>{currentProvince.name}</h1>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide mt-1.5 drop-shadow">
                                {currentMeta.tags}
                            </p>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-1 shadow-sm flex items-center overflow-x-auto no-scrollbar gap-1">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'attractions', label: 'Attractions' },
                            { id: 'hotels', label: 'Hotels' },
                            { id: 'restaurants', label: 'Restaurants' },
                            { id: 'activities', label: 'Activities' },
                            { id: 'transportation', label: 'Transportation' }
                        ].map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* OVERVIEW CONTENT */}
                    {activeTab === 'overview' && (
                        <div className="space-y-5">
                            {/* About Section Card */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
                                <div>
                                    <div className="mb-2">
                                        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                            About {currentProvince.name}
                                        </h2>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {currentMeta.about}
                                    </p>
                                </div>

                                {/* 9 Feature Cards Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Popular Attractions</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentMeta.attractionsSummary}</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Hotels</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentMeta.hotelsSummary}</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Restaurants</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentMeta.restaurantsSummary}</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Activities</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentMeta.activitiesSummary}</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Transportation</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentMeta.transportationSummary}</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Estimated Costs</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentMeta.estimatedCosts}</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Best Time to Visit</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentMeta.bestTime}</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Travel Tips</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentMeta.travelTips}</p>
                                    </div>

                                    <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 sm:col-span-2">
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">Location</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{currentProvince.name}, Cambodia</p>
                                    </div>
                                </div>
                            </div>

                            {/* Photo Gallery */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                        Photo Gallery
                                    </h3>
                                    <button
                                        onClick={() => setLightboxImg(galleryPhotos[0])}
                                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                                    >
                                        <span>View All</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                                    {galleryPhotos.map((imgUrl, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setLightboxImg(imgUrl)}
                                            className="group relative h-20 sm:h-24 rounded-xl overflow-hidden cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`Gallery ${i}`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ATTRACTIONS TAB */}
                    {activeTab === 'attractions' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                Top Sightseeing in {currentProvince.name}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {currentProvince.places?.map((p) => (
                                    <div
                                        key={p.id}
                                        className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between"
                                    >
                                        <div className="h-36 overflow-hidden">
                                            <img
                                                src={p.img}
                                                alt={p.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{p.name}</h3>
                                                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium font-serif">{p.khmerName}</span>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{p.desc}</p>
                                            </div>
                                            <div className="pt-3 flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedPlace(p)}
                                                    className="flex-1 py-1.5 px-3 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold hover:bg-blue-100 transition-colors"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    onClick={() => handleQuickBook(`Trip to ${p.name}`)}
                                                    className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                                                >
                                                    Book Trip
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* HOTELS TAB */}
                    {activeTab === 'hotels' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                Recommended Stays in {currentProvince.name}
                            </h2>
                            <div className="space-y-3">
                                {currentMeta.hotels.map((h, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                                        <img src={h.img} alt={h.name} className="w-full sm:w-28 h-24 rounded-lg object-cover shrink-0" />
                                        <div className="flex-1 text-left min-w-0">
                                            <div className="text-amber-500 text-xs font-bold">
                                                <span>{h.rating} Rating</span>
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{h.name}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{h.desc}</p>
                                            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-xs mt-1">{h.price}</div>
                                        </div>
                                        <button
                                            onClick={() => handleQuickBook(`Hotel: ${h.name}`)}
                                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0"
                                        >
                                            Book Stay
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RESTAURANTS TAB */}
                    {activeTab === 'restaurants' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                Famous Culinary Spots in {currentProvince.name}
                            </h2>
                            <div className="space-y-3">
                                {currentMeta.restaurants.map((r, idx) => (
                                    <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{r.name}</h3>
                                                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold">{r.price}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r.type}</p>
                                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Recommended: {r.dish}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ACTIVITIES TAB */}
                    {activeTab === 'activities' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                Featured Tours & Day Experiences
                            </h2>
                            <div className="space-y-3">
                                {currentMeta.activities.map((a, idx) => (
                                    <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                        <div>
                                            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] font-bold">{a.tag}</span>
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">{a.title}</h3>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                                <span>{a.duration}</span>
                                                <span className="font-bold text-blue-600 dark:text-blue-400">{a.price} / person</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleQuickBook(a.title)}
                                            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                                        >
                                            Reserve Activity
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TRANSPORTATION TAB */}
                    {activeTab === 'transportation' && (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                                Getting Around {currentProvince.name}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">
                                        Tuk Tuk & Remorque
                                    </h3>
                                    <p className="text-slate-500">Most convenient option for city and nearby temple exploration. Avg $15 - $25/day full hire.</p>
                                </div>
                                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white">
                                        Private AC Taxi
                                    </h3>
                                    <p className="text-slate-500">Comfortable for distant waterfalls and multi-district day trips. Avg $40 - $70/day.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* RIGHT SIDEBAR: Map, Top Attractions, Promo Banner */}
                <aside className="lg:col-span-3 space-y-5">
                    {/* Location on Map */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm p-4 space-y-3">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            Location on Map
                        </h3>

                        <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-800">
                            <iframe
                                title={`Map of ${currentProvince.name}`}
                                width="100%"
                                height="100%"
                                loading="lazy"
                                style={{ border: 0, filter: 'contrast(1.05)' }}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(currentProvince.name + ', Cambodia')}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                            />
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md border border-slate-200/60 dark:border-slate-700 flex items-center text-[11px] font-bold text-slate-800 dark:text-slate-200 pointer-events-none">
                                <span>{currentProvince.name}</span>
                            </div>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentProvince.name + ' Cambodia')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bottom-2 right-2 px-2.5 py-1 bg-white/95 dark:bg-slate-900/95 hover:bg-white text-slate-700 dark:text-slate-200 text-[10px] font-bold rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex items-center transition-colors"
                            >
                                <span>View on Google Maps</span>
                            </a>
                        </div>
                    </div>

                    {/* Top Attractions List */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm p-4 space-y-3">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            Top Attractions
                        </h3>

                        <div className="space-y-2">
                            {currentProvince.places?.map((p, idx) => {
                                const rating = (4.9 - idx * 0.1).toFixed(1);
                                const reviewCount = `${Math.floor(12 - idx * 2.3)}k+`;

                                return (
                                    <div
                                        key={p.id}
                                        onClick={() => setSelectedPlace(p)}
                                        className="group flex items-center gap-3 p-2 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 cursor-pointer transition-all"
                                    >
                                        <img
                                            src={p.img}
                                            alt={p.name}
                                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200/60 dark:border-slate-700"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=200&q=80';
                                            }}
                                        />
                                        <div className="flex-1 min-w-0 text-left">
                                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                                                {p.name}
                                            </h4>
                                            <div className="text-[11px] text-amber-500 font-semibold mt-0.5">
                                                <span>{rating}</span>
                                                <span className="text-slate-400 font-normal"> ({reviewCount})</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Promo Banner */}
                    <div
                        onClick={() => navigate('/trip-planner')}
                        className="group p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-950/40 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/60 shadow-xs cursor-pointer flex items-center gap-3.5 transition-all hover:shadow-md"
                    >
                        <div className="flex-1 text-left min-w-0">
                            <h3 className="text-xs font-bold text-blue-950 dark:text-white leading-tight">
                                Capture the beauty of {currentProvince.name}
                            </h3>
                            <p className="text-[11px] text-blue-800/80 dark:text-blue-300 mt-1 leading-snug">
                                Save your favorite places and create your own travel story!
                            </p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* LIGHTBOX MODAL */}
            {lightboxImg && (
                <div
                    onClick={() => setLightboxImg(null)}
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
                >
                    <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setLightboxImg(null)}
                            className="absolute -top-10 right-0 text-white p-2 hover:opacity-80"
                        >
                            ✕
                        </button>
                        <img
                            src={lightboxImg}
                            alt="Full preview"
                            className="rounded-2xl max-h-[85vh] w-auto object-contain shadow-2xl"
                        />
                    </div>
                </div>
            )}

            {/* ATTRACTION DETAIL MODAL */}
            {selectedPlace && (
                <PlaceModal
                    place={selectedPlace}
                    onClose={() => setSelectedPlace(null)}
                />
            )}
        </div>
    );
}
