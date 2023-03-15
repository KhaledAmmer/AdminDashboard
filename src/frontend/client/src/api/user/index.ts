import { api, GenericResponse, stringifyQuery } from '..';
import { PaginatingRequestDto } from '../common/PaginableRequestDto';
import { PaginatingResponseDto } from '../common/PaginatingResponseDto';
import {
  UserGetAllCustomersRequestDto,
  UserGetAllCustomersResponseDto,
  UserGetOneRequestDto,
  UserGetOneResponseDto,
} from './user.types';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<
      GenericResponse<UserGetOneResponseDto>,
      UserGetOneRequestDto
    >({
      query: (request) => `/user/${request.id}`,
      providesTags: [{ type: 'User', id: 'get-user' }],
    }),
    allCustomers: builder.query<
      GenericResponse<PaginatingResponseDto<UserGetAllCustomersResponseDto>>,
      PaginatingRequestDto<UserGetAllCustomersRequestDto>
    >({
      query: (request) => `/user/customers/all${stringifyQuery(request)}`,
      providesTags: [{ type: 'User', id: 'get-user' }],
    }),
  }),
});

export const { useGetUserQuery, useAllCustomersQuery } = userApi;
