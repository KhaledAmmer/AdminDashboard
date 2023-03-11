import GenericApiResponse from '../contracts/express/GenericApiResponse';
import { Empty, AppRequest } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';
import {
  UserGetOneRequestDto,
  UserGetOneResponseDto,
} from '../contracts/user/UserGetOneDto';

import User from '../models/User';
import { NextFunction } from 'express';

export const getUser = async (
  req: AppRequest<Empty, Empty, UserGetOneRequestDto>,
  res: AppResponse<UserGetOneResponseDto>,
  next: NextFunction
) => {
  try {
    const user: UserGetOneResponseDto | null = await User.findById(
      req.params.id
    );
    if (!user) return GenericApiResponse.notFound(res, user);

    return GenericApiResponse.ok(res, user);
  } catch (error) {
    next(error);
  }
};
