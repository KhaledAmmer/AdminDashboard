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
