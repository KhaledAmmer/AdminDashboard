import mongoose from 'mongoose';
import { ITransactions } from './Transactions';

export interface IAffiliateStat extends Document {
  _id: string;
  userId: string;
  affiliateSales: Array<ITransactions>;
}

const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    affiliateSales: [{
      type: mongoose.Types.ObjectId,
      ref: 'Transactions',
    }],
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model<IAffiliateStat>(
  'AffiliateStat',
  AffiliateStatSchema
);
export default AffiliateStat;
