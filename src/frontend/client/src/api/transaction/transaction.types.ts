import { ProductGetOneResponseDto } from "../product/product.types";
import { UserGetOneResponseDto } from "../user/user.types";

export type TransactionGetAllResponseDto = {
    _id: string;
    userId: string;
    cost: string;
    products: {
      of: number;
      type: Array<string>;
    };
  };
  
export type TransactionGetOneResponseDto = {
  _id: string;
  userId: UserGetOneResponseDto;
  cost: string;
  products: {
    of: number;
    type: Array<ProductGetOneResponseDto>;
  };
};

export type TransactionGetOneRequestDto = {
    username: string;
    cost: string;
  };
  