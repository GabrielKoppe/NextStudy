import { Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Painel - Aprendendo NextJS',
	description: 'Painel do Site',
	keywords: ['HTML', 'css', 'Javascript', 'programação'],
	openGraph: {
		title: 'Titulo do OG',
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

export default function Dashboard() {
	return (
		<div>
			<h1>Pagina de Painel</h1>
			<span>Bem vindo ao Painel do site</span>
			<br />
		</div>
	);
}
