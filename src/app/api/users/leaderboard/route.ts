import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/users/leaderboard
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit') || '20');
        const sortBy = searchParams.get('sort') || 'reputation'; // reputation, xp, exchanges

        let orderBy: any = { reputation: 'desc' };
        if (sortBy === 'xp') orderBy = { xp: 'desc' };
        if (sortBy === 'exchanges') orderBy = { totalExchanges: 'desc' };

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                image: true,
                reputation: true,
                level: true,
                levelName: true,
                xp: true,
                totalExchanges: true,
                createdAt: true,
                _count: {
                    select: { achievements: true },
                },
            },
            orderBy,
            take: limit,
        });

        // Add rank
        const ranked = users.map((user, index) => ({
            ...user,
            rank: index + 1,
        }));

        return NextResponse.json({ leaderboard: ranked });
    } catch (error) {
        console.error('Leaderboard error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
