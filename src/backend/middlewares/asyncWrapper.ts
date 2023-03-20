import { NextFunction } from 'express';
import { AppRequest } from '../contracts/Express/typed-request';
import { AppResponse } from '../contracts/Express/typed-response';

type ControllerMethodProps<T> = (
  req: AppRequest<any, any, any>,
  res: AppResponse<T>,
  next: NextFunction
) => Promise<AppResponse<T>>;

export const asyncWrapper = <T>(fun: ControllerMethodProps<T>) => {
  return async (
    req: AppRequest<any, any, any>,
    res: AppResponse<T>,
    next: NextFunction
  ) => {
    try {
      await fun(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
