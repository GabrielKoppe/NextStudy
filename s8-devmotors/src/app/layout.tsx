import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dev Motors - Sua Oficina Especializada',
	description: 'Oficina - Aprendizado Next',
	keywords: ['Oficina', 'Carros', 'Manutenção'],
	openGraph: {
		title: 'Dev Motors - Sua Oficina Especializada',
		images: [`${process.env.PROJECT_URL}/logo.jpg`],
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
			<body className={inter.className}>
				<Header />
				{children}
				<p style={{ textAlign: 'center', marginTop: 54, marginBottom: 34 }}>
					Todos os direitos reservados @{`${new Date().getFullYear()}`}
				</p>
			</body>
		</html>
	);
}
