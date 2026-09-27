import { seedMovies, seedTheaters, seedHyderabadFnb, generateShowtimes } from '../seed/seedData.js';
import MovieModel from '../models/Movie.js';
import TheaterModel from '../models/Theater.js';
import ShowtimeModel from '../models/Showtime.js';
import BookingModel from '../models/Booking.js';
import mongoose from 'mongoose';

// High-fidelity in-memory store initialized with seed data
class DataStore {
  constructor() {
    this.movies = [...seedMovies];
    this.theaters = [...seedTheaters];
    this.showtimes = generateShowtimes();
    this.fnb = [...seedHyderabadFnb];
    this.bookings = [
      {
        bookingId: "CHT-HYD-7721",
        movieId: "movie-og",
        movieTitle: "They Call Him OG",
        moviePoster: "/posters/og_pawan_kalyan.jpg",
        theaterId: "th-amb-gachibowli",
        theaterName: "AMB Cinemas: Gachibowli",
        theaterAddress: "Sarath City Capital Mall, Gachibowli, Hyderabad",
        showDate: "Today",
        showTime: "06:30 PM",
        screenName: "Screen 1 - M-Lounge VIP",
        seats: [
          { code: "A4", tier: "Recliner", price: 350 },
          { code: "A5", tier: "Recliner", price: 350 }
        ],
        fnb: [
          { name: "Hyderabad Irani Chai & Osmania Biscuits (Combo of 4)", qty: 1, price: 180 },
          { name: "Chitram Hyderabad Caramel Popcorn (Jumbo)", qty: 1, price: 260 }
        ],
        ticketAmount: 700,
        fnbAmount: 440,
        convenienceFee: 42.40,
        gst: 24.50,
        totalAmount: 1206.90,
        customer: {
          name: "Bhanu Prakash",
          phone: "+91 98480 22338",
          email: "bhanuprakash@chitram.hyd"
        },
        paymentMethod: "UPI (Google Pay)",
        paymentStatus: "CONFIRMED",
        qrData: "CHITRAM-CONFIRMED-CHT-HYD-7721-AMB-A4-A5",
        createdAt: new Date().toISOString()
      }
    ];
    this.isMongoConnected = false;
  }

  setMongoConnected(connected) {
    this.isMongoConnected = connected;
    if (connected) {
      console.log('⚡ DataStore synchronized with live MongoDB instance.');
      this.syncToMongo();
    } else {
      console.log('⚡ DataStore running in embedded zero-dependency mode (instant ready).');
    }
  }

  async syncToMongo() {
    try {
      const count = await MovieModel.countDocuments();
      if (count === 0) {
        await MovieModel.insertMany(this.movies);
        await TheaterModel.insertMany(this.theaters);
        console.log('✅ Seed data successfully synced to MongoDB collections!');
      }
    } catch (err) {
      console.warn('MongoDB sync warning:', err.message);
    }
  }

  getMovies({ search, genre, area } = {}) {
    let result = [...this.movies];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(m => 
        m.title.toLowerCase().includes(q) ||
        m.teluguTitle.toLowerCase().includes(q) ||
        m.cast.some(actor => actor.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q)
      );
    }
    if (genre && genre !== 'All') {
      result = result.filter(m => m.genres.some(g => g.toLowerCase() === genre.toLowerCase()));
    }
    return result;
  }

  getMovieById(id) {
    return this.movies.find(m => m.id === id || m._id === id);
  }

  getTheaters({ area } = {}) {
    let result = [...this.theaters];
    if (area && area !== 'All Areas') {
      result = result.filter(t => t.area.toLowerCase() === area.toLowerCase());
    }
    return result;
  }

  getTheatersWithShows(movieId, date = 'Today', area = 'All Areas') {
    let theaters = this.getTheaters({ area });
    
    return theaters.map(theater => {
      const shows = this.showtimes.filter(s => 
        s.movieId === movieId && 
        s.theaterId === theater.id &&
        s.date.toLowerCase() === date.toLowerCase()
      );
      return {
        ...theater,
        shows
      };
    }).filter(t => t.shows.length > 0);
  }

  getShowtimeById(id) {
    return this.showtimes.find(s => s.id === id);
  }

  getFnbItems() {
    return this.fnb;
  }

  createBooking(bookingData) {
    const bookingRef = `CHT-HYD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      ...bookingData,
      bookingId: bookingRef,
      createdAt: new Date().toISOString(),
      paymentStatus: "CONFIRMED",
      qrData: `CHITRAM-${bookingRef}-${bookingData.theaterId}-${bookingData.seats.map(s => s.code).join('-')}`
    };

    // Mark seats as booked in showtime
    const show = this.showtimes.find(s => s.id === bookingData.showtimeId);
    if (show) {
      const newlyBooked = bookingData.seats.map(s => s.code);
      show.bookedSeats = [...new Set([...show.bookedSeats, ...newlyBooked])];
      if (show.bookedSeats.length > 30) {
        show.status = "Almost Full";
      } else if (show.bookedSeats.length > 15) {
        show.status = "Fast Filling";
      }
    }

    this.bookings.unshift(newBooking);

    // If mongo is active, save asynchronously
    if (this.isMongoConnected && mongoose.connection.readyState === 1) {
      try {
        BookingModel.create(newBooking).catch(e => console.warn('Mongo booking save err:', e));
      } catch (e) {
        // quiet fallback
      }
    }

    return newBooking;
  }

  getBookings() {
    return this.bookings;
  }

  getBookingById(id) {
    return this.bookings.find(b => b.bookingId === id || b._id === id);
  }
}

export const dataStore = new DataStore();
