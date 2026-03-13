import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { updateProfileSchema } from '@/lib/validations';

// GET /api/users/me — get current user profile
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: (session.user as any).id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                walletAddress: true,
                bio: true,
                reputation: true,
                level: true,
                levelName: true,
                xp: true,
                totalExchanges: true,
                createdAt: true,
                _count: {
                    select: {
                        resources: true,
                        sentExchanges: true,
                        receivedExchanges: true,
                        achievements: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Calculate level from XP
        const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000];
        const levelNames = ['Novice', 'Apprentice', 'Trader', 'Merchant', 'Expert', 'Master', 'Grandmaster', 'Legend', 'Mythic', 'Transcendent'];
        let currentLevel = 1;
        for (let i = levelThresholds.length - 1; i >= 0; i--) {
            if (user.xp >= levelThresholds[i]) {
                currentLevel = i + 1;
                break;
            }
        }
        const nextLevelXP = levelThresholds[currentLevel] || levelThresholds[levelThresholds.length - 1];
        const currentLevelXP = levelThresholds[currentLevel - 1] || 0;
        const xpProgress = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

        return NextResponse.json({
            ...user,
            level: currentLevel,
            levelName: levelNames[currentLevel - 1] || 'Transcendent',
            xpProgress: Math.min(100, Math.round(xpProgress)),
            nextLevelXP,
        });
    } catch (error) {
        console.error('User GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/users/me — update profile
export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const validated = updateProfileSchema.parse(body);

        const user = await prisma.user.update({
            where: { id: (session.user as any).id },
            data: validated,
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                walletAddress: true,
                image: true,
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('User PUT error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
