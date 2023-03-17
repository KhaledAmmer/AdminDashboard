import { api, GenericResponse, stringifyQuery } from '..';
import { PaginatingRequestDto } from '../common/PaginableRequestDto';
import { PaginatingResponseDto } from '../common/PaginatingResponseDto';
import { UserGetAllCustomersRequestDto as UserGetAllAdminsRequestDto , UserGetAllCustomersResponseDto as UserGetAllAdminsResponseDto } from '../user/user.types';


const managementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    allAdmins: builder.query<
      GenericResponse<PaginatingResponseDto<UserGetAllAdminsResponseDto>>,
      PaginatingRequestDto<UserGetAllAdminsRequestDto>
    >({
      query: (request) => `/management/admins${stringifyQuery(request)}`,
      providesTags: [{ type: 'Management', id: 'get-all-admins' }],
    }),
  }),
});

export const {useAllAdminsQuery} = managementApi;
