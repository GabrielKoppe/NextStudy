import Head from 'next/head';
import styles from './styles.module.css';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import TextArea from '@/components/textArea';
import { FiShare2 } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { db } from '../../services/firebaseConnection';

import {
	addDoc,
	collection,
	query,
	orderBy,
	onSnapshot,
	where,
	doc,
	deleteDoc,
} from 'firebase/firestore';
import Link from 'next/link';

interface DashboardProps {
	user: {
		email: string;
	};
}

interface TaskType {
	id: string;
	created: Date;
	public: boolean;
	tarefa: string;
	user: string;
}

export default function Dashboard({ user }: DashboardProps) {
	const [input, setInput] = useState('');
	const [publicTask, setPublicTask] = useState(false);
	const [tasks, setTasks] = useState<TaskType[]>([]);

	useEffect(() => {
		const loadTarefas = async () => {
			const tarefasRef = collection(db, 'tarefas');
			const q = query(
				tarefasRef,
				orderBy('created', 'desc'),
				where('user', '==', user.email),
			);

			onSnapshot(q, (snapshot) => {
				let lista = [] as TaskType[];

				snapshot.forEach((doc) => {
					lista.push({
						id: doc.id,
						created: doc.data().created,
						public: doc.data().public,
						tarefa: doc.data().tarefa,
						user: doc.data().user,
					});
				});

				setTasks(lista);
			});
		};

		loadTarefas();
	}, [user.email]);

	const handleChangePublic = (e: ChangeEvent<HTMLInputElement>) => {
		setPublicTask(e.target.checked);
	};

	const handleRegisterTask = async (e: FormEvent) => {
		e.preventDefault();

		if (input === '') return;

		try {
			await addDoc(collection(db, 'tarefas'), {
				tarefa: input,
				created: new Date(),
				user: user.email,
				public: publicTask,
			});

			setInput('');
			setPublicTask(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleShare = async (id: string) => {
		await navigator.clipboard.writeText(
			`${process.env.NEXT_PUBLIC_URL}/task/${id}`,
		);

		alert('URL copiada com sucesso');
	};

	const handleDeleteTask = async (id: string) => {
		const docRef = doc(db, 'tarefas', id);
		await deleteDoc(docRef);
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
					{tasks.map((item) => (
						<article key={item.id} className={styles.task}>
							{item.public && (
								<div className={styles.tagContainer}>
									<label className={styles.tag}>PUBLICO</label>
									<button
										className={styles.shareButton}
										onClick={() => handleShare(item.id)}
									>
										<FiShare2 size={22} color="#3183ff" />
									</button>
								</div>
							)}
							<div className={styles.taskContent}>
								{item.public ? (
									<Link href={`/task/${item.id}`}>
										<p>{item.tarefa}</p>
									</Link>
								) : (
									<p>{item.tarefa}</p>
								)}
								<button
									className={styles.trashButton}
									onClick={() => handleDeleteTask(item.id)}
								>
									<FaTrash size={24} color="#ea3140" />
								</button>
							</div>
						</article>
					))}
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
		props: {
			user: {
				email: session?.user?.email,
			},
		},
	};
};
