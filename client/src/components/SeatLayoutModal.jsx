import React, { useState } from 'react';
import { X, Armchair, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';

const ROWS = [
  { row: 'A', tier: 'Recliner', price: 350, seats: 10, offset: 2 },
  { row: 'B', tier: 'Prime', price: 220, seats: 12, offset: 1 },
  { row: 'C', tier: 'Prime', price: 220, seats: 12, offset: 1 },
  { row: 'D', tier: 'Prime', price: 220, seats: 12, offset: 1 },
  { row: 'E', tier: 'Classic', price: 150, seats: 14, offset: 0 },
  { row: 'F', tier: 'Classic', price: 150, seats: 14, offset: 0 },
  { row: 'G', tier: 'Classic', price: 150, seats: 14, offset: 0 },
];

export default function SeatLayoutModal({
  bookingSession, // { movie, theater, show }
  onClose,
  onProceedToFnb
}) {
  const { movie, theater, show } = bookingSession;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const bookedSeats = new Set(show.bookedSeats || []);

  const handleSeatClick = (seatCode, tier, price) => {
    setErrorMsg('');
    if (bookedSeats.has(seatCode)) return;

    const exists = selectedSeats.find(s => s.code === seatCode);
    if (exists) {
      setSelectedSeats(selectedSeats.filter(s => s.code !== seatCode));
    } else {
      if (selectedSeats.length >= 8) {
        setErrorMsg('Maximum 8 tickets allowed per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, { code: seatCode, tier, price }]);
    }
  };

  const totalTicketPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#141414] border border-[#2e2e2e] rounded-xl overflow-hidden shadow-2xl my-4 flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#181818] border-b border-[#282828] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#E50914] text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase font-cinematic">
                {show.screenName}
              </span>
              <span className="text-xs text-gray-300 font-semibold">{theater.name}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase mt-0.5">
              {movie.title} <span className="text-amber-400 text-xs font-normal">({show.format} • {show.time} • {show.date})</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#242424] hover:bg-[#333] text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Seating Canvas Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Cinema Screen Curve */}
          <div className="w-full max-w-md mx-auto text-center space-y-2 pt-2">
            <div className="screen-glow mx-auto w-4/5" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
              All Eyes This Way • Cinema Screen
            </p>
          </div>

          {/* Seat Rows by Tier */}
          <div className="space-y-6 pt-2">
            {/* VIP Recliner Tier */}
            <div className="bg-[#181818]/60 p-3 rounded-lg border border-[#222]">
              <div className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>VIP Recliners — ₹350</span>
                <span className="text-gray-400 font-normal">Row A</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                {ROWS.filter(r => r.tier === 'Recliner').map(row => (
                  <div key={row.row} className="flex items-center gap-2">
                    <span className="w-4 text-xs font-bold text-gray-400 text-center">{row.row}</span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {Array.from({ length: row.seats }, (_, i) => {
                        const seatNum = i + 1;
                        const seatCode = `${row.row}${seatNum}`;
                        const isBooked = bookedSeats.has(seatCode);
                        const isSelected = selectedSeats.some(s => s.code === seatCode);

                        return (
                          <React.Fragment key={seatCode}>
                            {/* Aisle gap after half */}
                            {i === Math.floor(row.seats / 2) && <div className="w-4 sm:w-8" />}
                            <button
                              disabled={isBooked}
                              onClick={() => handleSeatClick(seatCode, row.tier, row.price)}
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center ${
                                isBooked
                                  ? 'bg-[#222] text-gray-600 cursor-not-allowed border border-transparent'
                                  : isSelected
                                  ? 'bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.8)] scale-110 border border-[#ff4757]'
                                  : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-yellow-400/90 border border-yellow-500/30 hover:border-yellow-400'
                              }`}
                              title={`Seat ${seatCode} - ₹${row.price}`}
                            >
                              {seatNum}
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <span className="w-4 text-xs font-bold text-gray-400 text-center">{row.row}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prime Lounge Tier */}
            <div className="bg-[#181818]/60 p-3 rounded-lg border border-[#222]">
              <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Prime Lounge — ₹220</span>
                <span className="text-gray-400 font-normal">Rows B - D</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                {ROWS.filter(r => r.tier === 'Prime').map(row => (
                  <div key={row.row} className="flex items-center gap-2">
                    <span className="w-4 text-xs font-bold text-gray-400 text-center">{row.row}</span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {Array.from({ length: row.seats }, (_, i) => {
                        const seatNum = i + 1;
                        const seatCode = `${row.row}${seatNum}`;
                        const isBooked = bookedSeats.has(seatCode);
                        const isSelected = selectedSeats.some(s => s.code === seatCode);

                        return (
                          <React.Fragment key={seatCode}>
                            {i === Math.floor(row.seats / 2) && <div className="w-4 sm:w-8" />}
                            <button
                              disabled={isBooked}
                              onClick={() => handleSeatClick(seatCode, row.tier, row.price)}
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center ${
                                isBooked
                                  ? 'bg-[#222] text-gray-600 cursor-not-allowed border border-transparent'
                                  : isSelected
                                  ? 'bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.8)] scale-110 border border-[#ff4757]'
                                  : 'bg-[#262626] hover:bg-[#363636] text-blue-300 border border-blue-500/20 hover:border-blue-400'
                              }`}
                              title={`Seat ${seatCode} - ₹${row.price}`}
                            >
                              {seatNum}
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <span className="w-4 text-xs font-bold text-gray-400 text-center">{row.row}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Classic Experience Tier */}
            <div className="bg-[#181818]/60 p-3 rounded-lg border border-[#222]">
              <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Classic Experience — ₹150</span>
                <span className="text-gray-400 font-normal">Rows E - G</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                {ROWS.filter(r => r.tier === 'Classic').map(row => (
                  <div key={row.row} className="flex items-center gap-2">
                    <span className="w-4 text-xs font-bold text-gray-400 text-center">{row.row}</span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {Array.from({ length: row.seats }, (_, i) => {
                        const seatNum = i + 1;
                        const seatCode = `${row.row}${seatNum}`;
                        const isBooked = bookedSeats.has(seatCode);
                        const isSelected = selectedSeats.some(s => s.code === seatCode);

                        return (
                          <React.Fragment key={seatCode}>
                            {i === Math.floor(row.seats / 2) && <div className="w-4 sm:w-8" />}
                            <button
                              disabled={isBooked}
                              onClick={() => handleSeatClick(seatCode, row.tier, row.price)}
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center ${
                                isBooked
                                  ? 'bg-[#222] text-gray-600 cursor-not-allowed border border-transparent'
                                  : isSelected
                                  ? 'bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.8)] scale-110 border border-[#ff4757]'
                                  : 'bg-[#242424] hover:bg-[#333] text-gray-300 border border-gray-700 hover:border-gray-500'
                              }`}
                              title={`Seat ${seatCode} - ₹${row.price}`}
                            >
                              {seatNum}
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <span className="w-4 text-xs font-bold text-gray-400 text-center">{row.row}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seat Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 pt-2 border-t border-[#222]">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-[#2a2a2a] border border-gray-600" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-[#E50914] shadow-[0_0_8px_rgba(229,9,20,0.6)]" />
              <span className="text-white font-medium">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-[#222] border border-zinc-800" />
              <span>Sold / Reserved</span>
            </div>
          </div>

          {errorMsg && (
            <div className="text-center text-xs text-red-400 font-semibold bg-red-950/40 border border-red-800/50 p-2 rounded">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Footer with Price and Proceed */}
        <div className="p-4 bg-[#181818] border-t border-[#282828] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-gray-400">
              Selected Seats ({selectedSeats.length}):
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {selectedSeats.length > 0 ? (
                <>
                  <span className="text-[#E50914]">{selectedSeats.map(s => s.code).join(', ')}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-white font-extrabold text-lg">₹{totalTicketPrice}</span>
                </>
              ) : (
                <span className="text-gray-500 italic">Please select at least 1 seat</span>
              )}
            </div>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={() => onProceedToFnb({ ...bookingSession, selectedSeats, totalTicketPrice })}
            className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg ${
              selectedSeats.length > 0
                ? 'bg-[#E50914] hover:bg-[#b81d24] text-white shadow-[0_4px_20px_rgba(229,9,20,0.4)] active:scale-95'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Add Snacks & Concessions</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
