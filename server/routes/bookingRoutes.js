import express from 'express';
import { dataStore } from '../services/dataStore.js';

const router = express.Router();

// GET all bookings
router.get('/', (req, res) => {
  try {
    const bookings = dataStore.getBookings();
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET booking by ID
router.get('/:id', (req, res) => {
  try {
    const booking = dataStore.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create a new booking
router.post('/', (req, res) => {
  try {
    const {
      movieId,
      movieTitle,
      moviePoster,
      theaterId,
      theaterName,
      theaterAddress,
      showtimeId,
      showDate,
      showTime,
      screenName,
      seats,
      fnb = [],
      ticketAmount,
      fnbAmount = 0,
      convenienceFee = 35.40,
      gst = 18.00,
      totalAmount,
      customer,
      paymentMethod = "UPI"
    } = req.body;

    if (!movieId || !theaterId || !showtimeId || !seats || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking parameters (movie, theater, showtime, or seats).'
      });
    }

    const booking = dataStore.createBooking({
      movieId,
      movieTitle,
      moviePoster,
      theaterId,
      theaterName,
      theaterAddress,
      showtimeId,
      showDate,
      showTime,
      screenName,
      seats,
      fnb,
      ticketAmount: Number(ticketAmount),
      fnbAmount: Number(fnbAmount),
      convenienceFee: Number(convenienceFee),
      gst: Number(gst),
      totalAmount: Number(totalAmount),
      customer: customer || {
        name: "Tollywood Cinephile",
        phone: "+91 98480 22338",
        email: "cinephile@chitram.hyd"
      },
      paymentMethod
    });

    res.status(201).json({
      success: true,
      message: 'Movie tickets booked successfully! Welcome to Chitram.',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
