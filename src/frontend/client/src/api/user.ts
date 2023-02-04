import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User'],
  endpoints: (builder) => ({
    //! query<response, request>({})
    getUser: builder.query<{ id: number },string>({
      query: (id) => `/general/user/${id}`,
      providesTags: ['User'],
    }),
  }),
});
export const { useGetUserQuery } = api;
