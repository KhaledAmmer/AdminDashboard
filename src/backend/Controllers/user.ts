import GenericApiResponse from '../contracts/Express/generic-api-response';
import { Empty, AppRequest } from '../contracts/Express/typed-request';
import { AppResponse } from '../contracts/Express/typed-response';
import {
  UserGetOneRequestDto,
  UserGetOneResponseDto,
} from '../contracts/user/user-get-one-dto';

import User from '../models/User';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { PaginatingRequestDto } from '../contracts/common/paginable-request-dto';
import { PaginatingResponseDto } from '../contracts/common/paginating-response-dto';
import { UserGetAllCustomersResponseDto } from '../contracts/user/user-get-all-customers-response-dto';
import { UserGetAllCustomersRequestDto } from '../contracts/user/user-get-all-customers-request-dto';
import { prepareSearchData } from '../helpers/preaperSearchData';
import counterCodeConverter from 'iso-3166-1';
import { UsersGeographyGetResponseDto } from '../contracts/user/users-geography-get-response-dto';

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
      role: 'user',
    })
      .select('-password')
      .skip(page * limit)
      .limit(limit)
      .sort({ [`${sortField}`]: sortDirection });

    if (!results) return GenericApiResponse.notFound(res, null);

    const count = await User.count({ ...filter, role: 'user' });
    const response: PaginatingResponseDto<UserGetAllCustomersResponseDto> = {
      total: count,
      data: results as UserGetAllCustomersResponseDto[],
    };

    return GenericApiResponse.ok(res, response);
  }
);

export const usersGeography = asyncWrapper(
  async (
    req: AppRequest<Empty, Empty, Empty>,
    res: AppResponse<Array<UsersGeographyGetResponseDto>>
  ) => {
    const aggregatorOpts = [
      {
        $unwind: '$country',
      },
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
        },
      },
    ];
    const results = await User.aggregate(aggregatorOpts).exec();

    const iso3Countries = results.map<UsersGeographyGetResponseDto>(
      (country) => {
        return {
          id:
            counterCodeConverter.whereAlpha2(country._id)?.alpha3 ?? 'Unknown',
          value: country.count,
        };
      }
    );

    if (!results) return GenericApiResponse.notFound(res, iso3Countries);

    return GenericApiResponse.ok(res, iso3Countries);
  }
);
