import { configureStore } from '@reduxjs/toolkit';

import walletsSlice from './wallets-slice.js';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: { wallet: walletsSlice.reducer, auth: authSlice.reducer },
});

export default store;
