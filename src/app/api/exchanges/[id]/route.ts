import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { respondExchangeSchema } from '@/lib/validations';

// GET /api/exchanges/[id] — get exchange details
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const exchange = await prisma.exchange.findUnique({
            where: { id: params.id },
            include: {
                sender: {
                    select: { id: true, name: true, image: true, reputation: true, level: true },
                },
                receiver: {
                    select: { id: true, name: true, image: true, reputation: true, level: true },
                },
                offeredResource: true,
                requestedResource: true,
                messages: {
                    include: {
                        sender: { select: { id: true, name: true, image: true } },
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });

        if (!exchange) {
            return NextResponse.json({ error: 'Exchange not found' }, { status: 404 });
        }

        const userId = (session.user as any).id;
        if (exchange.senderId !== userId && exchange.receiverId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json(exchange);
    } catch (error) {
        console.error('Exchange GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/exchanges/[id] — respond to exchange (accept/reject/counter/complete)
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const body = await req.json();
        const { action, note, counterOffer } = respondExchangeSchema.parse(body);

        const exchange = await prisma.exchange.findUnique({
            where: { id: params.id },
            include: {
                offeredResource: true,
                requestedResource: true,
                sender: { select: { id: true, name: true } },
                receiver: { select: { id: true, name: true } },
            },
        });

        if (!exchange) {
            return NextResponse.json({ error: 'Exchange not found' }, { status: 404 });
        }

        if (exchange.senderId !== userId && exchange.receiverId !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const otherUserId = exchange.senderId === userId ? exchange.receiverId : exchange.senderId;
        const userName = session.user.name || 'A user';

        switch (action) {
            case 'accept': {
                if (exchange.status !== 'pending' && exchange.status !== 'negotiating') {
                    return NextResponse.json({ error: 'Cannot accept this exchange' }, { status: 400 });
                }

                const updated = await prisma.exchange.update({
                    where: { id: params.id },
                    data: {
                        status: 'negotiating',
                        receiverNote: note,
                    },
                });

                await prisma.notification.create({
                    data: {
                        userId: otherUserId,
                        type: 'trade',
                        title: 'Trade Accepted!',
                        message: `${userName} accepted your trade proposal.`,
                        link: `/trades/${exchange.id}`,
                    },
                });

                return NextResponse.json(updated);
            }

            case 'reject': {
                const updated = await prisma.exchange.update({
                    where: { id: params.id },
                    data: { status: 'cancelled' },
                });

                // Release resources
                await Promise.all([
                    prisma.resource.update({
                        where: { id: exchange.offeredResourceId },
                        data: { status: 'available' },
                    }),
                    prisma.resource.update({
                        where: { id: exchange.requestedResourceId },
                        data: { status: 'available' },
                    }),
                ]);

                await prisma.notification.create({
                    data: {
                        userId: otherUserId,
                        type: 'trade',
                        title: 'Trade Declined',
                        message: `${userName} declined the trade proposal.`,
                        link: `/trades/${exchange.id}`,
                    },
                });

                return NextResponse.json(updated);
            }

            case 'counter': {
                const updated = await prisma.exchange.update({
                    where: { id: params.id },
                    data: {
                        status: 'negotiating',
                        counterOffer,
                        ...(exchange.senderId === userId
                            ? { senderNote: note }
                            : { receiverNote: note }),
                    },
                });

                await prisma.notification.create({
                    data: {
                        userId: otherUserId,
                        type: 'trade',
                        title: 'Counter Offer',
                        message: `${userName} sent a counter-offer.`,
                        link: `/trades/${exchange.id}`,
                    },
                });

                return NextResponse.json(updated);
            }

            case 'complete': {
                if (exchange.status !== 'negotiating') {
                    return NextResponse.json({ error: 'Can only complete negotiating exchanges' }, { status: 400 });
                }

                const updated = await prisma.exchange.update({
                    where: { id: params.id },
                    data: {
                        status: 'completed',
                        completedAt: new Date(),
                    },
                });

                // Mark resources as exchanged
                await Promise.all([
                    prisma.resource.update({
                        where: { id: exchange.offeredResourceId },
                        data: { status: 'exchanged' },
                    }),
                    prisma.resource.update({
                        where: { id: exchange.requestedResourceId },
                        data: { status: 'exchanged' },
                    }),
                ]);

                // Update user stats
                await Promise.all([
                    prisma.user.update({
                        where: { id: exchange.senderId },
                        data: {
                            totalExchanges: { increment: 1 },
                            reputation: { increment: 0.1 },
                            xp: { increment: 50 },
                        },
                    }),
                    prisma.user.update({
                        where: { id: exchange.receiverId },
                        data: {
                            totalExchanges: { increment: 1 },
                            reputation: { increment: 0.1 },
                            xp: { increment: 50 },
                        },
                    }),
                ]);

                // Notify both
                await Promise.all([
                    prisma.notification.create({
                        data: {
                            userId: exchange.senderId,
                            type: 'trade',
                            title: 'Trade Completed! 🎉',
                            message: `Your trade for "${exchange.requestedResource.name}" is complete. +50 XP`,
                            link: `/trades/${exchange.id}`,
                        },
                    }),
                    prisma.notification.create({
                        data: {
                            userId: exchange.receiverId,
                            type: 'trade',
                            title: 'Trade Completed! 🎉',
                            message: `Your trade for "${exchange.offeredResource.name}" is complete. +50 XP`,
                            link: `/trades/${exchange.id}`,
                        },
                    }),
                ]);

                return NextResponse.json(updated);
            }

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('Exchange PUT error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
