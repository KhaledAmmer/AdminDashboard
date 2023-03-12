import { NextFunction } from 'express';
import { PaginatingRequestDto } from '../contracts/common/PaginableRequestDto';
import { PaginatingResponseDto } from '../contracts/common/PaginatingResponseDto';
import GenericApiResponse from '../contracts/express/GenericApiResponse';
import { AppRequest, Empty } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';
import { ProductGetAllResponseDto } from '../contracts/product/ProductGetAllResponseDto.types';
import { ProductGetAllRequestDto } from '../contracts/product/ProductGetAllResquestDto.types';
import { TransactionGetAllResponseDto } from '../contracts/transaction/TransactionGetAllResponseDto';
import { TransactionGetOneResponseDto } from '../contracts/transaction/TransactionGetOneResponseDto';
import { TransactionGetOneRequestDto } from '../contracts/transaction/TransactionGetRequestDto';
import { prepareSearchData } from '../helpers/preaperSearchData';
import Transactions, { ITransactions } from '../models/Transactions';

export const allTransactions = async (
  req: AppRequest<
    Empty,
    PaginatingRequestDto<TransactionGetOneRequestDto>,
    Empty
  >,
  res: AppResponse<PaginatingResponseDto<TransactionGetAllResponseDto>>,
  next: NextFunction
) => {
  try {
    const { limit, page, sortField, sortDirection, username ,...rest } = req.query;
    const filter = prepareSearchData<ITransactions>(rest);
    const results = await Transactions.find({ ...filter })
      .populate({
        path:'userId',
        select:"name",
        match: { name:  { $regex: new RegExp(username, 'i') }}
      })
      .skip(page * limit)
      .limit(limit)
      .sort({ [`${sortField}`]: sortDirection });
    if (!results) return GenericApiResponse.notFound(res, results);

    const count = await Transactions.count({ ...filter });
    const response: PaginatingResponseDto<TransactionGetAllResponseDto> = {
      total: count,
      data: results,
    };

    return GenericApiResponse.ok(res, response);
  } catch (error) {
    next(error);
  }
};
