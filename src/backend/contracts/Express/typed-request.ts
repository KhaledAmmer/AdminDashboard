import { Request } from 'express';

export type Empty = null | undefined;

export type AppRequest<ReqBody, ReqQuery, ReqParams> = Request<
  ReqParams,
  any,
  ReqBody,
  ReqQuery
>;
