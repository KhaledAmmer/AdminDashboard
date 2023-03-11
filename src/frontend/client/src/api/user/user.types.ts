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
