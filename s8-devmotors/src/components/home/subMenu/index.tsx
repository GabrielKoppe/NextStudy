'use client';

import Link from 'next/link';
import styles from './styles.module.scss';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubMenuType } from '@/utils/types/home.type';

export default function SubMenu({ menu }: { menu: SubMenuType }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleResize = () => {
		if (window.innerWidth > 768) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [isOpen]);

	function toggleMenu() {
		setIsOpen(!isOpen);
	}
	return (
		<section className={styles.submenu}>
			<div className={styles.submenuIcon} onClick={toggleMenu}>
				<Menu size={34} color="#121212" />
				Serviços
			</div>

			<ul className={`${styles.ul} ${isOpen ? styles.open : ''}`}>
				{isOpen && (
					<button onClick={toggleMenu} className={styles.closeButton}>
						<X size={54} color="#121212" />
					</button>
				)}
				<li>
					<Link href="/post/pagina-1">Pagina 1</Link>
				</li>
				<li>
					<Link href="/post/pagina-2">Pagina 2</Link>
				</li>
			</ul>
		</section>
	);
}
