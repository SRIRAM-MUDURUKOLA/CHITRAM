import React from 'react';
import { X, Ticket, Calendar, Clock, MapPin, QrCode, ChevronRight } from 'lucide-react';

export default function MyBookingsModal({
  bookings = [],
  onClose,
  onViewTicket
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#303030] rounded-xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#181818] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ticket className="w-5 h-5 text-[#E50914]" />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              My Chitram Bookings ({bookings.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#242424] hover:bg-[#333] text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Ticket className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No movie tickets booked yet</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                Explore our Now Showing Tollywood blockbusters and book your favorite seats across Hyderabad!
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-[#1a1a1a] hover:bg-[#1f1f1f] border border-[#2b2b2b] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-start space-x-3.5">
                  <img
                    src={b.moviePoster}
                    alt={b.movieTitle}
                    className="w-12 h-16 object-cover rounded shadow border border-white/10 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono">{b.bookingId}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold uppercase">
                        {b.paymentStatus || 'CONFIRMED'}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-white text-base mt-0.5">
                      {b.movieTitle}
                    </h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {b.theaterName} • <span className="text-gray-400">{b.screenName}</span>
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#E50914]" /> {b.showDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#E50914]" /> {b.showTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-[#262626] gap-2">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 block">Seats</span>
                    <span className="text-xs font-bold text-white">
                      {b.seats?.map(s => s.code).join(', ')}
                    </span>
                  </div>

                  <button
                    onClick={() => onViewTicket(b)}
                    className="flex items-center space-x-1.5 bg-[#E50914]/20 hover:bg-[#E50914] text-[#E50914] hover:text-white border border-[#E50914]/50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR Pass</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
