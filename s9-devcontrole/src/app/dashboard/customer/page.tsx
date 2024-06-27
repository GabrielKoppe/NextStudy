import Link from 'next/link';
import getCustomers from './actions/getCustomers';
import CardCostumer from './components/card';

export default async function Customer() {
	const customers = await getCustomers();

	return (
		<main className="mt-9 mb-2">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Meus Clientes</h1>
				<Link
					href="/dashboard/customer/new"
					className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-600 duration-300"
				>
					Novo Cliente
				</Link>
			</div>
			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
				{customers.map((customer) => (
					<CardCostumer key={customer.id} customer={customer} />
				))}
				{customers.length === 0 && (
					<h1 className="text-gray-600">
						Você ainda não possui nenhum cliente.
					</h1>
				)}
			</section>
		</main>
	);
}
