import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_HOST}/api/v1`;

export const getWalletsApi = async () => {
  let url = `/wallets?size=10&sort=id&page=0`;
  const { data } = await axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    baseURL: baseURL,
    url: url,
  });
  return data?.content ? data.content : data;
};

export const addAmountToWalletApi = async (requestData) => {
  let url = `/wallets/wallet/amount/add`;
  const { data } = await axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    baseURL: baseURL,
    url: url,
    data: requestData,
  });
  return data;
};

export const removeAmountFromWalletApi = async (requestData) => {
  let url = `/wallets/wallet/amount/remove`;
  const { data } = await axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    baseURL: baseURL,
    url: url,
    data: requestData,
  });
  return data;
};

export const transferAmountWalletApi = async (requestData) => {
  let url = `/wallets/wallet/amount/transfer`;
  return axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    baseURL: baseURL,
    url: url,
    data: requestData,
  });
};



