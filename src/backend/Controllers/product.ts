import express, { NextFunction } from 'express';
import GenericApiResponse from '../contracts/express/GenericApiResponse';
import { AppRequest, Empty } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';
import { ProductGetAllResponseDto } from '../contracts/product/ProductGetAllResponseDto.types';
import { ProductGetAllRequestDto } from '../contracts/product/ProductGetAllResquestDto.types';
import { ProductGetOneResponseDto } from '../contracts/product/ProductGetOneDto';
import Product, { IProduct } from '../models/Product';
import ProductStat from '../models/ProductStat';

export const allProducts = async (
  req: AppRequest<Empty, ProductGetAllRequestDto, Empty>,
  res: AppResponse<ProductGetAllResponseDto>,
  next: NextFunction
) => {
  try {
    const products: Array<ProductGetAllResponseDto> | null =
      await Product.find().skip(req.query.page).limit(req.query.limit);
    if (!products) return GenericApiResponse.notFound(res, products);

    return GenericApiResponse.ok(res, products);
  } catch (error) {
    next(error);
  }
};

export const oneProduct = async (
  req: AppRequest<Empty, Empty, { id: string }>,
  res: AppResponse<ProductGetOneResponseDto>,
  next: NextFunction
) => {
  try {
    const product: IProduct | null = await Product.findOne({
      _id: req.params.id,
    });
    if (!product)
      return GenericApiResponse.notFound(res, product, 'Product not found');

    const productStat = await ProductStat.findOne({ productId: req.params.id });
    if (!productStat) return GenericApiResponse.notFound(res, productStat);

    /* TODO: USE AUTO MAPPER */
    const newP: ProductGetOneResponseDto = {
      _id: product._id,
      category: product.category,
      description: product.description,
      name: product.name,
      price: product.price,
      productStat: productStat,
      rating: product.rating,
      supply: product.supply,
    };

    return GenericApiResponse.ok(res, newP);
  } catch (error) {
    next(error);
  }
};
