import GenericApiResponse from '../contracts/express/GenericApiResponse';
import { Empty, AppRequest } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';
import {
  UserGetOneRequestDto,
  UserGetOneResponseDto,
} from '../contracts/user/UserGetOneDto';

import User from '../models/User';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { PaginatingRequestDto } from '../contracts/common/PaginableRequestDto';
import { PaginatingResponseDto } from '../contracts/common/PaginatingResponseDto';
import { UserGetAllCustomersResponseDto } from '../contracts/user/UserGetAllCustomersResponseDto';
import { UserGetAllCustomersRequestDto } from '../contracts/user/UserGetAllCustomersRequestDto';
import { prepareSearchData } from '../helpers/preaperSearchData';

export const getUser = asyncWrapper(
  async (
    req: AppRequest<Empty, Empty, UserGetOneRequestDto>,
    res: AppResponse<UserGetOneResponseDto>
  ) => {
    const user: UserGetOneResponseDto | null = await User.findById(
      req.params.id
    );
    if (!user) return GenericApiResponse.notFound(res, user);

    return GenericApiResponse.ok(res, user);
  }
);

export const allCustomers = asyncWrapper(
  async (
    req: AppRequest<Empty, PaginatingRequestDto<UserGetAllCustomersRequestDto>, Empty>,
    res: AppResponse<PaginatingResponseDto<UserGetAllCustomersResponseDto>>
  ) => {
    const { limit, page, sortField, sortDirection, ...rest} = req.query;
    const filter = prepareSearchData<UserGetAllCustomersRequestDto>(rest);
    const results = await User.find({
      ...filter,
      role: 'user',
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
