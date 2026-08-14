import { ObjectId } from 'mongodb';

export interface ResumeDocument {
  _id?: ObjectId;
  userId: string;
  title: string;
  targetRole?: string;
  originalContent?: string;
  tailoredContent?: string;
  atsScore?: number;
  skills?: string[];
  status: 'draft' | 'analyzed' | 'tailored';
  createdAt: Date;
  updatedAt: Date;
}
