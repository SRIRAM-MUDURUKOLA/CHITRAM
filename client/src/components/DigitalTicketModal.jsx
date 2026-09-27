import React from 'react';
import { X, CheckCircle2, Download, Printer, MapPin, Calendar, Clock, Sparkles, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function DigitalTicketModal({ booking, onClose }) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-md bg-[#161616] border border-[#333333] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(229,9,20,0.3)] my-6 flex flex-col">
        
        {/* Top Status Header */}
        <div className="bg-[#E50914] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="font-extrabold text-xs uppercase tracking-wider font-cinematic text-sm">
              Booking Confirmed • Chitram Pass
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Pass Body */}
        <div id="printable-ticket" className="p-6 space-y-5 bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
          
          {/* Movie Header */}
          <div className="flex items-start gap-4">
            <img
              src={booking.moviePoster}
              alt={booking.movieTitle}
              className="w-16 h-24 object-cover rounded-lg shadow-md border border-white/10 shrink-0"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Ref ID: <span className="text-white font-mono">{booking.bookingId}</span>
              </span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight mt-0.5">
                {booking.movieTitle}
              </h2>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">
                Telugu • 4K Dolby Atmos
              </p>
              <div className="mt-2 text-xs text-gray-300 font-medium flex items-center gap-1.5">
                <span className="bg-[#242424] px-2 py-0.5 rounded text-[11px] text-gray-200">
                  {booking.screenName}
                </span>
              </div>
            </div>
          </div>

          {/* Hyderabad Theater & Venue Info */}
          <div className="bg-[#1f1f1f] p-3.5 rounded-xl border border-[#2e2e2e] space-y-2">
            <div className="flex items-start space-x-2 text-xs">
              <MapPin className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">{booking.theaterName}</strong>
                <p className="text-gray-400 text-[11px] leading-snug">{booking.theaterAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2a2a2a] text-xs">
              <div className="flex items-center space-x-1.5 text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold">{booking.showDate}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-gray-300 justify-end">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-extrabold text-white">{booking.showTime}</span>
              </div>
            </div>
          </div>

          {/* Seats Badge List */}
          <div className="bg-[#1c1c1c] p-3.5 rounded-xl border border-[#2e2e2e] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-gray-400 font-bold block">
                Reserved Seats ({booking.seats?.length})
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {booking.seats?.map((seat) => (
                  <span
                    key={seat.code}
                    className="bg-[#E50914]/20 border border-[#E50914] text-[#E50914] font-black text-xs px-2.5 py-0.5 rounded"
                  >
                    {seat.code} ({seat.tier})
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase text-gray-400 font-bold block">
                Total Paid
              </span>
              <span className="text-base font-black text-emerald-400 font-mono">
                ₹{booking.totalAmount}
              </span>
            </div>
          </div>

          {/* F&B note if ordered */}
          {booking.fnb?.length > 0 && (
            <div className="bg-[#1a1a1a] p-2.5 rounded-lg border border-[#2b2b2b] text-[11px] text-gray-300">
              <span className="font-bold text-amber-400">Included Snacks: </span>
              {booking.fnb.map(f => `${f.qty}x ${f.name}`).join(', ')}
            </div>
          )}

          {/* Perforated Divider Bar */}
          <div className="relative py-2 flex items-center justify-between">
            <div className="absolute -left-9 w-6 h-6 rounded-full bg-black/90 border-r border-[#333]" />
            <div className="w-full border-t-2 border-dashed border-[#333]" />
            <div className="absolute -right-9 w-6 h-6 rounded-full bg-black/90 border-l border-[#333]" />
          </div>

          {/* QR Code & Gate Entry Pass */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="bg-white p-2 rounded-xl shadow-inner shrink-0">
              <QRCodeSVG
                value={booking.qrData || `CHITRAM-${booking.bookingId}`}
                size={85}
                level="M"
              />
            </div>

            <div className="space-y-1 text-right">
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
                VERIFIED TICKET
              </span>
              <p className="text-[11px] text-gray-400 leading-snug">
                Scan at theater entrance turnstile or show to usher at Audi gate.
              </p>
              <p className="text-[10px] text-gray-500 font-mono">
                Issued for {booking.customer?.name}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Action Buttons */}
        <div className="p-4 bg-[#141414] border-t border-[#262626] flex items-center justify-between gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-[#252525] hover:bg-[#333] text-gray-200 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all border border-[#383838]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-[#E50914] hover:bg-[#b81d24] text-white py-2 px-4 rounded-lg text-xs font-bold transition-all shadow active:scale-95 text-center"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
