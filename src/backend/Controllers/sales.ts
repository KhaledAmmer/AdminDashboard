import GenericApiResponse from '../contracts/express/GenericApiResponse';
import { AppRequest, Empty } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import OverAllStat, { IOverAllStat } from '../models/OverallStat';

export const getSales = asyncWrapper(
  async (
    req: AppRequest<Empty, Empty, Empty>,
    res: AppResponse<Array<IOverAllStat>>
  ) => {
    const results = await OverAllStat.find({});
    if (!results) return GenericApiResponse.notFound(res, results);

    return GenericApiResponse.ok(res, results);
  }
);
