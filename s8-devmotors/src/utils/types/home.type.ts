export interface HomeDataType {
	object: {
		slug: string;
		title: string;
		metadata: {
			banner: Image;
			heading: string;
			cta_button: {
				title: string;
				url: string;
			};
			about: {
				description: string;
				banner: Image;
			};
			services: ServicesType[];
			contact: {
				email: string;
				phone: string;
				address: string;
				time: string;
			};
		};
	};
}

type ServicesType = {
	image: Image;
	description: string;
};

type Image = {
	url: string;
	imgix_url: string;
};

export interface SubMenuType {
	objects: {
		slug: string;
		title: string;
	}[];
	total: number;
}

export interface PageType {
	objects: {
		slug: string;
		title: string;
		content: string;
		metadata: {
			banner: Image;
			button: {
				title: string;
				url: string;
			};
			description: {
				title: string;
				text: string;
				banner: Image;
				button_active: boolean;
				button_title: string | null;
				button_url: string | null;
			};
		};
	}[];
	total: number;
}
