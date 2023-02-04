import { Empty, TypedRequest } from '../contracts/Express/TypedRequest';
import { TypedResponse } from '../contracts/Express/TypedResponse';
import {
  UserGetOneRequestDto,
  UserGetOneResponseDto,
} from '../contracts/User/UserGetOneDto';
import User from '../models/User';

export const getUser = async (
  req: TypedRequest<Empty, Empty, UserGetOneRequestDto>,
  res: TypedResponse<UserGetOneResponseDto>
) => {
  try {
    const user: UserGetOneResponseDto | null = await User.findById(
      req.params.id
    );
    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: user,
      });
    res.status(200).json({
      success: true,
      message: 'User found',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      data: error,
    });
  }
};
