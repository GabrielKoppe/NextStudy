import Head from 'next/head';
import styles from './styles.module.css';
import { GetServerSideProps } from 'next';

import { db } from '../../services/firebaseConnection';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import TextArea from '@/components/textArea';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';

interface TaskProps {
	item: {
		tarefa: string;
		created: string;
		user: string;
		public: boolean;
		taskId: string;
	};
	allComments: CommentType[];
}

type CommentType = {
	id: string;
	comment: string;
	user: string;
	name: string;
	taskId: string;
};

export default function Task({ item, allComments }: TaskProps) {
	const [input, setInput] = useState('');
	const [comments, setComments] = useState<CommentType[]>(allComments || []);
	const { data: session } = useSession();

	const handleComment = async (e: FormEvent) => {
		e.preventDefault();

		if (input === '') return;

		if (!session?.user?.email || !session?.user?.name) return;

		try {
			const docRef = await addDoc(collection(db, 'comments'), {
				comment: input,
				created: new Date(),
				user: session?.user?.email,
				name: session?.user?.name,
				taskId: item?.taskId,
			});

			setInput('');
		} catch (err) {
			console.log(err);
		}
	};

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

				<form onSubmit={handleComment}>
					<TextArea
						placeholder="Digite o seu cometário..."
						value={input}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
							setInput(e.target.value)
						}
					/>
					<button className={styles.button} disabled={!session?.user}>
						Enviar Comentário
					</button>
				</form>
			</section>
			<section className={styles.commentsContainer}>
				<h2>Todos os Comentários</h2>

				{comments.length === 0 && (
					<span>Nenhum comentário foi encontrado...</span>
				)}

				{comments.map((item) => (
					<article key={item.id} className={styles.comment}>
						<p>{item.comment}</p>
					</article>
				))}
			</section>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = params?.id as string;

	const docRef = doc(db, 'tarefas', id);

	const q = query(collection(db, 'comments'), where('taskId', '==', id));
	const snapshotComments = await getDocs(q);

	let allComments: CommentType[] = [];
	snapshotComments.forEach((doc) => {
		allComments.push({
			id: doc.id,
			comment: doc.data()?.comment,
			user: doc.data()?.user,
			name: doc.data()?.name,
			taskId: doc.data()?.taskId,
		});
	});

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
			allComments,
		},
	};
};
