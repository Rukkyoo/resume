import { getDatabase } from '@/lib/mongodb';
import { ResumeDocument } from '@/models/Resume';
import { ObjectId } from 'mongodb';

export async function getResumesCollection() {
  const db = await getDatabase();
  return db.collection<ResumeDocument>('resumes');
}

export async function getResumesByUserId(userId: string): Promise<ResumeDocument[]> {
  const collection = await getResumesCollection();
  return collection.find({ userId }).sort({ updatedAt: -1 }).toArray();
}

export async function getResumeById(id: string, userId: string): Promise<ResumeDocument | null> {
  const collection = await getResumesCollection();
  try {
    return collection.findOne({ _id: new ObjectId(id), userId });
  } catch {
    return null;
  }
}

export async function createResume(resumeData: Omit<ResumeDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<ResumeDocument> {
  const collection = await getResumesCollection();
  const now = new Date();
  const newResume: ResumeDocument = {
    ...resumeData,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(newResume);
  return { ...newResume, _id: result.insertedId };
}

export async function deleteResume(id: string, userId: string): Promise<boolean> {
  const collection = await getResumesCollection();
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id), userId });
    return result.deletedCount === 1;
  } catch {
    return false;
  }
}
