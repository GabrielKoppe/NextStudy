import Image from 'next/image';
import styles from './page.module.css';

interface DataProps {
	id: number;
	name: string;
	full_name: string;
	owner: {
		login: string;
		id: number;
		avatar_url: string;
		url: string;
	};
}

async function getData() {
	const response = await fetch(
		'https://api.github.com/users/GabrielKoppe/repos',
	);
	return response.json();
}

export default async function Home() {
	const data: DataProps[] = await getData();

	return (
		<main className={styles.main}>
			<h1>Pagina Home</h1>
			<br />

			<h3>Meus repositórios</h3>
			{data.map((item) => (
				<div key={item.id}>
					<strong>Repositório: </strong> <a>{item.name}</a>
					<br />
				</div>
			))}
		</main>
	);
}
