import mongoose from 'mongoose';

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, default: 'Hyderabad' },
  area: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String },
  amenities: [{ type: String }],
  badge: { type: String },
  distance: { type: String, default: '3.5 km' },
  screens: [{
    name: String,
    format: String,
    totalSeats: Number
  }]
}, { timestamps: true });

export default mongoose.models.Theater || mongoose.model('Theater', theaterSchema);
