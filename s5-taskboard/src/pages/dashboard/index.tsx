import Head from 'next/head';
import styles from './styles.module.css';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import TextArea from '@/components/textArea';
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Dashboard() {
	const [input, setInput] = useState('');
	const [publicTask, setPublicTask] = useState(false);

	const handleChangePublic = (e: ChangeEvent<HTMLInputElement>) => {
		setPublicTask(e.target.checked);
	};

	const handleRegisterTask = (e: FormEvent) => {
		e.preventDefault();

		if (input === '') return;
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Meu painel de tarefas</title>
			</Head>

			<main className={styles.main}>
				<section className={styles.content}>
					<div className={styles.contentForm}>
						<h1 className={styles.title}>Qual sua tarefa?</h1>
						<form onSubmit={handleRegisterTask}>
							<TextArea
								placeholder="Digite qual a sua tarefa..."
								value={input}
								onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
									setInput(e.target.value)
								}
							/>
							<div className={styles.checkboxArea}>
								<input
									type="checkbox"
									className={styles.checkbox}
									checked={publicTask}
									onChange={handleChangePublic}
								/>
								<label>Deixar tarefa publica?</label>
							</div>

							<button type="submit" className={styles.button}>
								Registrar
							</button>
						</form>
					</div>
				</section>
				<section className={styles.taskContainer}>
					<h1>Minhas Tarefas</h1>
					<article className={styles.task}>
						<div className={styles.tagContainer}>
							<label className={styles.tag}>PUBLICO</label>
							<button className={styles.shareButton}>
								<FiShare2 size={22} color="#3183ff" />
							</button>
						</div>
						<div className={styles.taskContent}>
							<p>Minha primeira tarefa</p>
							<button className={styles.trashButton}>
								<FaTrash size={24} color="#ea3140" />
							</button>
						</div>
					</article>
				</section>
			</main>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });

	if (!session?.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};
