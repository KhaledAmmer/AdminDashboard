import { api, GenericResponse } from '..';
import {
  GetOverallStat,
  ProductGetAllRequestDto,
  ProductGetAllResponseDto,
  ProductGetOneResponseDto,
} from './product.types';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      GenericResponse<Array<ProductGetAllResponseDto>>,
      ProductGetAllRequestDto
    >({
      query: (request) =>
        `/products?limit=${request.limit}&page=${request.page}`,
      providesTags: [{ type: 'Product', id: 'all-products' }],
    }),
    oneProduct: builder.query<
      GenericResponse<ProductGetOneResponseDto>,
      { id: number }
    >({
      query: (request) => `/products/${request.id}`,
      providesTags: [{ type: 'Product', id: 'one-product' }],
    }),
    getDashboardStats: builder.query<
    GenericResponse<GetOverallStat>,
    undefined
  >({
    query: (request) => `/products/getDashboardStats`,
    providesTags: [{ type: 'Product', id: 'get-Dashboard-Stats' }],
  }),
  }),
});

export const { useGetAllProductsQuery, useOneProductQuery ,useGetDashboardStatsQuery} = productApi;
