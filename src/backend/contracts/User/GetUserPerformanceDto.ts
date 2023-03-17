import { ITransactions } from "src/backend/models/Transactions";

export type GetUserPerformanceDto = {
    _id: string;
    username: string;
    affiliateSales: Array<ITransactions>;
  }