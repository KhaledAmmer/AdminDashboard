import { api, GenericResponse } from '..';
import {
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
      providesTags: ['Product'],
    }),
    oneProduct: builder.query<
      GenericResponse<ProductGetOneResponseDto>,
      { id: number }
    >({
      query: (request) => `/products/${request.id}`,
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetAllProductsQuery, useOneProductQuery } = productApi;
