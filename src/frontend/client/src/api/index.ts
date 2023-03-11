import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type GenericResponse<TPayload> = {
  success: boolean;
  message: string;
  data: TPayload;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Product'],
  endpoints: (builder) => ({
    //! query<response, request>({})
  }),
});
