import GenericApiResponse from '../contracts/Express/generic-api-response';
import { AppRequest, Empty } from '../contracts/Express/typed-request';
import { AppResponse } from '../contracts/Express/typed-response';
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
