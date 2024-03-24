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
    getUser: builder.query({
      query: (email) => ({
        url: `/auth/${email}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    setNewUsername: builder.mutation({
      query: ({ email, username }) => ({
        url: `auth/${email}`,
        body: { username },
        method: 'PUT',
      }),
      transformErrorResponse: (err) => {
        return err?.data?.message;
      },
      invalidatesTags: ['Posts', 'User'],
    }),
    setNewPassword: builder.mutation({
      query: ({ email, newPassword, currentPassword }) => ({
        url: `auth/${email}`,
        body: { newPassword, currentPassword },
        method: 'PUT',
      }),
      transformErrorResponse: (err) => {
        return err?.data?.message;
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useGetUserQuery,
  useSetNewUsernameMutation,
  useSetNewPasswordMutation,
} = authApiSlice;
