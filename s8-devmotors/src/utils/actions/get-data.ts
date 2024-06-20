import { redirect } from 'next/navigation';
import { HomeDataType, PageType, SubMenuType } from '../types/home.type';

export async function getDataHome(): Promise<HomeDataType> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/objects/66734047864193998e15e1c7?read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata`,
			{ next: { revalidate: 120 } },
		);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return await res.json();
	} catch (error) {
		throw new Error('Failed to fetch data');
	}
}

export async function getSubMenu(): Promise<SubMenuType> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&read_key=${process.env.READ_KEY}&depth=1&props=slug,title`,
			{ next: { revalidate: 120 } },
		);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return await res.json();
	} catch (error) {
		throw new Error('Failed to fetch data');
	}
}

export async function getItemBySlug(itemSlug: string): Promise<PageType> {
	const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/objects`;
	const queryParams = new URLSearchParams({
		query: JSON.stringify({
			slug: itemSlug,
		}),
		props: 'slug,title,content,metadata',
		read_key: process.env.READ_KEY as string,
	});

	try {
		const res = await fetch(`${baseUrl}?${queryParams.toString()}`, {
			next: { revalidate: 120 },
		});
		if (!res.ok) {
			throw new Error('Failed to get Slug');
		}

		return await res.json();
	} catch (error) {
		redirect('/');
	}
}
