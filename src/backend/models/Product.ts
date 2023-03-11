import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IProductStat } from './ProductStat';

export interface IProduct extends Document {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  productStat: IProductStat;
}
const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
