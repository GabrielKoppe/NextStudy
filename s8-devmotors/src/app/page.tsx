import Container from '@/components/container';
import Hero from '@/components/hero';
import Footer from '@/components/home/footer';
import HomeHeader from '@/components/home/homeheader';
import Services from '@/components/home/services';
import { getDataHome } from '@/utils/actions/get-data';
import { Phone } from 'lucide-react';

export default async function Home() {
	const { object } = await getDataHome();

	return (
		<main>
			<HomeHeader />
			<Hero
				heading={object.metadata.heading}
				buttonUrl={object.metadata.cta_button.url}
				buttonTitle={object.metadata.cta_button.title}
				bannerUrl={object.metadata.banner.url}
				icon={<Phone size={20} color="#fff" />}
			/>
			<Container>
				<Services object={object} />
				<Footer object={object} />
			</Container>
		</main>
	);
}
