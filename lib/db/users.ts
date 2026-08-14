import { getDatabase } from '@/lib/mongodb';
import { UserDocument } from '@/models/User';
import { ObjectId } from 'mongodb';

export async function getUsersCollection() {
  const db = await getDatabase();
  return db.collection<UserDocument>('users');
}

export async function findUserByEmail(email: string): Promise<UserDocument | null> {
  const collection = await getUsersCollection();
  return collection.findOne({ email });
}

export async function createUser(userData: Omit<UserDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<UserDocument> {
  const collection = await getUsersCollection();
  const now = new Date();
  const newUser: UserDocument = {
    ...userData,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newUser);
  return { ...newUser, _id: result.insertedId };
}
