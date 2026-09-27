import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import MovieDetailsModal from './components/MovieDetailsModal';
import HyderabadTheaterModal from './components/HyderabadTheaterModal';
import SeatLayoutModal from './components/SeatLayoutModal';
import FnbSelectorModal from './components/FnbSelectorModal';
import PaymentModal from './components/PaymentModal';
import DigitalTicketModal from './components/DigitalTicketModal';
import MyBookingsModal from './components/MyBookingsModal';
import { getMovies, getBookings } from './services/api';
import { MapPin, Film, Sparkles, Popcorn, Coffee, Award, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  // Modals state
  const [detailMovie, setDetailMovie] = useState(null);
  const [bookingMovie, setBookingMovie] = useState(null);
  const [seatBookingSession, setSeatBookingSession] = useState(null);
  const [fnbBookingSession, setFnbBookingSession] = useState(null);
  const [paymentBookingSession, setPaymentBookingSession] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  // Fetch movies and previous bookings
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      getMovies({ search: searchQuery, genre: activeGenre }),
      getBookings()
    ])
      .then(([movieList, bookingsList]) => {
        if (isMounted) {
          setMovies(movieList);
          setMyBookings(bookingsList);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('App init error:', err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [searchQuery, activeGenre]);

  // Featured hero movie (default to They Call Him OG or first in list)
  const heroMovie = movies.find(m => m.id === 'movie-og') || movies[0];

  // Movie collections
  const nowShowingMovies = movies.filter(m => m.isNowShowing);
  const massMovies = movies.filter(m => 
    m.genres?.some(g => ['Action', 'Raw Action', 'Crime', 'Period Action'].includes(g))
  );
  const romanceMovies = movies.filter(m => 
    m.genres?.some(g => ['Romance', 'Romantic Comedy', 'Drama'].includes(g))
  );

  // Booking Flow Triggers
  const handleOpenBooking = (movie) => {
    setBookingMovie(movie);
  };

  const handleSelectShowtime = (session) => {
    setBookingMovie(null);
    setSeatBookingSession(session);
  };

  const handleProceedToFnb = (sessionWithSeats) => {
    setSeatBookingSession(null);
    setFnbBookingSession(sessionWithSeats);
  };

  const handleProceedToPayment = (sessionWithFnb) => {
    setFnbBookingSession(null);
    setPaymentBookingSession(sessionWithFnb);
  };

  const handleBookingSuccess = (newBooking) => {
    setPaymentBookingSession(null);
    setConfirmedBooking(newBooking);
    setMyBookings(prev => [newBooking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col selection:bg-[#E50914] selection:text-white">
      {/* Fixed Sticky Header */}
      <Navbar
        selectedArea={selectedArea}
        onSelectArea={setSelectedArea}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMyBookings={() => setShowMyBookings(true)}
        bookingCount={myBookings.length}
        onSelectMovie={(m) => setDetailMovie(m)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Loading Spinner */}
        {loading && movies.length === 0 ? (
          <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
            <div className="text-xl font-black text-netflix-bebas tracking-widest text-[#E50914]">
              LOADING CHITRAM HYDERABAD...
            </div>
          </div>
        ) : (
          <>
            {/* Netflix Hero Billboard */}
            {!searchQuery && (
              <HeroBanner
                movie={heroMovie}
                onBookClick={handleOpenBooking}
                onDetailsClick={(m) => setDetailMovie(m)}
              />
            )}

            {/* Quick Genre Chips */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-2 flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
                Filter by Genre:
              </span>
              {['All', 'Action', 'Period Action', 'Romance', 'Romantic Comedy', 'Crime'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                    activeGenre === genre
                      ? 'bg-[#E50914] text-white shadow-[0_2px_10px_rgba(229,9,20,0.5)]'
                      : 'bg-[#222222] text-gray-300 hover:bg-[#303030] hover:text-white border border-[#333]'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Content Rows */}
            <div id="now-showing" className="space-y-4">
              {/* Row 1: User's Requested Showing Movies */}
              <MovieRow
                title="Now Showing in Hyderabad"
                subtitle="The biggest blockbusters lighting up screens across Hyderabad multiplexes & single screens"
                movies={nowShowingMovies}
                onSelectMovie={(m) => setDetailMovie(m)}
                onBookMovie={handleOpenBooking}
              />

              {/* Row 2: Tollywood Action & Mass Euphoria */}
              {massMovies.length > 0 && (
                <MovieRow
                  title="Tollywood Mass Euphoria & Action"
                  subtitle="Electrifying crowd-pullers featuring Power Star, Mega Power Star, and Natural Star"
                  movies={massMovies}
                  onSelectMovie={(m) => setDetailMovie(m)}
                  onBookMovie={handleOpenBooking}
                />
              )}

              {/* Row 3: Heartfelt Romances & Melodies */}
              {romanceMovies.length > 0 && (
                <MovieRow
                  title="Love, Melodies & Nostalgia"
                  subtitle="Soulful journeys celebrating timeless romance and chartbuster music"
                  movies={romanceMovies}
                  onSelectMovie={(m) => setDetailMovie(m)}
                  onBookMovie={handleOpenBooking}
                />
              )}
            </div>

            {/* Hyderabad Theaters Showcase Section */}
            <section id="theaters-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
              <div className="bg-gradient-to-r from-[#1c1c1c] via-[#171717] to-[#141414] border border-[#2b2b2b] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 text-[#E50914] text-xs font-black uppercase tracking-wider font-cinematic">
                    <Sparkles className="w-4 h-4" />
                    <span>Hyderabad Cine Hub</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white text-netflix-bebas uppercase tracking-wide mt-1">
                    Iconic Hyderabad Theaters on Chitram
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mt-1">
                    Book instantly with live seat mapping across Hyderabad's most legendary screens—from Superstar Mahesh Babu's luxury AMB Cinemas to the massive 101.6ft Prasads PCX and the mass festival at Sudharshan 35mm RTC X Roads.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    <div className="bg-[#121212] p-4 rounded-xl border border-[#262626] hover:border-[#E50914] transition-all">
                      <div className="text-xs font-bold text-[#E50914]">Gachibowli</div>
                      <div className="text-base font-extrabold text-white mt-0.5">AMB Cinemas</div>
                      <p className="text-xs text-gray-400 mt-1">
                        Laser Dolby Atmos, VIP Recliner M-Lounge, and gourmet menu.
                      </p>
                    </div>

                    <div className="bg-[#121212] p-4 rounded-xl border border-[#262626] hover:border-[#E50914] transition-all">
                      <div className="text-xs font-bold text-blue-400">Khairatabad</div>
                      <div className="text-base font-extrabold text-white mt-0.5">Prasads Multiplex & PCX</div>
                      <p className="text-xs text-gray-400 mt-1">
                        South India's largest 101.6ft giant screen with dual 4K Laser.
                      </p>
                    </div>

                    <div className="bg-[#121212] p-4 rounded-xl border border-[#262626] hover:border-[#E50914] transition-all">
                      <div className="text-xs font-bold text-amber-400">RTC X Roads</div>
                      <div className="text-base font-extrabold text-white mt-0.5">Sudharshan 35mm & Devi 70mm</div>
                      <p className="text-xs text-gray-400 mt-1">
                        The heartbeat of Tollywood mass cinema with unparalleled fan celebrations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hyderabad Concessions Highlight */}
            <section id="fnb-specials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
              <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Popcorn className="w-4 h-4" />
                    <span>Concession Lounge</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Authentic Hyderabadi Cinema Combos
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Enjoy freshly brewed <strong>Dum Ki Irani Chai & crisp Osmania Biscuits</strong>, jumbo golden Caramel Popcorn, and crispy samosas delivered straight to your cinema seat.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-3xl sm:text-4xl bg-[#121212] p-4 rounded-xl border border-[#333]">
                  <span title="Caramel Popcorn">🍿</span>
                  <span title="Irani Chai">☕</span>
                  <span title="Loaded Nachos">🧀</span>
                  <span title="Hyderabadi Samosa">🥟</span>
                  <span title="Thums Up">🥤</span>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Netflix Styled Cinematic Footer */}
      <footer className="border-t border-[#222222] bg-[#0c0c0c] py-10 text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-[#E50914] text-netflix-bebas">
                CHITRAM
              </span>
              <span className="text-xs font-semibold text-gray-500">
                • Hyderabad, Telangana
              </span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cinema Guidelines</span>
              <span>Help Center</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-[#1a1a1a] text-gray-500">
            <p>© 2026 Chitram Media Networks Pvt. Ltd. All rights reserved. Localized for Hyderabad.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-[#E50914] fill-[#E50914]" /> for Telugu Cinema
            </p>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}
      {/* 1. Movie Details Modal */}
      {detailMovie && (
        <MovieDetailsModal
          movie={detailMovie}
          onClose={() => setDetailMovie(null)}
          onBookNow={handleOpenBooking}
        />
      )}

      {/* 2. Hyderabad Theater & Showtime Selector Modal */}
      {bookingMovie && (
        <HyderabadTheaterModal
          movie={bookingMovie}
          initialArea={selectedArea}
          onClose={() => setBookingMovie(null)}
          onSelectShowtime={handleSelectShowtime}
        />
      )}

      {/* 3. Interactive Seat Layout Modal */}
      {seatBookingSession && (
        <SeatLayoutModal
          bookingSession={seatBookingSession}
          onClose={() => setSeatBookingSession(null)}
          onProceedToFnb={handleProceedToFnb}
        />
      )}

      {/* 4. Concessions & F&B Modal */}
      {fnbBookingSession && (
        <FnbSelectorModal
          bookingSession={fnbBookingSession}
          onClose={() => setFnbBookingSession(null)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* 5. Payment Modal */}
      {paymentBookingSession && (
        <PaymentModal
          bookingSession={paymentBookingSession}
          onClose={() => setPaymentBookingSession(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* 6. Digital QR Ticket Pass Modal */}
      {confirmedBooking && (
        <DigitalTicketModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}

      {/* 7. My Bookings History Modal */}
      {showMyBookings && (
        <MyBookingsModal
          bookings={myBookings}
          onClose={() => setShowMyBookings(false)}
          onViewTicket={(b) => {
            setShowMyBookings(false);
            setConfirmedBooking(b);
          }}
        />
      )}
    </div>
  );
}
