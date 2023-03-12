export type TransactionGetAllResponseDto = {
  _id: string;
  userId: string;
  cost: string;
  products: {
    of: number;
    type: Array<string>;
  };
};
