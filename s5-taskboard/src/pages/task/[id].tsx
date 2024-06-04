import Head from 'next/head';
import styles from './styles.module.css';
import { GetServerSideProps } from 'next';

import { db } from '../../services/firebaseConnection';
import { doc, getDoc } from 'firebase/firestore';
import TextArea from '@/components/textArea';

interface TaskProps {
	item: {
		tarefa: string;
		created: string;
		user: string;
		public: boolean;
		taskId: string;
	};
}

export default function Task({ item }: TaskProps) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Tarefa - Detalhe da tarefa</title>
			</Head>

			<main className={styles.main}>
				<h1>Tarefa</h1>

				<article className={styles.task}>
					<p>{item.tarefa}</p>
				</article>
			</main>
			<section className={styles.commentsContainer}>
				<h2>Deixar comentário</h2>

				<form>
					<TextArea placeholder="Digite o seu cometário" />
					<button className={styles.button}>Enviar Comentário</button>
				</form>
			</section>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = params?.id as string;

	const docRef = doc(db, 'tarefas', id);
	const snapshot = await getDoc(docRef);

	if (!snapshot.data() || !snapshot.data()?.public) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const miliseconds = snapshot.data()?.created?.seconds * 1000;

	const task = {
		...snapshot.data(),
		created: new Date(miliseconds).toLocaleDateString(),
		taskId: id,
	};

	return {
		props: {
			item: task,
		},
	};
};
