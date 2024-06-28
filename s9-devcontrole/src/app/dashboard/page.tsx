import Link from 'next/link';
import TicketItem from './components/ticket';
import getTicket from './customer/actions/getTicket';

export default async function Dashboard() {
	const tickets = await getTicket();
	console.log(tickets);

	return (
		<main className="mt-9 mb-2">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Chamados</h1>
				<Link
					href="/dashboard/new"
					className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-600 duration-300"
				>
					Abrir Chamado
				</Link>
			</div>

			<table className="min-w-full my-2">
				<thead>
					<tr>
						<th className="font-medium text-left uppercase pl-1">Cliente</th>
						<th className="font-medium text-left uppercase hidden sm:block">
							Data Cadastro
						</th>
						<th className="font-medium text-left uppercase">Status</th>
						<th className="font-medium text-left uppercase">#</th>
					</tr>
				</thead>
				<tbody>
					{tickets.map((ticket) => (
						<TicketItem key={ticket.id} ticket={ticket} />
					))}
				</tbody>
			</table>
		</main>
	);
}
