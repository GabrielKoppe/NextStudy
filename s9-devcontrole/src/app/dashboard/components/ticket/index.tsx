'use client';

import { api } from '@/lib/api';
import { ModalContext } from '@/providers/modal';
import { TicketType } from '@/util/types/ticket.type';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FiCheckSquare, FiFile } from 'react-icons/fi';

export default function TicketItem({ ticket }: { ticket: TicketType }) {
	const router = useRouter();
	const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

	async function handleChangeStatus() {
		try {
			await api
				.patch('/api/ticket', {
					ticketId: ticket.id,
				})
				.then(() => {
					router.refresh();
				});
		} catch (error) {
			console.log(error);
		}
	}

	function handleOpenModal() {
		setDetailTicket(ticket);
		handleModalVisible();
	}

	return (
		<>
			<tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-gray-200 duration-300">
				<td className="text-left pl-1">{ticket.name}</td>
				<td className="text-left">{ticket.created_at?.toLocaleDateString()}</td>
				<td className="text-left hidden sm:table-cell">
					<span className="bg-green-500 px-2 py-1 rounded">
						{ticket.status}
					</span>
				</td>
				<td className="text-left">
					<button className="mr-3" onClick={handleChangeStatus}>
						<FiCheckSquare size={24} color="#131313" />
					</button>
					<button onClick={handleOpenModal}>
						<FiFile size={24} color="#3b82f6" />
					</button>
				</td>
			</tr>
		</>
	);
}
