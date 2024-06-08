'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<div>
			<h2>Ops algo deu errado</h2>
			<div>
				<Link href="/">Voltar para página inicial</Link>
			</div>
		</div>
	);
}
