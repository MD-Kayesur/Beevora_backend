export type IUserRole = 'user' | 'admin';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: IUserRole;
  isActive: boolean;
  avatar?: string;
}
