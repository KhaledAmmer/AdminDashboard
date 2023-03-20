import { NextFunction } from 'express';
import { PaginatingRequestDto } from '../contracts/common/paginable-request-dto';
import { PaginatingResponseDto } from '../contracts/common/paginating-response-dto';
import GenericApiResponse from '../contracts/Express/generic-api-response';
import { AppRequest, Empty } from '../contracts/Express/typed-request';
import { AppResponse } from '../contracts/Express/typed-response';
import { TransactionGetAllResponseDto } from '../contracts/transaction/transaction-get-all-response-dto';
import { TransactionGetOneRequestDto } from '../contracts/transaction/transaction-get-request-dto';
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

    if (!results) return GenericApiResponse.notFound(res, null);

    const count = await Transactions.count({ ...filter });
    const response: PaginatingResponseDto<TransactionGetAllResponseDto> = {
      total: count,
      data: results,
    };

    return GenericApiResponse.ok(res, response);
  }
);
