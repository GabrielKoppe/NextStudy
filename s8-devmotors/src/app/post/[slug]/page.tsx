import { getItemBySlug } from '@/utils/actions/get-data';
import styles from './styles.module.scss';
import Hero from '@/components/hero';
import { Phone } from 'lucide-react';
import Container from '@/components/container';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateMetadata({
	params: { slug },
}: {
	params: { slug: string };
}): Promise<Metadata> {
	try {
		const { objects } = await getItemBySlug(slug);

		return {
			title: `Dev Motors - ${objects[0].title}`,
			description: `${objects[0].metadata.description.text}`,
			openGraph: {
				title: `Dev Motors - ${objects[0].title}`,
				images: [objects[0].metadata.banner.url],
			},
			robots: {
				index: true,
				follow: true,
				nocache: true,
				googleBot: {
					index: true,
					follow: true,
					noimageindex: true,
				},
			},
		};
	} catch (error) {
		return {
			title: 'Dev Motors - Sua Oficina Especializada',
			description: 'Oficina - Aprendizado Next',
		};
	}
}

export default async function Page({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const { objects } = await getItemBySlug(slug);

	return (
		<div>
			<Hero
				heading={objects[0].title}
				buttonUrl={objects[0].metadata.button.url}
				buttonTitle={objects[0].metadata.button.title}
				bannerUrl={objects[0].metadata.banner.url}
				icon={<Phone size={20} color="#fff" />}
			/>

			<Container>
				<section className={styles.about}>
					<article className={styles.innerAbout}>
						<h1 className={styles.title}>
							{objects[0].metadata.description.title}
						</h1>
						<p>{objects[0].metadata.description.text}</p>

						{objects[0].metadata.description.button_active && (
							<a
								href={objects[0].metadata.description.button_url as string}
								target="_blank"
								className={styles.link}
							>
								{objects[0].metadata.description.button_title}
							</a>
						)}
					</article>
					<div className={styles.bannerAbout}>
						<Image
							alt={objects[0].title}
							src={objects[0].metadata.description.banner.url}
							priority
							quality={100}
							fill
							className={styles.imageAbout}
							sizes="(max-width: 480px) 100vw, (max-width:1024px) 75vw, 50vw"
						/>
					</div>
				</section>
			</Container>
		</div>
	);
}
