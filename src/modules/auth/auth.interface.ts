import { IUserRole } from '../user/user.interface';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: any;
    name: string;
    email: string;
    role: IUserRole;
    avatar?: string;
  };
}
