'use client';

import Input from '@/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1, 'O campo nome é Obrigatório.'),
	email: z
		.string()
		.email('Digite um email válido.')
		.min(1, 'O campo email é obrigatório'),
	phone: z
		.string()
		.refine(
			(value) =>
				/^(?:\(d{2}\)\s?)?\d{9}$/.test(value) ||
				/^\d{2}\s?\d{9}$/.test(value) ||
				/^\d{11}$/.test(value),
			{
				message: 'O numero de telefone deve estar (DD) 999999999',
			},
		),
	address: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function NewCostumerForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	function handleRegisterSubmit(data: FormData) {}

	return (
		<form
			className="flex flex-col mt-6"
			onSubmit={handleSubmit(handleRegisterSubmit)}
		>
			<label className="mb-1 text-lg font-medium">Nome completo</label>
			<Input
				name="name"
				type="text"
				placeholder="Digite o nome completo."
				register={register}
				error={errors.name?.message}
			/>

			<section className="flex gap-2 mt-2 flex-col sm:flex-row">
				<div className="flex-1">
					<label className="mb-1 text-lg font-medium">Telefone</label>
					<Input
						name="phone"
						type="text"
						placeholder="(DD)999999999"
						register={register}
						error={errors.phone?.message}
					/>
				</div>
				<div className="flex-1">
					<label className="mb-1 text-lg font-medium">Email</label>
					<Input
						name="email"
						type="text"
						placeholder="Digite o email."
						register={register}
						error={errors.email?.message}
					/>
				</div>
			</section>

			<label className="mb-1 text-lg font-medium mt-2">Endereço completo</label>
			<Input
				name="address"
				type="text"
				placeholder="Digite o endereço do cliente."
				register={register}
				error={errors.address?.message}
			/>

			<button
				type="submit"
				className="bg-blue-500 my-4 px-2 h-11 text-white font-bold rounded"
			>
				Cadastrar
			</button>
		</form>
	);
}
