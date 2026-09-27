import React, { useState, useEffect } from 'react';
import { Search, MapPin, Ticket, ChevronDown, Bell, Film, X } from 'lucide-react';

export const HYDERABAD_AREAS = [
  "All Areas",
  "Gachibowli",
  "Khairatabad",
  "Ameerpet",
  "RTC X Roads",
  "Hitec City",
  "Uppal"
];

export default function Navbar({
  selectedArea,
  onSelectArea,
  searchQuery,
  onSearchChange,
  onOpenMyBookings,
  bookingCount = 0,
  onSelectMovie
}) {
  const [scrolled, setScrolled] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-[#282828]'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo & Hyderabad Location */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          {/* Chitram Netflix-style Brand Logo */}
          <a
            href="#"
            className="flex items-center space-x-2 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-3xl sm:text-4xl font-black tracking-tighter text-[#E50914] text-netflix-bebas drop-shadow-[0_2px_12px_rgba(229,9,20,0.6)]">
              CHITRAM
            </span>
            <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/40 rounded">
              Hyderabad
            </span>
          </a>

          {/* Hyderabad Area Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setShowAreaDropdown(!showAreaDropdown)}
              className="flex items-center space-x-1.5 bg-[#222222]/80 hover:bg-[#2e2e2e] text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-[#383838] transition-all shadow-sm"
              title="Select Cinema Zone in Hyderabad"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
              <span className="font-medium text-gray-200">Hyderabad:</span>
              <span className="text-white font-bold max-w-[90px] truncate sm:max-w-none">
                {selectedArea}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {showAreaDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowAreaDropdown(false)}
                />
                <div className="absolute left-0 mt-2 w-48 bg-[#181818] border border-[#333333] rounded-lg shadow-2xl py-1.5 z-50 backdrop-blur-lg">
                  <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-[#282828]">
                    Hyderabad Zones
                  </div>
                  {HYDERABAD_AREAS.map((area) => (
                    <button
                      key={area}
                      onClick={() => {
                        onSelectArea(area);
                        setShowAreaDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#2a2a2a] transition-colors ${
                        selectedArea === area
                          ? 'text-[#E50914] font-bold bg-[#E50914]/10'
                          : 'text-gray-300'
                      }`}
                    >
                      <span>{area}</span>
                      {area === "RTC X Roads" && (
                        <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-1 rounded">Mass Hub</span>
                      )}
                      {area === "Gachibowli" && (
                        <span className="text-[10px] text-blue-400 font-mono bg-blue-950/60 px-1 rounded">AMB</span>
                      )}
                      {area === "Khairatabad" && (
                        <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-1 rounded">PCX IMAX</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center / Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs tracking-wide text-gray-300 font-medium">
          <a href="#now-showing" className="hover:text-white transition-colors">
            Now Showing
          </a>
          <a href="#theaters-section" className="hover:text-white transition-colors">
            Hyderabad Theaters
          </a>
          <a href="#fnb-specials" className="hover:text-white transition-colors">
            Chitram F&B Combos
          </a>
        </nav>

        {/* Right: Search, Notifications & My Bookings */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Netflix-style Expandable Search */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-[#1f1f1f] border border-[#444] rounded-full px-3 py-1.5 transition-all w-44 sm:w-64">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search movies, actors..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-white text-xs w-full focus:outline-none placeholder-gray-500"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-gray-400 hover:text-white ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-[#252525]"
                title="Search movies"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* My Bookings Button with Badge */}
          <button
            onClick={onOpenMyBookings}
            className="flex items-center space-x-2 bg-[#E50914] hover:bg-[#b81d24] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-md active:scale-95 group"
          >
            <Ticket className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="hidden sm:inline">My Tickets</span>
            {bookingCount > 0 && (
              <span className="bg-white text-[#E50914] text-[11px] font-black rounded-full px-1.5 py-0.2 leading-tight">
                {bookingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
