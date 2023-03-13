import { configureStore } from '@reduxjs/toolkit';

import walletsSlice from './wallets-slice.js';

const store = configureStore({
  reducer: { wallet: walletsSlice.reducer },
});

export default store;
