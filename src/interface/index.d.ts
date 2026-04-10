import { IUserRole } from '../modules/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        role: IUserRole;
      };
    }
  }
}
