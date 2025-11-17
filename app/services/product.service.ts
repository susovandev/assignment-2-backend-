import { dummyProducts, IProductDocument } from '../dummyDB/product.dummy';
import Logger from '../utils/logger.utils';

class ProductService {
	async create(productData: Omit<IProductDocument, '_id' | 'createdAt' | 'updatedAt'>) {
		try {
			Logger.info(
				`[ProductService] Create product request received with input: ${JSON.stringify(productData)}`,
			);

			const newProduct = dummyProducts.push({
				...productData,
				_id: dummyProducts.length + 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			return newProduct;
		} catch (error) {
			Logger.warn('[ProductService] Error creating product', error);
			throw error;
		}
	}
}

export default new ProductService();
