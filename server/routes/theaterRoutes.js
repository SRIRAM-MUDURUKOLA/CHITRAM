import express from 'express';
import { dataStore } from '../services/dataStore.js';

const router = express.Router();

// GET all Hyderabad theaters (optional ?area=Gachibowli)
router.get('/', (req, res) => {
  try {
    const { area } = req.query;
    const theaters = dataStore.getTheaters({ area });
    res.json({ success: true, count: theaters.length, data: theaters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET Hyderabad theaters showing a specific movie on a given date
router.get('/movie/:movieId', (req, res) => {
  try {
    const { movieId } = req.params;
    const { date = 'Today', area = 'All Areas' } = req.query;
    const theatersWithShows = dataStore.getTheatersWithShows(movieId, date, area);
    res.json({ success: true, count: theatersWithShows.length, data: theatersWithShows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET specific showtime detail (with screen, price tiers, and booked seats)
router.get('/showtimes/:showId', (req, res) => {
  try {
    const show = dataStore.getShowtimeById(req.params.showId);
    if (!show) {
      return res.status(404).json({ success: false, message: 'Showtime not found' });
    }
    res.json({ success: true, data: show });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET Hyderabad F&B snack menu
router.get('/fnb', (req, res) => {
  try {
    const fnb = dataStore.getFnbItems();
    res.json({ success: true, data: fnb });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
