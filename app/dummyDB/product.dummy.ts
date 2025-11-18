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

export const dummyProducts: IProductDocument[] = [];
