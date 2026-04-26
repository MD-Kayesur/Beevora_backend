import { Schema, model } from 'mongoose';
import { ContactModel, IContact } from './contact.interface';

const contactSchema = new Schema<IContact>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Contact = model<IContact, ContactModel>('Contact', contactSchema);
