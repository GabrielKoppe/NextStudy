import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
	}

	const { name, email, phone, address, userId } = await request.json();

	try {
		await prismaClient.customer.create({
			data: {
				name,
				email,
				phone,
				address: address ? address : '',
				userId,
			},
		});

		return NextResponse.json({ message: 'Create customer with success!' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed create new costumer.' },
			{ status: 400 },
		);
	}
}
