import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type GenericResponse<TPayload> = {
  success: boolean;
  message: string;
  data: TPayload;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Product', 'Transaction','OverAllStat'],
  endpoints: (builder) => ({
    //! query<response, request>({})
  }),
});

export const invalidateCache = api.util.invalidateTags;

export const stringifyQuery = <T>(data: { [key in keyof T]: any }) => {
  return Object.keys(data).reduce<string>((acc, key) => {
    if (data[key as keyof T] !== undefined && data[key as keyof T] !== null) {
      return `${acc + key}=${data[key as keyof T]}&`;
    }
    return acc;
  }, '?');
};
