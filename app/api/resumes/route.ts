import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getResumesByUserId, createResume } from '@/lib/db/resumes';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id || session.user.email;
    const resumes = await getResumesByUserId(userId);
    return NextResponse.json({ data: resumes });
  } catch (error) {
    console.error('Failed to fetch resumes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, targetRole, originalContent } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const userId = (session.user as any).id || (session.user.email as string);
    const newResume = await createResume({
      userId,
      title,
      targetRole,
      originalContent,
      status: 'draft',
    });

    return NextResponse.json({ data: newResume }, { status: 201 });
  } catch (error) {
    console.error('Failed to create resume:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
