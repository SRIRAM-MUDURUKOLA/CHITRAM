// Frontend API service communicating with Express backend or local fallback

const API_BASE = '/api';

export const getMovies = async ({ search = '', genre = '' } = {}) => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (genre && genre !== 'All') params.append('genre', genre);

    const res = await fetch(`${API_BASE}/movies?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching movies:', err);
    throw err;
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/movies/${id}`);
    if (!res.ok) throw new Error('Movie not found');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Error fetching movie details:', err);
    throw err;
  }
};

export const getTheatersForMovie = async (movieId, date = 'Today', area = 'All Areas') => {
  try {
    const params = new URLSearchParams({ date, area });
    const res = await fetch(`${API_BASE}/theaters/movie/${movieId}?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch theaters');
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching theaters:', err);
    throw err;
  }
};

export const getShowtimeDetails = async (showId) => {
  try {
    const res = await fetch(`${API_BASE}/theaters/showtimes/${showId}`);
    if (!res.ok) throw new Error('Failed to fetch showtime');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Error fetching showtime:', err);
    throw err;
  }
};

export const getFnbMenu = async () => {
  try {
    const res = await fetch(`${API_BASE}/theaters/fnb`);
    if (!res.ok) throw new Error('Failed to fetch F&B menu');
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching F&B menu:', err);
    return [];
  }
};

export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Failed to complete booking');
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Error creating booking:', err);
    throw err;
  }
};

export const getBookings = async () => {
  try {
    const res = await fetch(`${API_BASE}/bookings`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching bookings:', err);
    return [];
  }
};
