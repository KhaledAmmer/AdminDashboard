import { TransactionGetOneRequestDto } from "../transaction/transaction.types";

export type ProductGetAllResponseDto = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
};

export type ProductGetAllRequestDto = {
  limit: number;
  page: number;
};

export type ProductStat = {
  _id: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: [
    {
      month: string;
      totalSales: number;
      totalUnits: number;
    }
  ];
  dailyData: [
    {
      date: string;
      totalSales: number;
      totalUnits: number;
    }
  ];
};

export type ProductGetOneResponseDto = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  productStat: ProductStat;
};

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
  transactions: Array<TransactionGetOneRequestDto>;
};
