'use client';

import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
	name: string;
	register: UseFormRegister<any>;
	error?: string;
	rules?: RegisterOptions;
}

export default function Input({
	name,
	placeholder,
	type,
	register,
	error,
	rules,
}: InputProps) {
	return (
		<>
			<input
				id={name}
				className="w-full border-2 rounded-md h-11 px-2"
				type={type}
				placeholder={placeholder}
				{...register(name, rules)}
			/>
			{error && <p className="text-red-500 my-1">{error}</p>}
		</>
	);
}
