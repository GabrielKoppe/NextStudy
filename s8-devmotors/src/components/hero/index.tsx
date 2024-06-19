import Image from 'next/image';
import styles from './styles.module.scss';
import React from 'react';

interface HeroProps {
	heading: string;
	buttonUrl: string;
	buttonTitle: string;
	bannerUrl: string;
	icon: React.ReactNode;
}

export default function Hero({
	bannerUrl,
	buttonTitle,
	buttonUrl,
	heading,
	icon,
}: HeroProps) {
	return (
		<main className={styles.main}>
			<div className={styles.containerHero}>
				<h1 className={styles.title}>{heading}</h1>

				<a target="_blank" href={buttonUrl} className={styles.link}>
					{icon}
					{buttonTitle}
				</a>
			</div>
			<div className={styles.contentBanner}>
				<Image
					alt={heading}
					src={bannerUrl}
					priority
					quality={100}
					fill
					className={styles.banner}
				/>
			</div>
		</main>
	);
}
