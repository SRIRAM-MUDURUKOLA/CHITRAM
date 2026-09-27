import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  movieId: { type: String, required: true },
  movieTitle: { type: String, required: true },
  moviePoster: { type: String },
  theaterId: { type: String, required: true },
  theaterName: { type: String, required: true },
  theaterAddress: { type: String },
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  screenName: { type: String, required: true },
  seats: [{
    code: String,
    tier: String,
    price: Number
  }],
  fnb: [{
    name: String,
    qty: Number,
    price: Number
  }],
  ticketAmount: { type: Number, required: true },
  fnbAmount: { type: Number, default: 0 },
  convenienceFee: { type: Number, default: 35.40 },
  gst: { type: Number, default: 18.00 },
  totalAmount: { type: Number, required: true },
  customer: {
    name: { type: String, default: "Tollywood Cinephile" },
    phone: { type: String, default: "+91 98480 22338" },
    email: { type: String, default: "cinephile@chitram.hyd" }
  },
  paymentMethod: { type: String, default: "UPI" },
  paymentStatus: { type: String, default: "PAID" },
  qrData: { type: String }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
