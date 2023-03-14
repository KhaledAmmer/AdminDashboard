import mongoose from 'mongoose';
import { IUser } from './User';

export interface ITransactions extends Document {
  _id: string;
  userId: IUser['_id'];
  cost: string;
  products: {
    of: number;
    type: Array<string>;
  };
}

const TransactionsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cost: String,
    products: {
      of: Number,
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
  },
  { timestamps: true }
);

const Transactions = mongoose.model<ITransactions>(
  'Transactions',
  TransactionsSchema
);
export default Transactions;
