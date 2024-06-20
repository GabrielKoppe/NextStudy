import { getItemBySlug } from '@/utils/actions/get-data';
import styles from './styles.module.scss';

export default async function Page({
	params: { slug },
}: {
	params: { slug: string };
}) {
	const { objects } = await getItemBySlug(slug);

	return (
		<div>
			<h1>{slug}</h1>
		</div>
	);
}
