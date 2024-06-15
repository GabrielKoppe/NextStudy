'use client';

import Link from 'next/link';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

export default function Header() {
	const [top, setTop] = useState(true);

	const handlerScroll = () => {
		const isOnTop = !(window.scrollY > 10);
		setTop(isOnTop);
	};

	useEffect(() => {
		window.addEventListener('scroll', handlerScroll);

		return () => window.removeEventListener('scroll', handlerScroll);
	}, [top]);

	return (
		<header
			className={`${styles.header} ${top ? styles.background : styles.fixed}`}
		>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.logo}>
						<Link href="/">Dev Motors</Link>
					</div>
					<nav>
						<Link href="/">HOME</Link>
						<Link href="/#servicos">SERVIÇOS</Link>
						<Link href="/#contatos">CONTATOS</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}
