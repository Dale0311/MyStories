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
  }),
});

export const { useSignupMutation } = authApiSlice;
