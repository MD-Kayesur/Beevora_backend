import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../user/user.model';
import { IUser } from '../user/user.interface';
import config from '../../config/env';
import { ILoginUser, ILoginResponse } from './auth.interface';

const createToken = (payload: object, secret: Secret, expireIn: string | number) => {
  const options: SignOptions = {
    expiresIn: expireIn as any,
  };
  return jwt.sign(payload, secret, options);
};

const register = async (userData: IUser): Promise<Partial<IUser>> => {
  // Force admin role for specific user
  if (userData.email === 'rmdkayesur@gmail.com') {
    userData.role = 'admin';
  }
  
  const user = await User.create(userData);
  const result = user.toObject();
  delete result.password;
  return result;
};

const login = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, (user as any).password);
  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }

  const accessToken = createToken(
    { email: user.email, role: user.role, id: user._id },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  );

  const refreshToken = createToken(
    { email: user.email, role: user.role, id: user._id },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  };
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwt.verify(token, config.jwt_refresh_secret as string) as jwt.JwtPayload;
  } catch (err) {
    throw new Error('Invalid Refresh Token');
  }

  const { email } = verifiedToken;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const accessToken = createToken(
    { id: user._id, email: user.email, role: user.role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  register,
  login,
  refreshToken,
  createToken,
};
