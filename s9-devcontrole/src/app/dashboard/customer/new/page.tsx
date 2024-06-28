import Link from 'next/link';
import NewCostumerForm from '../components/form';

export default function NewCustumer() {
	return (
		<main className="flex flex-col mt-9 mb-2">
			<div className="flex items-center gap-3">
				<Link
					href="/dashboard/costumer"
					className="bg-gray-900 px-4 py-1 rounded text-white hover:font-semibold duration-300"
				>
					Voltar
				</Link>
				<h1 className="text-3xl font-bold">Novo Cliente</h1>
			</div>
			<NewCostumerForm />
		</main>
	);
}
