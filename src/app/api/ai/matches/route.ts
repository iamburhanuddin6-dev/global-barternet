import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { findMatches, runMatchingJob } from '@/lib/ai-matching';

// GET /api/ai/matches?resourceId=xxx — get AI matches for a resource
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const resourceId = searchParams.get('resourceId');

        if (!resourceId) {
            return NextResponse.json(
                { error: 'resourceId is required' },
                { status: 400 }
            );
        }

        const matches = await findMatches(resourceId, (session.user as any).id);
        return NextResponse.json({ matches });
    } catch (error) {
        console.error('AI matches error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/ai/matches — trigger batch matching job
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const results = await runMatchingJob();
        return NextResponse.json({
            message: 'Matching job completed',
            results,
        });
    } catch (error) {
        console.error('AI matching job error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
