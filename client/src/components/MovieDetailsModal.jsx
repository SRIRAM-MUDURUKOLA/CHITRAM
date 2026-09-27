import React from 'react';
import { X, Play, Ticket, Star, Clock, Calendar, Film, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export default function MovieDetailsModal({ movie, onClose, onBookNow }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#181818] border border-[#333333] rounded-xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-gray-300 hover:text-white transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop Preview */}
        <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-black">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />
          
          {/* Quick Floating Play / Trailer Badge */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#E50914] text-white text-xs font-black px-2 py-0.5 rounded font-cinematic uppercase tracking-wider">
                  Chitram Exclusive
                </span>
                <span className="bg-black/60 backdrop-blur text-yellow-400 text-xs font-bold px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  {movie.rating} / 10 ({movie.votes})
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white text-netflix-bebas drop-shadow-lg">
                {movie.title}
              </h2>
              <p className="text-base text-amber-400 font-semibold">
                {movie.teluguTitle} <span className="text-gray-400 text-sm font-normal">• {movie.tagline}</span>
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookNow(movie);
              }}
              className="flex items-center justify-center space-x-2 bg-[#E50914] hover:bg-[#b81d24] text-white px-7 py-3 rounded-lg font-bold text-sm sm:text-base shadow-[0_4px_25px_rgba(229,9,20,0.5)] transition-all active:scale-95 shrink-0"
            >
              <Ticket className="w-5 h-5" />
              <span>Book Tickets</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Formats, Duration & Certificate Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-300 pb-4 border-b border-[#282828]">
            <span className="border border-gray-600 bg-[#222] px-2.5 py-1 rounded font-bold">
              {movie.certificate}
            </span>
            <span className="flex items-center gap-1 text-gray-300">
              <Clock className="w-4 h-4 text-gray-400" />
              {movie.duration}
            </span>
            <span className="text-gray-600">•</span>
            <span>{movie.languages?.join(', ')}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300 font-medium">{movie.genres?.join(', ')}</span>
            
            <div className="ml-auto flex items-center gap-1.5">
              {movie.formats?.map((fmt) => (
                <span
                  key={fmt}
                  className="bg-[#282828] text-gray-300 text-xs px-2.5 py-1 rounded border border-[#383838]"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">
              About The Movie
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {movie.synopsis}
            </p>
          </div>

          {/* Cast & Crew Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#141414] p-4 rounded-lg border border-[#262626]">
            <div>
              <span className="text-xs uppercase text-gray-500 font-bold block mb-1">
                Director
              </span>
              <p className="text-sm font-medium text-white">{movie.director || "Tollywood Master Craftsman"}</p>
            </div>
            <div>
              <span className="text-xs uppercase text-gray-500 font-bold block mb-1">
                Music & Background Score
              </span>
              <p className="text-sm font-medium text-white">{movie.music || "Acclaimed Composer"}</p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs uppercase text-gray-500 font-bold block mb-1">
                Starring Cast
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {movie.cast?.map((actor) => (
                  <span
                    key={actor}
                    className="bg-[#222222] text-gray-200 text-xs px-3 py-1 rounded-full border border-[#333]"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hyderabad Theaters Playing Alert */}
          <div className="flex items-center space-x-3 bg-[#E50914]/10 border border-[#E50914]/30 p-3.5 rounded-lg text-xs sm:text-sm text-gray-200">
            <MapPin className="w-5 h-5 text-[#E50914] shrink-0" />
            <div>
              <span className="font-bold text-white">Showing across Hyderabad: </span>
              AMB Cinemas Gachibowli, Prasads PCX Khairatabad, AAA Cinemas Ameerpet, Sudharshan 35mm RTC X Roads, and PVR Inorbit.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
