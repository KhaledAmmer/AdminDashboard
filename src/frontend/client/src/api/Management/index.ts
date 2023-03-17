import { api, GenericResponse, stringifyQuery } from '..';
import { PaginatingRequestDto } from '../common/PaginableRequestDto';
import { PaginatingResponseDto } from '../common/PaginatingResponseDto';
import { TransactionGetOneResponseDto } from '../transaction/transaction.types';
import {
  UserGetAllCustomersRequestDto as UserGetAllAdminsRequestDto,
  UserGetAllCustomersResponseDto as UserGetAllAdminsResponseDto,
} from '../user/user.types';

const managementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    allAdmins: builder.query<
      GenericResponse<PaginatingResponseDto<UserGetAllAdminsResponseDto>>,
      PaginatingRequestDto<UserGetAllAdminsRequestDto>
    >({
      query: (request) => `/management/admins${stringifyQuery(request)}`,
      providesTags: [{ type: 'Management', id: 'get-all-admins' }],
    }),
    userPerformance: builder.query<
      GenericResponse<Array<TransactionGetOneResponseDto>>,
      { userId: string }
    >({
      query: (req) => `/management/performance/${req.userId}`,
      providesTags: [{ type: 'Management', id: 'get-users-performance' }],
    }),
  }),
});

export const { useAllAdminsQuery, useUserPerformanceQuery } = managementApi;
