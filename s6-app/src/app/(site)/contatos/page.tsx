import { Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Contatos - Aprendendo NextJS',
	description: 'Contatos do Site',
	keywords: ['HTML', 'css', 'Javascript', 'programação'],
	openGraph: {
		images: ['https://avatars.githubusercontent.com/u/54375327?v=4'],
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
		},
	},
};

export default function Contatos() {
	return (
		<div>
			<h1>Página de contatos</h1>
		</div>
	);
}
