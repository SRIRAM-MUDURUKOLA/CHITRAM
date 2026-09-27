import React, { useState } from 'react';
import { Play, Info, Ticket, Volume2, VolumeX, Sparkles, MapPin, Star } from 'lucide-react';

export default function HeroBanner({ movie, onBookClick, onDetailsClick }) {
  const [muted, setMuted] = useState(true);

  if (!movie) return null;

  return (
    <div className="relative w-full h-[78vh] min-h-[520px] max-h-[760px] overflow-hidden select-none">
      {/* Background Poster & Hero Backdrop */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic Vignette & Netflix Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20 z-20">
        <div className="max-w-2xl space-y-4">
          
          {/* Top Series / Exclusive Tag */}
          <div className="flex items-center space-x-2.5">
            <span className="text-[#E50914] font-black text-xs sm:text-sm tracking-widest uppercase flex items-center gap-1.5 font-cinematic">
              <span className="bg-[#E50914] text-white px-1.5 py-0.5 rounded text-[11px] font-black tracking-normal">
                C
              </span>
              CHITRAM PREMIERE • HYDERABAD EXCLUSIVE
            </span>
            <span className="hidden sm:inline text-xs text-yellow-400 bg-yellow-950/60 border border-yellow-500/40 px-2 py-0.5 rounded font-medium flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400" />
              {movie.rating} / 10 ({movie.votes})
            </span>
          </div>

          {/* Huge Movie Title */}
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] uppercase text-netflix-bebas leading-none">
              {movie.title}
            </h1>
            <div className="text-gray-300 font-semibold text-sm sm:text-base tracking-wide mt-1 flex items-center gap-2">
              <span className="text-amber-400 font-medium">({movie.teluguTitle})</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">{movie.genres?.join(', ')}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">{movie.duration}</span>
            </div>
          </div>

          {/* Tagline & Synopsis */}
          <p className="text-xs sm:text-sm md:text-base text-gray-300/90 leading-relaxed line-clamp-3 max-w-xl drop-shadow-md">
            {movie.synopsis}
          </p>

          {/* Formats & Location Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-gray-300">
            <span className="border border-gray-600 bg-black/50 px-2 py-0.5 rounded">
              {movie.certificate}
            </span>
            {movie.formats?.map((fmt) => (
              <span
                key={fmt}
                className={`px-2 py-0.5 rounded border ${
                  fmt.includes('IMAX')
                    ? 'border-blue-500/80 bg-blue-950/50 text-blue-300'
                    : fmt.includes('Atmos')
                    ? 'border-emerald-500/80 bg-emerald-950/50 text-emerald-300'
                    : 'border-gray-700 bg-black/40 text-gray-300'
                }`}
              >
                {fmt}
              </span>
            ))}
            <span className="flex items-center gap-1 text-gray-400 ml-1">
              <MapPin className="w-3 h-3 text-[#E50914]" />
              Playing in AMB, Prasads PCX, AAA & RTC X Roads
            </span>
          </div>

          {/* Hero Action Buttons (Netflix Style: Play / More Info) */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => onBookClick(movie)}
              className="flex items-center space-x-2 bg-[#E50914] hover:bg-[#b81d24] text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded text-sm sm:text-base font-bold transition-all shadow-[0_4px_20px_rgba(229,9,20,0.4)] active:scale-95 group"
            >
              <Ticket className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Book Tickets</span>
            </button>

            <button
              onClick={() => onDetailsClick(movie)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded text-sm sm:text-base font-bold transition-all active:scale-95 border border-white/20"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>

        </div>
      </div>

      {/* Right Floating Audio Indicator (purely aesthetic Netflix style) */}
      <div className="absolute right-6 sm:right-12 bottom-20 hidden md:flex items-center space-x-3 z-20">
        <button
          onClick={() => setMuted(!muted)}
          className="p-2.5 rounded-full border border-gray-500/60 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-gray-200 hover:text-white transition-colors"
          title={muted ? 'Unmute preview sound' : 'Mute'}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E50914]" />}
        </button>
        <span className="bg-black/60 border-l-2 border-[#E50914] px-3 py-1 text-xs font-semibold text-gray-200">
          U/A 16+
        </span>
      </div>
    </div>
  );
}
