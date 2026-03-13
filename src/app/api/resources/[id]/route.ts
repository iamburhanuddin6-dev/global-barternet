import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { updateResourceSchema } from '@/lib/validations';

// GET /api/resources/[id]
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const resource = await prisma.resource.findUnique({
            where: { id: params.id },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        reputation: true,
                        level: true,
                        walletAddress: true,
                    },
                },
            },
        });

        if (!resource) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }

        return NextResponse.json(resource);
    } catch (error) {
        console.error('Resource GET error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/resources/[id]
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const resource = await prisma.resource.findUnique({
            where: { id: params.id },
        });

        if (!resource) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }

        if (resource.ownerId !== (session.user as any).id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const body = await req.json();
        const validated = updateResourceSchema.parse(body);

        const updated = await prisma.resource.update({
            where: { id: params.id },
            data: validated,
            include: {
                owner: {
                    select: { id: true, name: true, image: true, reputation: true },
                },
            },
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('Resource PUT error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/resources/[id]
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const resource = await prisma.resource.findUnique({
            where: { id: params.id },
        });

        if (!resource) {
            return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        }

        if (resource.ownerId !== (session.user as any).id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.resource.delete({ where: { id: params.id } });

        return NextResponse.json({ message: 'Resource deleted' });
    } catch (error) {
        console.error('Resource DELETE error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
