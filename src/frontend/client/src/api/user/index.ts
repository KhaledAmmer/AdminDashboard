import { api, GenericResponse } from '..';
import {
  UserGetOneRequestDto,
  UserGetOneResponseDto,
} from './user.types';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<GenericResponse<UserGetOneResponseDto>, UserGetOneRequestDto>({
      query: (request) => `/general/user/${request.id}`,
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
