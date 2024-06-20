import Image from 'next/image';
import styles from './styles.module.scss';
import React from 'react';
import { HomeDataType } from '@/utils/types/home.type';

export default function Services({ object }: HomeDataType) {
	return (
		<>
			<section className={styles.containerAbout} id="servicos">
				<article className={styles.innerAbout}>
					<h1 className={styles.title}>Sobre</h1>
					<p>{object.metadata.about.description}</p>
				</article>
				<div className={styles.bannerAbout}>
					<Image
						alt={'Imagem ilustrativa da Empresa'}
						src={object.metadata.about.banner.url}
						priority
						quality={100}
						fill
						className={styles.imageAbout}
						sizes="(max-width: 480px) 100vw, (max-width:1024px) 75vw, 50vw"
					/>
				</div>
			</section>
			<h2 className={styles.servicesTitle}>Conheça os nossos Serviços</h2>
			<section className={styles.services}>
				{object.metadata.services.map((service) => (
					<article key={service.description} className={styles.service}>
						<div className={styles.innerService}>
							<Image
								alt={'Imagem do serviço'}
								src={service.image.url}
								priority
								quality={100}
								fill
								className={styles.imageService}
								sizes="(max-width: 480px) 100vw, (max-width:1024px) 75vw, 50vw"
							/>
						</div>
						<p>{service.description}</p>
					</article>
				))}
			</section>
		</>
	);
}
