export const packagesData = [
    {
        id: 'angkor-heritage',
        category: 'culture',
        categoryLabel: 'Culture & Heritage',
        title: 'Angkor Wat Grand Heritage Discovery',
        location: 'Siem Reap, Cambodia',
        desc: 'Experience sunrise at Angkor Wat, venture through tree-entangled Ta Prohm, and marvel at the enigmatic stone faces of Bayon with an expert historian guide.',
        duration: '4 Days 3 Nights',
        groupSize: '2-10 People',
        price: 299,
        rating: 4.9,
        reviewsCount: 142,
        img: 'https://whc.unesco.org/uploads/thumbs/site_0668_0067-1200-630-20151104115852.jpg',
        badge: 'Top Rated',
        highlights: [
            'Angkor Wat VIP sunrise access',
            'Ta Prohm (Tomb Raider) expedition',
            'Tonle Sap floating village cruise',
            'Khmer cuisine cooking masterclass'
        ],
        includes: ['4-Star Hotel Stay', 'Daily Breakfast', 'Private Air-conditioned Transport', 'Temple Entrance Pass', 'Licensed English/Khmer Tour Guide']
    },
    {
        id: 'koh-rong-escape',
        category: 'relaxing',
        categoryLabel: 'Island & Beach',
        title: 'Koh Rong Sanloem Island Paradise',
        location: 'Sihanoukville & Koh Rong, Cambodia',
        desc: 'Escape to powdery white sands, turquoise sea, bioluminescent plankton night swims, and luxurious coastal sunset dining.',
        duration: '3 Days 2 Nights',
        groupSize: '2-8 People',
        price: 249,
        rating: 4.8,
        reviewsCount: 98,
        img: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/669831377.jpg?k=05c5854a62fe60082176bfe779f50ab67fe1cfa854e61268380014d294503ec1&o=',
        badge: 'Best Seller',
        highlights: [
            'Speed ferry ticket to Saracen Bay',
            'Snorkeling & coral reef excursion',
            'Glowing night plankton tour',
            'Beachside BBQ dinner'
        ],
        includes: ['Eco-resort Beach Bungalow', 'Speed Ferry Transfers', 'Snorkeling Gear & Boat Tour', 'Daily Breakfasts']
    },
    {
        id: 'cardamom-jungle-trek',
        category: 'adventure',
        categoryLabel: 'Eco Adventure',
        title: 'Cardamom Mountains Wild Rainforest Expedition',
        location: 'Koh Kong / Pursat, Cambodia',
        desc: 'Trek deep into Southeast Asia’s largest remaining rainforest, kayak through tranquil jungle rivers, and camp under the starry wilderness.',
        duration: '4 Days 3 Nights',
        groupSize: '4-12 People',
        price: 320,
        rating: 4.9,
        reviewsCount: 76,
        img: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/12/4c/ca/2c.jpg',
        badge: 'Adventure Choice',
        highlights: [
            'Guided wildlife jungle trekking',
            'River kayaking & waterfall swims',
            'Eco-friendly tent camping',
            'Local ranger trail navigation'
        ],
        includes: ['All Trekking Equipment', '3 Meals Daily in Jungle', 'Community Ranger Guides', 'Safety Briefing & First Aid']
    },
    {
        id: 'phnom-penh-culinary',
        category: 'food',
        categoryLabel: 'Gastronomy & Street Food',
        title: 'Phnom Penh Culinary & Heritage Tuk-Tuk Trail',
        location: 'Phnom Penh, Cambodia',
        desc: 'Hop onto an electric tuk-tuk to uncover secret food stalls, French colonial cocktail bars, and Michelin-recognized Khmer specialties.',
        duration: '2 Days 1 Night',
        groupSize: '2-8 People',
        price: 139,
        rating: 4.7,
        reviewsCount: 110,
        img: 'https://www.agoda.com/wp-content/uploads/2024/02/Featured-photo-Cambodia-restaurants-1244x700.jpg',
        badge: 'Foodie Pick',
        highlights: [
            '12+ Tastings of authentic Khmer dishes',
            'Tuk-tuk nightlife ride around monuments',
            'Visit the bustling Russian Market & Central Market',
            'Sunset cocktail overlooking the Mekong River'
        ],
        includes: ['Boutique Heritage Hotel', 'All Food & Beverage Tastings', 'Private Tuk-Tuk with Driver', 'Local Food Guide']
    },
    {
        id: 'mondulkiri-elephant-valley',
        category: 'adventure',
        categoryLabel: 'Wildlife & Nature',
        title: 'Mondulkiri Elephant Sanctuary & Pine Hills',
        location: 'Mondulkiri, Cambodia',
        desc: 'Walk alongside rescued Asian elephants in their natural habitat, hike through rolling pine hills, and feel the spray of Bousra Waterfall.',
        duration: '3 Days 2 Nights',
        groupSize: '2-10 People',
        price: 275,
        rating: 4.9,
        reviewsCount: 89,
        img: 'https://asiatravellinks.com/images/attractions/ta-prohm.webp',
        badge: 'Eco Ethical',
        highlights: [
            'Ethical elephant observation & bathing',
            'Bousra Waterfall exploration',
            'Indigenous Bunong village immersion',
            'Sea of Forests scenic overlook'
        ],
        includes: ['Hilltop Eco Lodge Stay', 'Sanctuary Entry & Donations', 'Roundtrip Transport', 'All Organic Meals']
    },
    {
        id: 'battambang-bamboo-train',
        category: 'culture',
        categoryLabel: 'Heritage & Countryside',
        title: 'Battambang Colonial Charms & Bat Cave Phenomenon',
        location: 'Battambang, Cambodia',
        desc: 'Ride the iconic Bamboo Train (Norry), visit preserved 100-year-old wooden houses, and witness millions of bats take flight at sunset from Phnom Sampov.',
        duration: '2 Days 1 Night',
        groupSize: '2-10 People',
        price: 115,
        rating: 4.8,
        reviewsCount: 64,
        img: 'https://xa6zemg4r8.cloudimg.io/_images_/Battambang%20Temples-yhUQyMTti0E05d2Jy2zO.jpg',
        badge: 'Cultural Gem',
        highlights: [
            'Ride the historic Bamboo Train',
            'Phnom Sampov sunset bat cave flight',
            'Ek Phnom ancient temple ruin',
            'Traditional rice paper making demo'
        ],
        includes: ['Colonial Style Hotel', 'All Activity Tickets', 'Local Transport & Guide', 'Breakfast']
    }
];

export const vehiclesConfig = {
    motorcycle: {
        id: 'motorcycle',
        nameEn: 'Motorcycle',
        nameKh: 'ម៉ូតូ',
        icon: 'fa-motorcycle',
        speed: 55,
        consumption: 2.2, // L/100km
        fuelType: 'gasoline'
    },
    sedan: {
        id: 'sedan',
        nameEn: 'Sedan / SUV',
        nameKh: 'ឡានផ្ទាល់ខ្លួន / SUV',
        icon: 'fa-car',
        speed: 80,
        consumption: 7.2, // L/100km
        fuelType: 'gasoline'
    },
    ev: {
        id: 'ev',
        nameEn: 'Electric Vehicle (EV)',
        nameKh: 'ឡានអគ្គិសនី (EV)',
        icon: 'fa-bolt',
        speed: 80,
        consumption: 16.5, // kWh/100km
        fuelType: 'electricity'
    },
    bus: {
        id: 'bus',
        nameEn: 'Tour Bus / Van',
        nameKh: 'ឡានក្រុងដឹកភ្ញៀវ / វ៉ាន់',
        icon: 'fa-bus',
        speed: 65,
        consumption: 14.0, // L/100km
        fuelType: 'diesel'
    }
};

export const fuelPrices = {
    gasoline: 1.15, // USD per Liter
    diesel: 1.05,    // USD per Liter
    electricity: 0.18 // USD per kWh
};

export default packagesData;
