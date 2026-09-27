import mongoose from 'mongoose';

const showtimeSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  theaterId: { type: String, required: true },
  screenName: { type: String, required: true },
  format: { type: String, default: '4K Dolby Atmos' },
  language: { type: String, default: 'Telugu' },
  date: { type: String, required: true }, // e.g. "Today", "Tomorrow", "Wed 24 Sep"
  time: { type: String, required: true }, // e.g. "10:30 AM"
  pricing: {
    recliner: { type: Number, default: 350 },
    prime: { type: Number, default: 220 },
    classic: { type: Number, default: 150 }
  },
  bookedSeats: [{ type: String }], // Array of seat codes e.g. "B5", "E12"
  status: { type: String, enum: ['Available', 'Fast Filling', 'Almost Full'], default: 'Available' }
}, { timestamps: true });

export default mongoose.models.Showtime || mongoose.model('Showtime', showtimeSchema);
