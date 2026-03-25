import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { createExchangeSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/exchanges — list user's exchanges
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status') || 'all';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        const where: any = {
            OR: [
                { senderId: userId },
                { receiverId: userId },
            ],
        };

        if (status !== 'all') {
            where.status = status;
        }

        const [exchanges, total] = await Promise.all([
            prisma.exchange.findMany({
                where,
                include: {
                    sender: {
                        select: { id: true, name: true, image: true, reputation: true },
                    },
                    receiver: {
                        select: { id: true, name: true, image: true, reputation: true },
                    },
                    offeredResource: true,
                    requestedResource: true,
                    messages: {
                        take: 1,
                        orderBy: { createdAt: 'desc' },
                    },
                },
                orderBy: { updatedAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.exchange.count({ where }),
        ]);

        return NextResponse.json({
            exchanges,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    } catch (error) {
        console.error('Exchanges GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/exchanges — propose a new exchange
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const body = await req.json();
        const validated = createExchangeSchema.parse(body);

        // Verify ownership of offered resource
        const offeredResource = await prisma.resource.findUnique({
            where: { id: validated.offeredResourceId },
        });

        if (!offeredResource || offeredResource.ownerId !== userId) {
            return NextResponse.json(
                { error: 'You can only offer your own resources' },
                { status: 403 }
            );
        }

        if (offeredResource.status !== 'available') {
            return NextResponse.json(
                { error: 'This resource is not available for exchange' },
                { status: 400 }
            );
        }

        // Verify requested resource exists and is available
        const requestedResource = await prisma.resource.findUnique({
            where: { id: validated.requestedResourceId },
        });

        if (!requestedResource) {
            return NextResponse.json({ error: 'Requested resource not found' }, { status: 404 });
        }

        if (requestedResource.ownerId === userId) {
            return NextResponse.json(
                { error: 'You cannot trade with yourself' },
                { status: 400 }
            );
        }

        if (requestedResource.status !== 'available') {
            return NextResponse.json(
                { error: 'Requested resource is not available' },
                { status: 400 }
            );
        }

        // Calculate AI match score (simple algorithm)
        const valueDiff = Math.abs(offeredResource.estimatedValue - requestedResource.estimatedValue);
        const maxValue = Math.max(offeredResource.estimatedValue, requestedResource.estimatedValue);
        const valueMatch = Math.max(0, 100 - (valueDiff / maxValue) * 100);

        const categoryMatch = offeredResource.category === requestedResource.category ? 10 : 0;
        const aiMatchScore = Math.min(100, Math.round(valueMatch * 0.8 + categoryMatch + Math.random() * 10));

        // Create the exchange
        const exchange = await prisma.exchange.create({
            data: {
                senderId: userId,
                receiverId: validated.receiverId,
                offeredResourceId: validated.offeredResourceId,
                requestedResourceId: validated.requestedResourceId,
                senderNote: validated.senderNote,
                aiMatchScore,
                status: 'pending',
            },
            include: {
                sender: { select: { id: true, name: true, image: true } },
                receiver: { select: { id: true, name: true, image: true } },
                offeredResource: true,
                requestedResource: true,
            },
        });

        // Update resource statuses
        await Promise.all([
            prisma.resource.update({
                where: { id: validated.offeredResourceId },
                data: { status: 'in-negotiation' },
            }),
            prisma.resource.update({
                where: { id: validated.requestedResourceId },
                data: { status: 'in-negotiation' },
            }),
        ]);

        // Notify the receiver
        await prisma.notification.create({
            data: {
                userId: validated.receiverId,
                type: 'trade',
                title: 'New Trade Proposal',
                message: `${session.user.name} wants to trade "${offeredResource.name}" for your "${requestedResource.name}"`,
                link: `/trades/${exchange.id}`,
            },
        });

        return NextResponse.json(exchange, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('Exchange POST error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
