import { useMemo } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../../redux/auth-slice';

// import * as _ from 'lodash';
// import jwtDecode from 'jwt-decode';



const RequestInterceptor = ({ children }) => {

  const userToken = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const isUserTokenExpired = (userToken) => {
    try {
      if (!userToken) {
        return true;
      }
      const decoded = jwtDecode(userToken);
      const exp = _.get(decoded, 'exp');
      const date = new Date(0);
      date.setUTCSeconds(exp);
      return !(date.valueOf() > new Date().valueOf());
    } catch (error) {
      return true;
    }
  }

  useMemo(() => {
    axios.interceptors.request.use(async (config) => {
      if (isUserTokenExpired()) {
        dispatch(setUserToken({ userToken: userToken }));
        localStorage.removeItem('userToken')
        return config;
      }

      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
      return config;
    });
  }, [userToken]);

  return children;
};

export default RequestInterceptor;
