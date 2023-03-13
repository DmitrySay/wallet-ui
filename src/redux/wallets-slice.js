import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallets: [],
  },
  reducers: {
    replaceWallets(state, action) {
      state.wallets = action.payload.wallets;
    },
    addAmountToWallet(state, action) {
      const newWallet = action.payload;
      const existingWallet = state.wallets.find((item) => item.id === newWallet.id);
      if (existingWallet) {
        existingWallet.balance = newWallet.balance;
      }
    },
    removeAmountFromWallet(state, action) {
      const newWallet = action.payload;
      const existingWallet = state.wallets.find((item) => item.id === newWallet.id);
      if (existingWallet) {
        existingWallet.balance = newWallet.balance;
      }
    },
  },
});

export const { replaceWallets, addAmountToWallet, removeAmountFromWallet } = walletSlice.actions;

export default walletSlice;
