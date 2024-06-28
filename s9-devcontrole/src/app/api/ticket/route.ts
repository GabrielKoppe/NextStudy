import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
	}

	const { ticketId } = await request.json();

	try {
		const ticket = await prismaClient.ticket.findFirst({
			where: {
				id: ticketId as string,
			},
		});

		if (!ticket) {
			return NextResponse.json(
				{ error: 'Failed update ticket.' },
				{ status: 400 },
			);
		}

		await prismaClient.ticket.update({
			where: {
				id: ticketId as string,
			},
			data: {
				status: 'Fechado',
			},
		});

		return NextResponse.json({ message: 'Ticket updated with success!' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed create new customer.' },
			{ status: 400 },
		);
	}
}
