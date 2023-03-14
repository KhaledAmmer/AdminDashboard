import { api, GenericResponse } from '..';
import { PaginatingRequestDto } from '../common/PaginableRequestDto';
import { PaginatingResponseDto } from '../common/PaginatingResponseDto';
import { TransactionGetAllResponseDto } from './transaction.types';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<
      GenericResponse<PaginatingResponseDto<TransactionGetAllResponseDto>>,
      PaginatingRequestDto<TransactionGetAllResponseDto>
    >({
      query: ({ page, limit }) => ({
        url: '/transactions',
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['Transaction'],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = productApi;
