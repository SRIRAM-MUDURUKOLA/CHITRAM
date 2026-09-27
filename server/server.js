import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import theaterRoutes from './routes/theaterRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static posters from client public folder so both backend & frontend can resolve them
const postersPath = path.resolve(__dirname, '../client/public/posters');
app.use('/posters', express.static(postersPath));

// API Routes
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Chitram Movie Booking API - Hyderabad Edition',
    city: 'Hyderabad, Telangana',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build in production
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(clientDistPath, 'index.html'));
});

// Start Server
app.listen(PORT, async () => {
  console.log(`🍿 Chitram Server running on http://localhost:${PORT}`);
  console.log(`📍 Location: Hyderabad, Telangana | Hub of Tollywood Cinema`);
  await connectDB();
});

