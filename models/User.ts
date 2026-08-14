import { ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  image?: string;
  role?: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
