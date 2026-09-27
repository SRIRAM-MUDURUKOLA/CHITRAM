import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teluguTitle: { type: String, required: true },
  tagline: { type: String },
  poster: { type: String, required: true },
  backdrop: { type: String, required: true },
  trailerUrl: { type: String },
  rating: { type: Number, default: 9.0 },
  votes: { type: String, default: "50K+" },
  certificate: { type: String, default: "U/A" },
  languages: [{ type: String }],
  formats: [{ type: String }],
  genres: [{ type: String }],
  duration: { type: String, required: true },
  releaseDate: { type: String },
  isNowShowing: { type: Boolean, default: true },
  isTrending: { type: Boolean, default: false },
  synopsis: { type: String, required: true },
  director: { type: String },
  music: { type: String },
  cast: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);
