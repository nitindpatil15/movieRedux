import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};
const host = 'http://localhost:5600/api/v2'

export const loginUser = createAsyncThunk('/user/login', async ({ email, password }) => {
  const response = await axios.post(`${host}/user/login`, {
    email,
    password
  },{
    withCredentials:true
  });
  const { accessToken} = response.data.data;
  const { avatar} = response.data.data.UserDetail;
  Cookies.set('accessToken', accessToken);
  Cookies.set('isLoggedIn',true)
  Cookies.set('avatar',avatar)
  return response.data.data;
});

export const registerUser = createAsyncThunk('/user/register', async (formData) => {
  const response = await axios.post(`${host}/user/register`, formData, {
    withCredentials:true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data.data;
});

export const createAdmin = createAsyncThunk('/superAdmin/createAdmin/:theatreId', async (theatreId,formData) => {
  const response = await axios.post(`${host}/superAdmin/createAdmin/:theatreId`, {theatreId,formData}, {
    withCredentials:true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data.data;
});

export const Logout = createAsyncThunk('/user/logout',async()=>{
  const response = await axios.post(
    `${host}/user/logout`,
    {},
    { withCredentials: true }
  );
  Cookies.remove('accessToken', accessToken);
  Cookies.remove('isLoggedIn',true)
  Cookies.remove('avatar',avatar)
  
  return response.data
})

export const Adminlogin = createAsyncThunk('/admin/login', async ({ email, password }) => {
    const response = await axios.post(`${host}/admin/login`, {
      email,
      password
    },{
      withCredentials:true
    });
    const { accessToken} = response.data.data;
    const { avatar} = response.data.data.UserDetail;
    Cookies.set('accessToken', accessToken);
    Cookies.set('isLoggedIn',true)
    Cookies.set('avatar',avatar)
    return response.data.data;
});

export const SuperAdminlogin = createAsyncThunk('/superadmin/login', async ({ email, password }) => {
    const response = await axios.post(`${host}/superadmin/login`, {
      email,
      password
    },{
      withCredentials:true
    });
    const { accessToken} = response.data.data;
    const { avatar} = response.data.data.UserDetail;
    Cookies.set('accessToken', accessToken);
    Cookies.set('isLoggedIn',true)
    Cookies.set('avatar',avatar)
    return response.data.data;
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(Adminlogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Adminlogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(Adminlogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(SuperAdminlogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SuperAdminlogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(SuperAdminlogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(Logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default authSlice.reducer;
