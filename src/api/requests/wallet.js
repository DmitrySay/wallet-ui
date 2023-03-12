import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_HOST}/api/v1`;
export const getWalletsApi = () => {
  let url = `/wallets?size=10&sort=id&page=0`;
  return axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    baseURL: baseURL,
    url: url,
  });
};

export const addAmountToWalletApi = (data) => {
  let url = `/wallets/wallet/amount/add`;
  return axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    baseURL: baseURL,
    url: url,
    data: data
  });
};


export const removeAmountFromWalletApi = (data) => {
  let url = `/wallets/wallet/amount/remove`;
  return axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    baseURL: baseURL,
    url: url,
    data: data
  });
};



