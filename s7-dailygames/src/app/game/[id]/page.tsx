import { GameProps } from '@/utils/types/game';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/container';
import Label from './components/label';
import GameCard from '@/components/gameCard';
import { Metadata } from 'next';

interface PropsParams {
	params: {
		id: string;
	};
}

export async function generateMetadata({
	params,
}: PropsParams): Promise<Metadata> {
	try {
		const game = await getGame(params.id);

		return {
			title: game.title,
			description: `${game.description.slice(0, 100)}...`,
			openGraph: {
				title: game.title,
				images: [game.image_url],
			},
		};
	} catch (err) {
		return {
			title: 'Daily Games',
		};
	}
}

async function getGame(id: string): Promise<GameProps> {
	try {
		const res = await fetch(
			`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
			{ cache: 'no-store' },
		);
		return res.json();
	} catch (error) {
		throw new Error('Failed to fetch data');
	}
}

async function getGameSorted(): Promise<GameProps> {
	try {
		const res = await fetch(
			`${process.env.NEXT_API_URL}/next-api/?api=game_day`,
			{ cache: 'no-store' },
		);
		return res.json();
	} catch (error) {
		throw new Error('Failed to fetch data');
	}
}

export default async function Game({ params: { id } }: PropsParams) {
	const game = await getGame(id);
	const gameSorted = await getGameSorted();

	if (!game) {
		redirect('/');
	}

	return (
		<main className="w-full text-black">
			<div className="bg-black w-full h-80 sm:h-98 relative">
				<Image
					src={game.image_url}
					alt={game.title}
					priority
					fill
					quality={100}
					className="object-cover opacity-80 w-full h-80 sm:h-96"
					sizes="(max-width:: 760px) 100vw, (max-width:: 1200px) 44vw"
				/>
			</div>
			<Container>
				<h1 className="font-bold text-xl my-4">{game.title}</h1>
				<p>{game.description}</p>

				<h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
				<div className="flex gap-4 flex-wrap">
					{game.platforms.map((item) => (
						<Label key={item} text={item} />
					))}
				</div>

				<h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
				<div className="flex gap-4 flex-wrap">
					{game.categories.map((item) => (
						<Label key={item} text={item} />
					))}
				</div>

				<p className="mt-7 mb-2">
					<strong>Data de Lançamento:</strong> {game.release}
				</p>

				<h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado</h2>
				<div className="flex">
					<div className="flex-grow">
						<GameCard data={gameSorted} />
					</div>
				</div>
			</Container>
		</main>
	);
}
