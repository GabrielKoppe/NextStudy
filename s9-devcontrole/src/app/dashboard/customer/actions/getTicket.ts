import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function getTicket() {
	const session = await getServerSession(authOptions);
	const ticket = await prisma.ticket.findMany({
		where: {
			status: 'Aberto',
			custumer: {
				userId: session?.user.id,
			},
		},
		include: {
			custumer: true,
		},
		orderBy: {
			created_at: 'desc',
		},
	});
	return ticket;
}
