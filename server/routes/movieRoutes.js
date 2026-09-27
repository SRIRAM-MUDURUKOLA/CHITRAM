import express from 'express';
import { dataStore } from '../services/dataStore.js';

const router = express.Router();

// GET all movies or filter
router.get('/', (req, res) => {
  try {
    const { search, genre } = req.query;
    const movies = dataStore.getMovies({ search, genre });
    res.json({ success: true, count: movies.length, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET movie by ID
router.get('/:id', (req, res) => {
  try {
    const movie = dataStore.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
