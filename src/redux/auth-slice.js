import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './auth-actions';

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    userToken,
    error: null,
  },
  reducers: {
    setUserToken(state, action) {
      state.userToken = action.payload.userToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.token;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setUserToken } = authSlice.actions;

export default authSlice;
