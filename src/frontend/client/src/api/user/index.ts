import { api, GenericResponse, stringifyQuery } from '..';
import { PaginatingRequestDto } from '../common/PaginableRequestDto';
import { PaginatingResponseDto } from '../common/PaginatingResponseDto';
import {
  UserGetAllCustomersRequestDto,
  UserGetAllCustomersResponseDto,
  UserGetOneRequestDto,
  UserGetOneResponseDto,
  UsersGeographyGetResponseDto,
} from './user.types';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<
      GenericResponse<UserGetOneResponseDto>,
      UserGetOneRequestDto
    >({
      query: (request) => `/user/${request.id}`,
      providesTags: [{ type: 'User', id: 'get-one-user' }],
    }),
    allCustomers: builder.query<
      GenericResponse<PaginatingResponseDto<UserGetAllCustomersResponseDto>>,
      PaginatingRequestDto<UserGetAllCustomersRequestDto>
    >({
      query: (request) => `/user/customers${stringifyQuery(request)}`,
      providesTags: [{ type: 'User', id: 'get-all-user' }],
    }),
    usersGeography: builder.query<
      GenericResponse<Array<UsersGeographyGetResponseDto>>,
      undefined
    >({
      query: (req) => `/user/geography`,
      providesTags: [{ type: 'User', id: 'get-users-geography' }],
    }),
  }),
});

export const { useGetUserQuery, useAllCustomersQuery, useUsersGeographyQuery } =
  userApi;
