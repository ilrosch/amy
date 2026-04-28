import axios from 'axios';
import { store } from '@/src/lib/store';
import { selectTokenString } from '@/src/lib/store/slices/user';

const http = axios.create({
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
    const token = selectTokenString(store.getState());
    if (token) config.params = { ...config.params, token };
    return config;
  },
  (error) => Promise.reject(error),
);

export default http;
