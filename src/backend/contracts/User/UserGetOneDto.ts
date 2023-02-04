import { IUser } from 'src/backend/models/User';

export type UserGetOneRequestDto = {
  id: string;
};

export type UserGetOneResponseDto = {
  _id: IUser['_id'];
  email: IUser['email'];
  name: IUser['name'];
  city: IUser['city'];
  state: IUser['state'];
  country: IUser['country'];
  occupation: IUser['occupation'];
  phoneNumber: IUser['phoneNumber'];
  transactions: IUser['transactions'];
  role: IUser['role'];
  createdAt: IUser['createdAt'];
};
