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
