export type SalesGetAllResponseDto = {
  _id: string;
  totalCustomers: number;
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
  salesByCategory: Map<string, number>;
};
