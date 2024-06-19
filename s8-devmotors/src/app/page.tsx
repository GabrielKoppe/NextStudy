import HomeHeader from '@/components/homeheader';
import { getDataHome } from '@/utils/actions/get-data';

export default async function Home() {
	const { object } = await getDataHome();

	return (
		<main>
			<HomeHeader />
		</main>
	);
}
