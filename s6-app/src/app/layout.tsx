import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';

export const metadata: Metadata = {
	title: 'Meu Site - Aprendendo NextJS',
	description: 'Site para praticar',
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
