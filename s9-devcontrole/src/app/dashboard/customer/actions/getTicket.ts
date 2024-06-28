import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function getTicket() {
	const session = await getServerSession(authOptions);
	const ticket = await prisma.ticket.findMany({
		where: { userId: session?.user.id, status: 'Aberto' },
		include: {
			custumer: true,
		},
	});
	return ticket;
}
