import { HomeDataType } from '../types/home.type';

export async function getDataHome(): Promise<HomeDataType> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/objects/66734047864193998e15e1c7?read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata`,
		);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return await res.json();
	} catch (error) {
		throw new Error('Failed to fetch data');
	}
}
