import { TransactionGetOneResponseDto } from '../transaction/transaction.types';

export type UserGetOneResponseDto = {
  _id: number;
  email: string;
  name: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: 'admin' | 'user' | 'guest' | 'superadmin';
  createdAt: string;
  updatedAt: string;
};

export type UserGetAllResponseDto = Array<UserGetOneResponseDto>;

export type UserGetOneRequestDto = {
  id: string;
};

export type UserGetAllCustomersResponseDto = {
  _id: number;
  email: string;
  name: string;
  city: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
};

export type UserGetAllCustomersRequestDto = {
  email?: string;
  name?: string;
  city?: string;
  occupation?: string;
  phoneNumber?: string;
  transactions?: string[];
};

export type UsersGeographyGetResponseDto = {
  id: string;
  value: number;
};
