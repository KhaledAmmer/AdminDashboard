import { NextFunction, Response, Request } from 'express';
import { AppRequest } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';

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
