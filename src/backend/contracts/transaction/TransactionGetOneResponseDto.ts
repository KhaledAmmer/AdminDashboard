import { IProduct } from 'src/backend/models/Product';
import { IUser } from 'src/backend/models/User';

export type TransactionGetOneResponseDto = {
  _id: string;
  userId: IUser;
  cost: string;
  products: {
    of: number;
    type: Array<IProduct>;
  };
};
