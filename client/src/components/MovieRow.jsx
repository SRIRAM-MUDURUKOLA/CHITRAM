import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Ticket, Star, Info } from 'lucide-react';

export default function MovieRow({
  title,
  subtitle,
  movies,
  onSelectMovie,
  onBookMovie
}) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative my-8 px-4 sm:px-6 lg:px-8 group/row">
      {/* Row Header */}
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#E50914] rounded-full inline-block" />
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5 ml-3.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Row Container with Navigation Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-full w-10 sm:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 backdrop-blur-sm rounded-r"
        >
          <ChevronLeft className="w-7 h-7 hover:scale-125 transition-transform" />
        </button>

        {/* Poster Cards Carousel */}
        <div
          ref={rowRef}
          className="flex space-x-3 sm:space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-[180px] sm:w-[220px] md:w-[240px] group/card relative rounded-md overflow-hidden bg-[#181818] border border-[#262626] hover:border-[#E50914] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(229,9,20,0.35)] cursor-pointer"
              onClick={() => onSelectMovie(movie)}
            >
              {/* Poster Image Container */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Netflix Red Top-Left 'C' Ribbon */}
                <div className="absolute top-2 left-2 flex items-center space-x-1">
                  <span className="bg-[#E50914] text-white text-[11px] font-black px-1.5 py-0.5 rounded font-cinematic shadow-md">
                    C
                  </span>
                  {movie.isTrending && (
                    <span className="bg-amber-500 text-black text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-wider shadow">
                      Trending
                    </span>
                  )}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm text-yellow-400 text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-white/10">
                  <Star className="w-3 h-3 fill-yellow-400" />
                  {movie.rating}
                </div>

                {/* Bottom Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              </div>

              {/* Card Footer Details */}
              <div className="p-3 bg-[#181818]">
                <div className="flex items-start justify-between gap-1">
                  <div className="truncate">
                    <h3 className="font-bold text-sm text-white truncate group-hover/card:text-[#E50914] transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 truncate">
                      {movie.teluguTitle}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 border border-gray-700 px-1 py-0.5 rounded shrink-0">
                    {movie.certificate}
                  </span>
                </div>

                {/* Genres & Language */}
                <div className="mt-2 text-[11px] text-gray-400 flex items-center gap-1.5 truncate">
                  <span className="text-gray-300">{movie.genres?.slice(0, 2).join(' • ')}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-400">{movie.duration}</span>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-3 pt-2 border-t border-[#262626] flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookMovie(movie);
                    }}
                    className="flex-1 flex items-center justify-center space-x-1.5 bg-[#E50914] hover:bg-[#b81d24] text-white py-1.5 px-2 rounded text-xs font-bold transition-all shadow active:scale-95"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMovie(movie);
                    }}
                    className="p-1.5 rounded bg-[#2a2a2a] hover:bg-[#383838] text-gray-300 hover:text-white transition-colors"
                    title="Movie Information"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-full w-10 sm:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 backdrop-blur-sm rounded-l"
        >
          <ChevronRight className="w-7 h-7 hover:scale-125 transition-transform" />
        </button>
      </div>
    </section>
  );
}
