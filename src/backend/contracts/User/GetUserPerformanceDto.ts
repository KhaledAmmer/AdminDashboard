import { ITransactions } from 'src/backend/models/Transactions';

export type GetUserPerformanceDto = {
  _id: string;
  username: {_id:string , name:string};
  affiliateSales: Array<ITransactions>;
};
