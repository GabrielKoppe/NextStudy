import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<h1>Meu Site</h1>
			<Link href="/">Home</Link>
			<br />
			<Link href="/contatos">Contatos</Link>
			<br />
			<Link href="/dashboard">Painel</Link>
			<br />
			<hr />
		</header>
	);
}
