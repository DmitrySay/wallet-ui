import { useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const RequestInterceptor = ({ children }) => {

  const userToken = useSelector((state) => state.auth.userToken);

  useMemo(() => {
    axios.interceptors.request.use(async (config) => {
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
      return config;
    });
  }, [userToken]);

  return children;
};

export default RequestInterceptor;
