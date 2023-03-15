import { api, GenericResponse, stringifyQuery } from '..';
import { PaginatingRequestDto } from '../common/PaginableRequestDto';
import { PaginatingResponseDto } from '../common/PaginatingResponseDto';
import { TransactionGetAllResponseDto } from './transaction.types';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<
      GenericResponse<PaginatingResponseDto<TransactionGetAllResponseDto>>,
      PaginatingRequestDto<TransactionGetAllResponseDto>
    >({
      query: (request) => `/transactions${stringifyQuery(request)}`,
      providesTags: ['Transaction'],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = productApi;
