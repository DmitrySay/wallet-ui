import { addAmountToWallet, removeAmountFromWallet, replaceWallets } from './wallets-slice';
import {
  addAmountToWalletApi,
  getWalletsApi,
  removeAmountFromWalletApi,
  transferAmountWalletApi,
} from '../api/requests/wallet';

export const fetchWalletsAction = () => {
  return async (dispatch) => {
    try {
      const walletsData = await getWalletsApi();
      dispatch(replaceWallets({ wallets: walletsData }));
    } catch (error) {
      console.log('Fetching wallets data failed!');
    }
  };
};

export const addAmountToWalletAction = (data) => {
  return async (dispatch) => {
    try {
      const walletUpdated = await addAmountToWalletApi(data);
      dispatch(addAmountToWallet(walletUpdated));
    } catch (error) {
      console.log('Could not add amount to wallet!');
    }
  };
};

export const removeAmountFromWalletAction = (data) => {
  return async (dispatch) => {
    try {
      const walletUpdated = await removeAmountFromWalletApi(data);
      dispatch(removeAmountFromWallet(walletUpdated));
    } catch (error) {
      console.log('Could not remove amount from wallet!');
    }
  };
};

export const transferAmountWalletAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await transferAmountWalletApi(data);
      console.log(response);
      if (response && response.status === 200) {
        const walletsData = await getWalletsApi();
        dispatch(replaceWallets({ wallets: walletsData }));
      }
    } catch (error) {
      console.log('Transfer amount from wallet to wallet failed!');
    }
  };
};




