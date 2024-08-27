import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = "http://localhost:5600/api/v2/theatres"
// Async Thunks for API Calls
export const createMovie = createAsyncThunk(
  'theatre/createTheatre',
  async (theatreData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${host}/addtheatre`, theatreData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the header is set correctly for file uploads
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateMovie = createAsyncThunk(
  '/update',
  async ({ movieId, movieData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${host}/update/${theatreId}`, theatreData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the header is set correctly for file uploads
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  '/deleteTheatre',
  async (theatreId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${host}/delete/${theatreId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movie/fetchMovieById',
  async (theatreId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/movies/${theatreId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchAllMovies = createAsyncThunk(
  'movie/fetchAllMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial State
const initialState = {
  theatres: [],
  currenttheatre: null,
  status: 'idle',
  error: null,
};

// Movie Slice
const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default movieSlice.reducer;
