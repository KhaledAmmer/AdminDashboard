import { NextFunction } from 'express';
import { PaginatingRequestDto } from '../contracts/common/PaginableRequestDto';
import { PaginatingResponseDto } from '../contracts/common/PaginatingResponseDto';
import GenericApiResponse from '../contracts/express/GenericApiResponse';
import { AppRequest, Empty } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';
import { TransactionGetAllResponseDto } from '../contracts/transaction/TransactionGetAllResponseDto';
import { TransactionGetOneRequestDto } from '../contracts/transaction/TransactionGetRequestDto';
import { prepareSearchData } from '../helpers/preaperSearchData';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import Transactions from '../models/Transactions';

export const allTransactions = asyncWrapper(
  async (
    req: AppRequest<
      Empty,
      PaginatingRequestDto<TransactionGetOneRequestDto>,
      Empty
    >,
    res: AppResponse<PaginatingResponseDto<TransactionGetAllResponseDto>>
  ) => {
    const { limit, page, sortField, sortDirection, username, ...rest } =
      req.query;
    const filter = prepareSearchData<TransactionGetOneRequestDto>(rest);
    const results = await Transactions.find({ ...filter })
      .populate({
        path: 'userId',
        select: 'name',
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
  }
);
