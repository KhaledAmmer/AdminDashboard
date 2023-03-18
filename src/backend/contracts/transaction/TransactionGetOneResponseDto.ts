import { IProduct } from "../../models/Product";
import { IUser } from "../../models/User";

export type TransactionGetOneResponseDto = {
  _id: string;
  userId: IUser;
  cost: string;
  products: {
    of: number;
    type: Array<IProduct>;
  };
};
