import styles from './styles.module.scss';
import React from 'react';
import Container from '@/components/container';
import { HomeDataType } from '@/utils/types/home.type';
import { Clock, Mail, Map, Phone } from 'lucide-react';

export default function Footer({ object }: HomeDataType) {
	return (
		<footer className={styles.footer} id="contatos">
			<section className={styles.section}>
				<h2 className={styles.title}>Contatos</h2>

				<div className={styles.content}>
					<div className={styles.item}>
						<Mail size={28} color="#fff" />
						<div>
							<strong>Email</strong>
							<p>{object.metadata.contact.email}</p>
						</div>
					</div>
					<div className={styles.item}>
						<Phone size={28} color="#fff" />
						<div>
							<strong>Telefone</strong>
							<p>{object.metadata.contact.phone}</p>
						</div>
					</div>
					<div className={styles.item}>
						<Map size={28} color="#fff" />
						<div>
							<strong>Endereço</strong>
							<p>{object.metadata.contact.address}</p>
						</div>
					</div>
					<div className={styles.item}>
						<Clock size={28} color="#fff" />
						<div>
							<strong>Horário</strong>
							<p>{object.metadata.contact.time}</p>
						</div>
					</div>
				</div>
			</section>
			<a
				target="_blank"
				href={object.metadata.cta_button.url}
				className={styles.link}
			>
				<Phone size={24} color="#fff" />

				{object.metadata.cta_button.title}
			</a>
		</footer>
	);
}
