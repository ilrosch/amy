import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './endpoints';
import { RootState } from '@/app-root/store';

console.log(BASE_URL);

export const baseQueryWithToken = fetchBaseQuery({
  baseUrl: BASE_URL,
  timeout: 5000,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).session.data?.accessToken;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});
