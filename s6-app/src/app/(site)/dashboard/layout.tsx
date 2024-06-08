import Link from 'next/link';
import React from 'react';
import styles from './dashboard.module.css';

export const metadata = {
	title: 'Painel do Site',
	description: 'Esse é o painel demonstrativo do site',
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={styles.header}>
			<h3> Header Painel</h3>
			<Link href="/dashboard/settings">Configuração</Link>
			<br />
			<Link href="/dashboard/register">Cadastro</Link>
			<br />
			{children}
		</div>
	);
}
