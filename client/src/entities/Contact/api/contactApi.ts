import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithToken, ENDPOINTS } from '@/shared/api/http';
import { ContactDTO, mapContactDtoToEntity } from '../model';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: baseQueryWithToken,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: (contactID) => ({
        url: ENDPOINTS.CONTACT.NEW(contactID),
        method: 'POST',
      }),
      transformResponse: (contactDTO: ContactDTO) => mapContactDtoToEntity(contactDTO),
    }),
    isOnline: builder.query({
      query: (contactID) => ({
        url: ENDPOINTS.CONTACT.STATUS(contactID),
      }),
    }),
  }),
});

export const { useAddContactMutation } = contactApi;
