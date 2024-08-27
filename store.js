import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Redux/Auth/authSlice';
import userSlice from './Redux/user/userSlice';
import movieSlice from './Redux/Movie/movieSlice';

const store = configureStore({
  reducer: {
    auth:authSlice,
    user:userSlice,
    movies:movieSlice
  }
});

export default store;