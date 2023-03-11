import { NextFunction, Response, Request } from 'express';
import GenericApiResponse from '../../contracts/express/GenericApiResponse';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Logging
  return GenericApiResponse.serverError(res, err);
};
