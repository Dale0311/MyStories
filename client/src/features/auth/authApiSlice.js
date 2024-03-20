import { apiSlice } from '@/src/app/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (formData) => ({
        url: '/auth/signup',
        body: formData,
        method: 'POST',
      }),
      transformErrorResponse: (err) => {
        return err?.data?.message;
      },
    }),
    signin: builder.mutation({
      query: (creds) => ({
        url: 'auth/signin',
        method: 'POST',
        body: creds,
      }),
      transformErrorResponse: (err) => {
        return err?.data?.message;
      },
    }),
    signout: builder.mutation({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation } =
  authApiSlice;
