'use client';
import Image from 'next/image';
import { useState } from 'react';

interface OwnerRepoProps {
	avatar_url: string;
	name: string;
}

export default function OwnerRepo({ avatar_url, name }: OwnerRepoProps) {
	const [show, setShow] = useState(false);
	return (
		<div>
			{show && (
				<>
					<Image
						src={avatar_url}
						alt="Foto avatar do usuário"
						width={34}
						height={34}
						style={{
							borderRadius: 8,
						}}
					/>
					<strong>{name}</strong>
				</>
			)}
			<button onClick={() => setShow(!show)}>
				{show ? 'Ocultar nome' : 'Mostrar nome'}
			</button>
		</div>
	);
}
