export const seedMovies = [
  {
    id: "movie-og",
    title: "They Call Him OG",
    teluguTitle: "దే కాల్ హిమ్ OG",
    tagline: "Fire Storm is Coming • The Bloodbath Begins",
    poster: "/posters/og_pawan_kalyan.jpg",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // embeddable video trailer placeholder/sample
    rating: 9.8,
    votes: "185K votes",
    certificate: "A",
    languages: ["Telugu", "Hindi", "Tamil"],
    formats: ["IMAX 2D", "4K Dolby Atmos", "2D"],
    genres: ["Action", "Crime", "Thriller"],
    duration: "2h 45m",
    releaseDate: "In Theaters Now",
    isNowShowing: true,
    isTrending: true,
    director: "Sujeeth",
    music: "Thaman S",
    cast: ["Pawan Kalyan", "Emraan Hashmi", "Priyanka Arul Mohan", "Prakash Raj", "Sriya Reddy"],
    synopsis: "Ten years after disappearing from the ruthless underworld of Mumbai, the phantom gangster Ojas Gambheera returns to reclaim his turf in a high-octane tempest of blood, honor, and vengeance."
  },
  {
    id: "movie-rangasthalam",
    title: "Rangasthalam",
    teluguTitle: "రంగస్థలం",
    tagline: "President Gaari Abbayi • 4K Special Screening",
    poster: "/posters/rangasthalam.jpg",
    backdrop: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1920&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=s4gBChg6AII",
    rating: 9.3,
    votes: "240K votes",
    certificate: "U/A",
    languages: ["Telugu"],
    formats: ["4K Dolby Atmos", "2D"],
    genres: ["Period Action", "Drama", "Rustic"],
    duration: "2h 59m",
    releaseDate: "Special Re-Release",
    isNowShowing: true,
    isTrending: true,
    director: "Sukumar",
    music: "Devi Sri Prasad",
    cast: ["Ram Charan", "Samantha Ruth Prabhu", "Aadhi Pinisetty", "Jagapathi Babu", "Prakash Raj"],
    synopsis: "In 1980s rural Andhra Pradesh, Chitti Babu, a cheerful youth with hearing impairment, rises in fury against thirty years of feudal tyranny after his educated brother challenges the dreaded village president."
  },
  {
    id: "movie-the-paradise",
    title: "The Paradise",
    teluguTitle: "ది పారడైజ్",
    tagline: "A Srikanth Odela Film • An Anirudh Musical",
    poster: "/posters/the_paradise.jpg",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 9.5,
    votes: "95K votes",
    certificate: "A",
    languages: ["Telugu", "Hindi", "Tamil", "Kannada", "Malayalam"],
    formats: ["4K Laser", "Dolby Atmos", "2D"],
    genres: ["Raw Action", "Crime", "Period Thriller"],
    duration: "2h 40m",
    releaseDate: "Now Showing in Hyderabad",
    isNowShowing: true,
    isTrending: true,
    director: "Srikanth Odela",
    music: "Anirudh Ravichander",
    cast: ["Natural Star Nani", "Mohanlal", "Mrinal Thakur"],
    synopsis: "A high-stakes raw vengeance drama set against the lawless industrial heartland, where one man's rebellion ignites an unstoppable inferno across the syndicate."
  },
  {
    id: "movie-dear-comrade",
    title: "Dear Comrade",
    teluguTitle: "డియర్ కామ్రేడ్",
    tagline: "Fight For What You Love • 7 Years Celebration",
    poster: "/posters/dear_comrade.jpg",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=84b4hL04u6Y",
    rating: 8.9,
    votes: "160K votes",
    certificate: "U/A",
    languages: ["Telugu", "Tamil", "Malayalam"],
    formats: ["Dolby 7.1", "2D"],
    genres: ["Romance", "Drama", "Music"],
    duration: "2h 50m",
    releaseDate: "Hyderabad Anniversary Shows",
    isNowShowing: true,
    isTrending: false,
    director: "Bharat Kamma",
    music: "Justin Prabhakaran",
    cast: ["Vijay Deverakonda", "Rashmika Mandanna", "Shruti Ramachandran", "Charuhasan"],
    synopsis: "Bobby, a hot-tempered student leader, falls in love with Lilly, a passionate state cricketer. When love clashes with personal traumas and inner demons, Bobby fights through sound and silence for their redemption."
  },
  {
    id: "movie-tholi-prema",
    title: "Tholi Prema",
    teluguTitle: "తొలిప్రేమ",
    tagline: "A Journey of Love • Relive the Magic",
    poster: "/posters/tholi_prema.jpg",
    backdrop: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1920&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Vz8zT8E45L0",
    rating: 9.1,
    votes: "115K votes",
    certificate: "U/A",
    languages: ["Telugu"],
    formats: ["Dolby Atmos", "2D"],
    genres: ["Romantic Comedy", "Youth", "Drama"],
    duration: "2h 20m",
    releaseDate: "Valentine's & Weekend Special",
    isNowShowing: true,
    isTrending: false,
    director: "Venky Atluri",
    music: "S. Thaman",
    cast: ["Varun Tej", "Raashii Khanna", "Priyadarshi", "Hyper Aadi", "Suhasini Maniratnam"],
    synopsis: "The vibrant story of Aditya and Varsha—a spark of pure love born on a train journey that survives misunderstandings, seven long years of distance, and culminates into heartfelt maturity."
  }
];

export const seedTheaters = [
  {
    id: "th-amb-gachibowli",
    name: "AMB Cinemas: Gachibowli",
    city: "Hyderabad",
    area: "Gachibowli",
    address: "Sarath City Capital Mall, 4th Floor, Kondapur Main Road, Gachibowli, Hyderabad - 500084",
    landmark: "Beside Botanical Gardens, Gachibowli Flyover",
    badge: "Superstar Mahesh Babu's Luxury Multiplex",
    distance: "1.8 km",
    amenities: ["Laser Dolby Atmos", "VIP Recliner M-Lounge", "4K RGB Laser", "Gourmet Live Kitchen", "Valet Parking"],
    screens: [
      { name: "Screen 1 - M-Lounge VIP", format: "4K Laser Dolby Atmos", totalSeats: 160 },
      { name: "Screen 3 - Platinum", format: "Dolby Atmos", totalSeats: 220 },
      { name: "Screen 5 - Gold Class", format: "2D 4K", totalSeats: 180 }
    ]
  },
  {
    id: "th-prasads-pcx",
    name: "Prasads Multiplex: PCX & IMAX",
    city: "Hyderabad",
    area: "Khairatabad",
    address: "NTR Gardens, Necklace Road, Khairatabad, Hyderabad - 500063",
    landmark: "Opposite Hussain Sagar Lakefront",
    badge: "101.6 ft Giant Screen South India Hub",
    distance: "4.5 km",
    amenities: ["Prasads PCX Dual 4K Laser", "Dolby Atmos 64-Channel", "Giant Screen", "Lake View Food Lounge"],
    screens: [
      { name: "PCX Large Screen", format: "IMAX 2D Dual 4K", totalSeats: 320 },
      { name: "Screen 4 - Dolby Atmos", format: "4K Dolby Atmos", totalSeats: 210 },
      { name: "Screen 6", format: "2D", totalSeats: 190 }
    ]
  },
  {
    id: "th-aaa-ameerpet",
    name: "AAA Cinemas: Ameerpet",
    city: "Hyderabad",
    area: "Ameerpet",
    address: "Asian Allu Arjun Cinemas, Old Satyam Complex, Ameerpet, Hyderabad - 500016",
    landmark: "Near Ameerpet Metro Interchange",
    badge: "Icon Star Allu Arjun's Cinema World",
    distance: "3.2 km",
    amenities: ["Barco 4K Laser Projection", "Dolby Atmos Sound", "AAA Elite Recliners", "Signature Tollywood Cafe"],
    screens: [
      { name: "Audi 1 - AAA Barco Laser", format: "4K Laser Dolby Atmos", totalSeats: 240 },
      { name: "Audi 2 - Elite", format: "Dolby Atmos", totalSeats: 180 }
    ]
  },
  {
    id: "th-sudharshan-rtcxroads",
    name: "Sudharshan 35mm: RTC X Roads",
    city: "Hyderabad",
    area: "RTC X Roads",
    address: "Chikkadpally, RTC Cross Roads, Hyderabad - 500020",
    landmark: "Tollywood Mecca, Junction of RTC X Roads",
    badge: "Iconic Single Screen Mass Epicenter",
    distance: "5.8 km",
    amenities: ["4K Digital Barco", "Dolby 7.1 Surround", "Mass Euphoria Atmosphere", "Hyderabad Samosa & Chai"],
    screens: [
      { name: "Sudharshan Main 35mm Screen", format: "4K Dolby 7.1", totalSeats: 350 }
    ]
  },
  {
    id: "th-pvr-inorbit",
    name: "PVR: Inorbit Mall Cyberabad",
    city: "Hyderabad",
    area: "Hitec City",
    address: "Level 4, Inorbit Mall, Mindspace, Hitec City, Madhapur, Hyderabad - 500081",
    landmark: "Facing Durgam Cheruvu Cable Bridge",
    badge: "Hitec City Tech Corridor Premier",
    distance: "2.4 km",
    amenities: ["PVR P[XL] Giant Format", "4DX Motion FX", "Dolby Atmos", "Gourmet Hot Kitchen"],
    screens: [
      { name: "Audi 2 - P[XL]", format: "IMAX 2D", totalSeats: 260 },
      { name: "Audi 4 - 4DX", format: "4DX Dolby", totalSeats: 140 }
    ]
  },
  {
    id: "th-cinepolis-uppal",
    name: "Cinepolis: DSL Virtue Mall Uppal",
    city: "Hyderabad",
    area: "Uppal",
    address: "DSL Virtue Mall, Ramanthapur Main Road, Uppal, Hyderabad - 500039",
    landmark: "Beside Uppal Stadium & Metro",
    badge: "East Hyderabad's Premium Experience",
    distance: "8.2 km",
    amenities: ["Macro XE Screen", "RealD 3D", "Dolby Atmos", "Coffee Tree"],
    screens: [
      { name: "Screen 2 - Macro XE", format: "4K Dolby Atmos", totalSeats: 230 }
    ]
  }
];

export const seedHyderabadFnb = [
  {
    id: "fnb-popcorn-caramel",
    name: "Chitram Hyderabad Caramel Popcorn (Jumbo)",
    category: "Popcorn",
    price: 260,
    desc: "Freshly popped golden corn glazed with rich melted toffee butter",
    image: "🍿"
  },
  {
    id: "fnb-irani-chai-combo",
    name: "Hyderabad Irani Chai & Osmania Biscuits (Combo of 4)",
    category: "Beverage & Snack",
    price: 180,
    desc: "Authentic dum ki chai infused with cardamom and warm Osmania cookies",
    image: "☕"
  },
  {
    id: "fnb-nachos-salsa",
    name: "Loaded Cheese Nachos & Spicy Salsa Dip",
    category: "Snack",
    price: 240,
    desc: "Crispy corn tortillas smothered in warm cheddar cheese & roasted salsa",
    image: "🧀"
  },
  {
    id: "fnb-samosa-chutney",
    name: "Classic Hyderabadi Aloo Samosas (2 Pcs) + Mint Chutney",
    category: "Hot Snacks",
    price: 150,
    desc: "Flaky golden fried pastry with spiced potato masala and green chutney",
    image: "🥟"
  },
  {
    id: "fnb-chilled-coke",
    name: "Fountain Coke / Thums Up Charged (750ml)",
    category: "Beverage",
    price: 140,
    desc: "Ice-cold sparkling refreshment, the ultimate cinema companion",
    image: "🥤"
  }
];

// Helper to generate dynamic showtimes for Today, Tomorrow, and day after
export const generateShowtimes = () => {
  const dates = ["Today", "Tomorrow", "Wednesday, 24 Sep"];
  const timeSlots = [
    { time: "10:45 AM", label: "Morning Show" },
    { time: "02:15 PM", label: "Matinee Show" },
    { time: "06:30 PM", label: "First Show" },
    { time: "10:15 PM", label: "Second Show (Night)" }
  ];

  const showtimes = [];
  let showIdCounter = 1;

  seedMovies.forEach(movie => {
    seedTheaters.forEach(theater => {
      dates.forEach(date => {
        // Choose 2-3 showtimes per theater per day for this movie
        timeSlots.forEach((slot, slotIndex) => {
          // Semi-randomize occupancy for realism
          const statuses = ['Available', 'Fast Filling', 'Available', 'Almost Full'];
          const status = statuses[(movie.title.length + theater.name.length + slotIndex) % statuses.length];
          
          // Pre-booked sample seats
          const sampleBooked = ["B4", "B5", "C6", "C7", "D10", "D11", "F3", "F4", "A2", "A3"];

          showtimes.push({
            id: `show-${showIdCounter++}`,
            movieId: movie.id,
            theaterId: theater.id,
            screenName: theater.screens[slotIndex % theater.screens.length].name,
            format: theater.screens[slotIndex % theater.screens.length].format,
            language: "Telugu",
            date: date,
            time: slot.time,
            label: slot.label,
            status: status,
            pricing: {
              recliner: 350,
              prime: 220,
              classic: 150
            },
            bookedSeats: sampleBooked
          });
        });
      });
    });
  });

  return showtimes;
};
