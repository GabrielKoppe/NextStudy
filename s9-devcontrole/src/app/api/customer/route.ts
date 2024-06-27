import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
	}

	const { name, email, phone, address } = await request.json();

	try {
		await prismaClient.customer.create({
			data: {
				name,
				email,
				phone,
				address: address ? address : '',
				userId: session.user.id,
			},
		});

		return NextResponse.json({ message: 'Create customer with success!' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed create new customer.' },
			{ status: 400 },
		);
	}
}

export async function DELETE(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const customerId = searchParams.get('id');

	if (!customerId) {
		return NextResponse.json(
			{ error: 'Failed delete customer.' },
			{ status: 400 },
		);
	}

	const findTickets = await prismaClient.ticket.findFirst({
		where: {
			custumerId: customerId,
		},
	});

	if (findTickets) {
		return NextResponse.json(
			{ error: 'Failed delete customer.' },
			{ status: 400 },
		);
	}

	try {
		await prismaClient.customer.delete({ where: { id: customerId as string } });

		return NextResponse.json({
			message: 'customer has been deleted with success!',
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed delete customer.' },
			{ status: 400 },
		);
	}
}
