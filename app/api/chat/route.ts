import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { analyzeCVAndJob } from '@/lib/chat';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const isUserLoggedIn = !!session?.user;
    const body = await req.json();
    const cvText = body.cvData?.content || body.cvText || '';
    const jobDescription = body.jobData?.description || body.jobDescription || '';

    if (!cvText && !jobDescription) {
      console.warn('[API /api/chat] ⚠️ Neither CV text nor Job Description provided!');
      return NextResponse.json(
        { error: 'Please provide resume text or a job description.' },
        { status: 400 }
      );
    }

    console.log('[API /api/chat] 🤖 Calling analyzeCVAndJob...');
    const result = await analyzeCVAndJob(cvText, jobDescription, isUserLoggedIn);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API /api/chat] Exception in /api/chat route:', error?.stack || error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
