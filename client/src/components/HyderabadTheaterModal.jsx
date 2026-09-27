import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Clock, Info, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { HYDERABAD_AREAS } from './Navbar';
import { getTheatersForMovie } from '../services/api';

const DATES = [
  { id: "Today", label: "Today", date: "22 Sep" },
  { id: "Tomorrow", label: "Tomorrow", date: "23 Sep" },
  { id: "Wednesday, 24 Sep", label: "Wed", date: "24 Sep" }
];

export default function HyderabadTheaterModal({
  movie,
  initialArea = "All Areas",
  onClose,
  onSelectShowtime
}) {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie) return;
    let isMounted = true;
    setLoading(true);

    getTheatersForMovie(movie.id, selectedDate, selectedArea)
      .then(data => {
        if (isMounted) {
          setTheaters(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [movie, selectedDate, selectedArea]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#141414] border border-[#303030] rounded-xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[90vh]">
        
        {/* Header with Movie Info & Close */}
        <div className="p-5 bg-gradient-to-r from-[#1c1c1c] to-[#141414] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-12 h-16 object-cover rounded shadow border border-white/10"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#E50914] text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase font-cinematic">
                  Chitram Shows
                </span>
                <span className="text-xs text-gray-400">Hyderabad Theaters</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                {movie.title} <span className="text-amber-400 text-sm font-normal">({movie.teluguTitle})</span>
              </h2>
              <p className="text-xs text-gray-400">
                {movie.certificate} • {movie.genres?.join(', ')} • {movie.duration}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#252525] hover:bg-[#333] text-gray-300 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Selector Tabs */}
        <div className="px-5 py-3 bg-[#181818] border-b border-[#282828] flex items-center justify-between overflow-x-auto no-scrollbar gap-3">
          <div className="flex items-center space-x-2">
            {DATES.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedDate(item.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center min-w-[75px] ${
                  selectedDate === item.id
                    ? 'bg-[#E50914] text-white shadow-[0_2px_12px_rgba(229,9,20,0.4)]'
                    : 'bg-[#222222] text-gray-400 hover:text-white hover:bg-[#2c2c2c]'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold opacity-80">{item.label}</span>
                <span className="text-sm font-black">{item.date}</span>
              </button>
            ))}
          </div>

          {/* Area Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Zone:
            </span>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="bg-[#242424] text-white text-xs px-3 py-2 rounded-lg border border-[#383838] focus:outline-none focus:border-[#E50914]"
            >
              {HYDERABAD_AREAS.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Theaters List Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <div className="w-8 h-8 border-3 border-[#E50914] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm">Fetching Hyderabad showtimes & seat availability...</p>
            </div>
          ) : theaters.length === 0 ? (
            <div className="text-center py-16 bg-[#181818] rounded-xl border border-[#282828] p-6">
              <MapPin className="w-10 h-10 text-gray-500 mx-auto mb-2" />
              <h3 className="text-base font-bold text-white">No showtimes found in this area</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                Try selecting "All Areas" to explore shows at AMB Cinemas, Prasads PCX, AAA Cinemas, or Sudharshan 35mm.
              </p>
              <button
                onClick={() => setSelectedArea("All Areas")}
                className="mt-4 px-4 py-1.5 bg-[#E50914] text-white text-xs font-bold rounded-full"
              >
                Show All Hyderabad Theaters
              </button>
            </div>
          ) : (
            theaters.map((theater) => (
              <div
                key={theater.id}
                className="bg-[#1a1a1a] hover:bg-[#1e1e1e] border border-[#2b2b2b] rounded-xl p-4 sm:p-5 transition-all shadow-sm"
              >
                {/* Theater Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#282828]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-white hover:text-[#E50914] transition-colors">
                        {theater.name}
                      </h3>
                      {theater.badge && (
                        <span className="text-[10px] font-bold bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/40 px-2 py-0.5 rounded">
                          {theater.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                      <span>{theater.address}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400 font-medium">{theater.distance}</span>
                    </p>
                  </div>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {theater.amenities?.slice(0, 2).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[10px] text-gray-300 bg-[#252525] px-2 py-0.5 rounded border border-[#333]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Showtimes Grid */}
                <div className="pt-3 flex flex-wrap gap-2.5 sm:gap-3">
                  {theater.shows?.map((show) => {
                    const isAlmostFull = show.status === 'Almost Full';
                    const isFastFilling = show.status === 'Fast Filling';

                    return (
                      <button
                        key={show.id}
                        onClick={() => onSelectShowtime({ movie, theater, show })}
                        className="group relative flex flex-col items-center bg-[#242424] hover:bg-[#E50914] hover:text-white border border-[#383838] hover:border-[#E50914] rounded-lg px-3.5 py-2 transition-all shadow active:scale-95 text-left min-w-[105px]"
                      >
                        <div className="flex items-center gap-1 text-sm font-black text-white group-hover:text-white">
                          <Clock className="w-3 h-3 text-gray-400 group-hover:text-white" />
                          <span>{show.time}</span>
                        </div>

                        <div className="text-[10px] text-gray-400 group-hover:text-white/90 font-medium mt-0.5">
                          {show.format}
                        </div>

                        {/* Status indicator */}
                        <div className="mt-1 flex items-center gap-1">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isAlmostFull
                                ? 'bg-red-500'
                                : isFastFilling
                                ? 'bg-amber-400'
                                : 'bg-emerald-400'
                            }`}
                          />
                          <span
                            className={`text-[9px] font-semibold uppercase ${
                              isAlmostFull
                                ? 'text-red-400 group-hover:text-white'
                                : isFastFilling
                                ? 'text-amber-400 group-hover:text-white'
                                : 'text-emerald-400 group-hover:text-white'
                            }`}
                          >
                            {show.status}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-[#111] border-t border-[#242424] flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Fast Filling
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Almost Full
            </span>
          </div>
          <span className="text-gray-500 hidden sm:inline">Prices from ₹150 (Classic) to ₹350 (VIP Recliner)</span>
        </div>

      </div>
    </div>
  );
}
