import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { createResourceSchema } from '@/lib/validations';

// GET /api/resources — list + search resources
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const query = searchParams.get('query') || '';
        const category = searchParams.get('category') || '';
        const status = searchParams.get('status') || 'available';
        const minValue = parseFloat(searchParams.get('minValue') || '0');
        const maxValue = parseFloat(searchParams.get('maxValue') || '999999');

        const where: any = {};

        if (status && status !== 'all') {
            where.status = status;
        }

        if (category && category !== 'All') {
            where.category = category;
        }

        if (query) {
            where.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { tags: { hasSome: [query.toLowerCase()] } },
            ];
        }

        if (minValue > 0 || maxValue < 999999) {
            where.estimatedValue = {
                gte: minValue,
                lte: maxValue,
            };
        }

        const [resources, total] = await Promise.all([
            prisma.resource.findMany({
                where,
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            reputation: true,
                            walletAddress: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.resource.count({ where }),
        ]);

        return NextResponse.json({
            resources,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Resources GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/resources — create a new resource
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const validated = createResourceSchema.parse(body);

        const resource = await prisma.resource.create({
            data: {
                ...validated,
                ownerId: (session.user as any).id,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        reputation: true,
                    },
                },
            },
        });

        return NextResponse.json(resource, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('Resources POST error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
