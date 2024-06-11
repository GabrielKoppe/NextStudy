import { GameProps } from '@/utils/types/game';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/container';

async function getGame(id: string): Promise<GameProps> {
	try {
		const res = await fetch(
			`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
			{ next: { revalidate: 320 } },
		);
		return res.json();
	} catch (error) {
		throw new Error('Failed to fetch data');
	}
}

export default async function Game({
	params: { id },
}: {
	params: { id: string };
}) {
	const game = await getGame(id);

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
			</Container>
		</main>
	);
}
