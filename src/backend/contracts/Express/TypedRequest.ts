import { Request } from 'express';
import { Query, Params } from 'express-serve-static-core';

export type Empty = null | undefined;

export type TypedRequest<ReqBody, ReqQuery, ReqParams> = Request<
  ReqParams,
  any,
  ReqBody,
  ReqQuery
>;
