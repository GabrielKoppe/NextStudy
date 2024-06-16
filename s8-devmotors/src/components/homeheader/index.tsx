import Link from 'next/link';
import styles from './styles.module.scss';
import { Menu } from 'lucide-react';

export default function HomeHeader() {
	return (
		<section className={styles.submenu}>
			<div className={styles.submenuIcon}>
				<Menu size={34} color="#121212" />
				Menu
			</div>
			<ul className={styles.ul}>
				<li>
					<Link href="/">Pagina 1</Link>
				</li>
				<li>
					<Link href="/">Pagina 2</Link>
				</li>
			</ul>
		</section>
	);
}
