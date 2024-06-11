import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
	return (
		<main className="flex ">
			<div className="max-w-screen-xl mx-auto px-3">{children}</div>
		</main>
	);
}
