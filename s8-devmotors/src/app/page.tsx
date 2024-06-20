import Container from '@/components/container';
import Hero from '@/components/hero';
import Footer from '@/components/home/footer';
import HomeHeader from '@/components/home/subMenu';
import Services from '@/components/home/services';
import { getDataHome, getSubMenu } from '@/utils/actions/get-data';
import { Phone } from 'lucide-react';
import SubMenu from '@/components/home/subMenu';

export default async function Home() {
	const { object } = await getDataHome();
	const menu = await getSubMenu();

	return (
		<main>
			{menu.total > 0 && <SubMenu menu={menu} />}
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
