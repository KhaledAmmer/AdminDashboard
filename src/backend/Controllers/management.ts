import { PaginatingRequestDto } from '../contracts/common/PaginableRequestDto';
import { PaginatingResponseDto } from '../contracts/common/PaginatingResponseDto';
import GenericApiResponse from '../contracts/express/GenericApiResponse';
import { AppRequest, Empty } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';
import { UserGetAllCustomersRequestDto } from '../contracts/user/UserGetAllCustomersRequestDto';
import { UserGetAllCustomersResponseDto } from '../contracts/user/UserGetAllCustomersResponseDto';
import { prepareSearchData } from '../helpers/preaperSearchData';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import AffiliateStat, { IAffiliateStat } from '../models/AffiliateStat';
import { ITransactions } from '../models/Transactions';
import User from '../models/User';

export const allAdmins = asyncWrapper(
  async (
    req: AppRequest<
      Empty,
      PaginatingRequestDto<UserGetAllCustomersRequestDto>,
      Empty
    >,
    res: AppResponse<PaginatingResponseDto<UserGetAllCustomersResponseDto>>
  ) => {
    const { limit, page, sortField, sortDirection, ...rest } = req.query;
    const filter = prepareSearchData<UserGetAllCustomersRequestDto>(rest);
    const results = await User.find({
      ...filter,
      role: 'admin',
    })
      .select('-password')
      .skip(page * limit)
      .limit(limit)
      .sort({ [`${sortField}`]: sortDirection });

    if (!results) return GenericApiResponse.notFound(res, results);

    const count = await User.count({ ...filter, role: 'user' });
    const response: PaginatingResponseDto<UserGetAllCustomersResponseDto> = {
      total: count,
      data: results as UserGetAllCustomersResponseDto[],
    };

    return GenericApiResponse.ok(res, response);
  }
);

export const getUserPerformance = asyncWrapper(
  async (
    req: AppRequest<Empty, Empty, { id: string }>,
    res: AppResponse<Array<ITransactions>>
  ) => {
    const { id } = req.params;

    const getUserPerformance = await AffiliateStat.findOne({
      userId: id,
    }).populate({
      path: 'affiliateSales',
      select: '-updatedAt ',
      populate: {
        path: 'products userId',
        select: 'price _id name',
      },
    });

    if (!getUserPerformance)
      return GenericApiResponse.notFound(res, getUserPerformance);

    return GenericApiResponse.ok(res, getUserPerformance.affiliateSales);
  }
);
