import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function registerTicket({
	name,
	description,
	customer,
}: {
	name?: string;
	description?: string;
	customer?: string;
}) {
	if (!name || !description || !customer) {
		return false;
	}

	const session = await getServerSession(authOptions);

	await prismaClient.ticket.create({
		data: {
			name,
			description,
			custumerId: customer,
			userId: session?.user.id,
			status: 'Aberto',
		},
	});

	return true;
}
