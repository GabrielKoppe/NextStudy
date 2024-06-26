import Image from 'next/image';
import styles from './page.module.css';
import OwnerRepo from '@/components/OwnerRepo';

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
async function delayFetch(url: string, delay: number) {
	await new Promise((resolve) => setTimeout(resolve, delay));
	const response = await fetch(url, { next: { revalidate: 60 } });
	return response.json();
}
// async function getData() {
// 	const response = await fetch(
// 		'https://api.github.com/users/GabrielKoppe/repos',
// 	);
// 	return response.json();
// }

async function getData() {
	const data = await delayFetch(
		'https://api.github.com/users/GabrielKoppe/repos',
		1500,
	);
	return data;
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
					<OwnerRepo
						avatar_url={item.owner.avatar_url}
						name={item.owner.login}
					/>
					<br />
				</div>
			))}
		</main>
	);
}
