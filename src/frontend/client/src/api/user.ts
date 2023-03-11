import { api } from './api';
import { UserGetOneRequestDto, UserGetOneResponseDto } from './types/user.types';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserGetOneResponseDto, UserGetOneRequestDto>({
      query: (id) => `/general/user/${id}`,
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
