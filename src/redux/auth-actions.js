import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../api/requests/auth';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await loginApi({ email, password });
      // store user's token in local storage
      localStorage.setItem('userToken', data.token);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
