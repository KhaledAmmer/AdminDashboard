import { IUser } from "../../models/User";

export type UserGetAllCustomersResponseDto = {
  _id: IUser['_id'];
  email: IUser['email'];
  name: IUser['name'];
  city?: IUser['city'];
  occupation: IUser['occupation'];
  phoneNumber: IUser['phoneNumber'];
  transactions: IUser['transactions'];
};
