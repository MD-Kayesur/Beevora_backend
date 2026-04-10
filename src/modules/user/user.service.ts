import { User } from './user.model';
import { IUser } from './user.interface';

const getMyProfile = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email });
  return result;
};

const updateMyProfile = async (email: string, payload: Partial<IUser>): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ email }, payload, { new: true });
  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const updateUserRole = async (id: string, role: string): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(id, { role }, { new: true });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
