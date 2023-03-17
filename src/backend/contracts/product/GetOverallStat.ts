import { ITransactions } from 'src/backend/models/Transactions';

export type GetOverallStat = {
  totalCustomers: number;
  yearlyTotalSoldUnits: number;
  yearlySalesTotal: number;
  monthlyData: [
    {
      month: string;
      totalSales: number;
      totalUnits: number;
    }
  ];
  salesByCategory: Map<string, number>;
  thisMonthStats?: {
    month: string;
    totalSales: number;
    totalUnits: number;
  };
  todayStats?: {
    date: string;
    totalSales: number;
    totalUnits: number;
  };
  transactions: Array<ITransactions>;
};
