import { Model } from 'mongoose';

export type IContact = {
  firstName: string;
  lastName?: string;
  email: string;
  message: string;
  date?: string;
};

export type ContactModel = Model<IContact, Record<string, unknown>>;
