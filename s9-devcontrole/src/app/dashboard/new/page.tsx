import Link from 'next/link';
import getCustomers from '../customer/actions/getCustomers';
import { redirect } from 'next/navigation';
import registerTicket from '../customer/actions/registerTicket';

export default async function NewTicket() {
	const customers = await getCustomers();

	async function handleRegisterTicket(formData: FormData) {
		'use server';

		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const customer = formData.get('customer') as string;

		const register = await registerTicket({
			name,
			description,
			customer,
		});

		if (register) {
			redirect('/dashboard');
		}
	}
	return (
		<main className="flex flex-col mt-9 mb-2">
			<div className="flex items-center gap-3">
				<Link
					href="/dashboard"
					className="bg-gray-900 px-4 py-1 rounded text-white hover:font-semibold duration-300"
				>
					Voltar
				</Link>
				<h1 className="text-3xl font-bold">Novo Chamado</h1>
			</div>
			<form className="flex flex-col mt-6" action={handleRegisterTicket}>
				<label className="mb-1 text-lg font-medium">Nome do chamado</label>
				<input
					className="w-full border-2 rounded-md px-2 mb-2 h-11"
					name="name"
					type="text"
					required
					placeholder="Digite o nome do chamado."
				/>
				<label className="mb-1 text-lg font-medium">Descreva o problema</label>
				<textarea
					className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
					name="description"
					placeholder="Descreva o problema."
					required
				></textarea>
				{customers.length !== 0 && (
					<>
						<label className="mb-1 text-lg font-medium">
							Selecione o cliente
						</label>
						<select
							className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
							name="customer"
						>
							{customers.map((customer) => (
								<option key={customer.id} value={customer.id}>
									{customer.name}
								</option>
							))}
						</select>
					</>
				)}

				{customers.length === 0 && (
					<Link href="/dahsboard/customer/new">
						Você ainda não possui nenhum cliente,{' '}
						<span className="text-blue-500 font-medium">
							cadastrar clientes
						</span>
					</Link>
				)}

				<button
					type="submit"
					className="bg-blue-500 my-4 px-2 h-11 text-white font-bold rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
					disabled={customers.length === 0}
				>
					Cadastrar
				</button>
			</form>
		</main>
	);
}
