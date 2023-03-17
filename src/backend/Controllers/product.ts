import GenericApiResponse from '../contracts/express/GenericApiResponse';
import { AppRequest, Empty } from '../contracts/express/TypedRequest';
import { AppResponse } from '../contracts/express/TypedResponse';
import { GetOverallStat } from '../contracts/product/GetOverallStat';
import { ProductGetAllResponseDto } from '../contracts/product/ProductGetAllResponseDto.types';
import { ProductGetAllRequestDto } from '../contracts/product/ProductGetAllResquestDto.types';
import { ProductGetOneResponseDto } from '../contracts/product/ProductGetOneDto';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import OverallStat from '../models/OverallStat';
import Product, { IProduct } from '../models/Product';
import ProductStat from '../models/ProductStat';
import Transactions from '../models/Transactions';

export const allProducts = asyncWrapper(
  async (
    req: AppRequest<Empty, ProductGetAllRequestDto, Empty>,
    res: AppResponse<Array<ProductGetAllResponseDto>>
  ) => {
    const products: Array<ProductGetAllResponseDto> | null =
      await Product.find().skip(req.query.page).limit(req.query.limit);
    if (!products) return GenericApiResponse.notFound(res, products);

    return GenericApiResponse.ok(res, products);
  }
);

export const oneProduct = asyncWrapper(
  async (
    req: AppRequest<Empty, Empty, { id: string }>,
    res: AppResponse<ProductGetOneResponseDto>
  ) => {
    const product: IProduct | null = await Product.findOne({
      _id: req.params.id,
    });
    if (!product)
      return GenericApiResponse.notFound(res, product, 'Product not found');

    const productStat = await ProductStat.findOne({ productId: req.params.id });
    if (!productStat) return GenericApiResponse.notFound(res, null);

    /* TODO: USE AUTO MAPPER */
    const newP: ProductGetOneResponseDto = {
      _id: product._id,
      category: product.category,
      description: product.description,
      name: product.name,
      price: product.price,
      productStat: productStat,
      rating: product.rating,
      supply: product.supply,
    };

    return GenericApiResponse.ok(res, newP);
  }
);

export const getDashboardStats = asyncWrapper(
  async (
    req: AppRequest<Empty, Empty, Empty>,
    res: AppResponse<GetOverallStat>
  ) => {
    // hardcoded values
    const currentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-11-15';

    /* Recent Transactions */
    const transactions = await Transactions.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = { ...overallStat[0] };

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    return GenericApiResponse.ok(res, {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    } as GetOverallStat);
  }
);
