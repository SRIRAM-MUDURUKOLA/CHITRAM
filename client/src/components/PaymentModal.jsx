import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, ShieldCheck, CheckCircle2, Loader2, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createBooking } from '../services/api';

export default function PaymentModal({
  bookingSession,
  onClose,
  onBookingSuccess
}) {
  const { movie, theater, show, selectedSeats, totalTicketPrice, fnb = [], totalFnbPrice = 0 } = bookingSession;
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('bhanu@okhdfcbank');
  const [customerName, setCustomerName] = useState('Bhanu Prakash');
  const [customerPhone, setCustomerPhone] = useState('+91 98480 22338');
  const [customerEmail, setCustomerEmail] = useState('cinephile@chitram.hyd');
  
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const convenienceFee = 35.40;
  const gst = 18.00;
  const grandTotal = Math.round(totalTicketPrice + totalFnbPrice + convenienceFee + gst);

  const handlePayNow = async (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      const payload = {
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster,
        theaterId: theater.id,
        theaterName: theater.name,
        theaterAddress: theater.address,
        showtimeId: show.id,
        showDate: show.date,
        showTime: show.time,
        screenName: show.screenName,
        seats: selectedSeats,
        fnb: fnb,
        ticketAmount: totalTicketPrice,
        fnbAmount: totalFnbPrice,
        convenienceFee,
        gst,
        totalAmount: grandTotal,
        customer: {
          name: customerName,
          phone: customerPhone,
          email: customerEmail
        },
        paymentMethod: paymentMethod.toUpperCase()
      };

      // Simulate a realistic gateway delay (1.2s)
      await new Promise(resolve => setTimeout(resolve, 1200));

      const bookedData = await createBooking(payload);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E50914', '#ffffff', '#f59e0b']
      });

      setProcessing(false);
      onBookingSuccess(bookedData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Payment processing failed. Please retry.');
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#333333] rounded-xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#181818] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914]" />
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
              Order Summary & Checkout
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={processing}
            className="p-2 rounded-full bg-[#242424] hover:bg-[#333] text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-sm">
          
          {/* Cinema & Movie Summary Card */}
          <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2c2c2c] flex items-start gap-3.5">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-14 h-20 object-cover rounded shadow border border-white/10 shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-white text-base">
                  {movie.title}
                </h3>
                <span className="text-xs bg-[#242424] text-[#E50914] font-bold px-2 py-0.5 rounded border border-[#E50914]/30">
                  {show.format}
                </span>
              </div>
              <p className="text-xs text-amber-400 font-medium">{movie.teluguTitle}</p>
              
              <p className="text-xs text-gray-300 font-medium mt-1">
                {theater.name} • <span className="text-gray-400">{show.screenName}</span>
              </p>
              <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                <span>{show.date}</span>
                <span>•</span>
                <span className="text-white font-bold">{show.time}</span>
              </div>
            </div>
          </div>

          {/* Seat & Concessions Breakdown */}
          <div className="bg-[#181818] p-4 rounded-xl border border-[#282828] space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#262626]">
              <span className="text-gray-400">
                Seats ({selectedSeats.length}): <strong className="text-white">{selectedSeats.map(s => s.code).join(', ')}</strong>
              </span>
              <span className="text-white font-bold">₹{totalTicketPrice}</span>
            </div>

            {fnb.length > 0 && (
              <div className="text-xs pb-2 border-b border-[#262626] space-y-1">
                <div className="text-gray-400 font-semibold">Hyderabad Snacks & Beverages:</div>
                {fnb.map(item => (
                  <div key={item.id} className="flex justify-between text-gray-300">
                    <span>{item.qty}x {item.name}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between text-xs text-gray-400">
              <span>Convenience Fee</span>
              <span>₹{convenienceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Integrated GST (18%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-[#333]">
              <span>Grand Total</span>
              <span className="text-[#E50914] text-lg">₹{grandTotal}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-[#181818] p-4 rounded-xl border border-[#282828] space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold">
              Ticket Delivery & Contact Info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#141414] border border-[#333] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Mobile (for SMS Ticket)</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#141414] border border-[#333] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold">
              Select Payment Option
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                  paymentMethod === 'upi'
                    ? 'border-[#E50914] bg-[#E50914]/10 text-white'
                    : 'border-[#333] bg-[#1a1a1a] text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>UPI (GPay/PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                  paymentMethod === 'card'
                    ? 'border-[#E50914] bg-[#E50914]/10 text-white'
                    : 'border-[#333] bg-[#1a1a1a] text-gray-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span>Debit / Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                  paymentMethod === 'netbanking'
                    ? 'border-[#E50914] bg-[#E50914]/10 text-white'
                    : 'border-[#333] bg-[#1a1a1a] text-gray-400 hover:text-white'
                }`}
              >
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Net Banking</span>
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div className="mt-2 bg-[#181818] p-3 rounded-lg border border-[#2a2a2a] text-xs">
                <label className="block text-gray-400 mb-1">Instant UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@okhdfcbank"
                  className="w-full bg-[#121212] border border-[#333] rounded px-3 py-2 text-white focus:outline-none focus:border-[#E50914]"
                />
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-[#252525] rounded text-[10px] text-gray-300">Google Pay</span>
                  <span className="px-2 py-0.5 bg-[#252525] rounded text-[10px] text-gray-300">PhonePe</span>
                  <span className="px-2 py-0.5 bg-[#252525] rounded text-[10px] text-gray-300">Paytm</span>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-400 bg-red-950/50 border border-red-800 p-2.5 rounded text-xs">
              {error}
            </div>
          )}

          <div className="flex items-center space-x-2 text-gray-500 text-[11px] justify-center pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-bit Bank Grade Encrypted • Verified Hyderabad Cinema Gateway</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-[#181818] border-t border-[#282828] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            disabled={processing}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handlePayNow}
            disabled={processing}
            className="flex items-center justify-center space-x-2 bg-[#E50914] hover:bg-[#b81d24] text-white px-8 py-3 rounded-lg text-sm font-black transition-all shadow-[0_4px_20px_rgba(229,9,20,0.5)] active:scale-95 disabled:opacity-50"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing Payment...</span>
              </>
            ) : (
              <span>Confirm & Pay ₹{grandTotal}</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
