export interface IProductDocument {
	_id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	inStock: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export const dummyProducts: IProductDocument[] = [
	{
		_id: 1,
		name: 'Product 1',
		description: 'Description 1',
		price: 10,
		category: 'Category 1',
		inStock: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
