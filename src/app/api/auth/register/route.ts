import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = registerSchema.parse(body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validated.email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validated.password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                name: validated.name,
                email: validated.email,
                hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        // Create "First Blood" achievement notification
        await prisma.notification.create({
            data: {
                userId: user.id,
                type: 'system',
                title: 'Welcome to BarterNet!',
                message: 'Your account has been created. Start by listing your first resource.',
                link: '/resources',
            },
        });

        return NextResponse.json(
            { message: 'Account created successfully', user },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
