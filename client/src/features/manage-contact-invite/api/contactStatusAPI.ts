import { ENDPOINTS } from '@/shared/api/http';
import { contactApi } from '@/entities/contact';

export const contactStatusAPI = contactApi.injectEndpoints({
  endpoints: (build) => ({
    acceptContact: build.mutation<void, string>({
      query: (id) => ({
        url: ENDPOINTS.CONTACT.ACCEPT(id),
        method: 'POST',
      }),
    }),
    rejectContact: build.mutation<void, string>({
      query: (id) => ({
        url: ENDPOINTS.CONTACT.REJECT(id),
        method: 'POST',
      }),
    }),
    resendContact: build.mutation<void, string>({
      query: (id) => ({
        url: ENDPOINTS.CONTACT.NEW(id),
        method: 'POST',
      }),
    }),
  }),
});

export const { useAcceptContactMutation, useRejectContactMutation, useResendContactMutation } =
  contactStatusAPI;
