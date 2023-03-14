import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_HOST}/api/v1`;

export const loginApi = async (credentials) => {
  const requestOptions = JSON.stringify(credentials);
  return axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    baseURL: baseURL,
    url: '/auth/login',
    data: requestOptions,
  });
};
