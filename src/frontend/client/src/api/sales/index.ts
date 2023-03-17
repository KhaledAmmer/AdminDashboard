import { api, GenericResponse } from '..';
import { SalesGetAllResponseDto } from './sales.types';

const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<
      GenericResponse<Array<SalesGetAllResponseDto>>,
      undefined
    >({
      query: (request) => `/sales`,
      providesTags: ['OverAllStat'],
    }),
  }),
});

export const { useGetSalesQuery } = salesApi;
