import { IProductStat } from 'src/backend/models/ProductStat';

export type ProductGetOneResponseDto = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  productStat: IProductStat;
};
