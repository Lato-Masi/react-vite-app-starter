import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, LoginResponse } from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api', // Replace with your API base URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    }
  }), 
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
        query: () => ({
            url: 'logout',
            method: 'POST',
        }),
    }),
    getUser: builder.query<User, void>({
      query: () => 'user',
    }),
    changeSettings: builder.mutation<User, { name: string; email: string }>({
      query: (settings) => ({
        url: 'settings/profile',
        method: 'PATCH',
        body: settings,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useChangeSettingsMutation,
} = api;
