import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken, ENDPOINTS } from '@/shared/api/http';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithToken,
  refetchOnMountOrArgChange: true,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.USER.CREATE,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: ENDPOINTS.USER.UPDATE,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useUpdateUserMutation } = userApi;
