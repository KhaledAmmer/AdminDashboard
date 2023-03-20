import { NextFunction, Response, Request } from 'express';
import GenericApiResponse from '../contracts/Express/generic-api-response';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Logging
  return GenericApiResponse.serverError(res, err);
};
