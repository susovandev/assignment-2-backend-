import { dummyProducts, IProductDocument } from '../dummyDB/product.dummy';
import { NotFoundException } from '../utils/apiError';
import Logger from '../utils/logger.utils';

class ProductService {
	async findAll() {
		try {
			Logger.info(`[ProductService] Fetch products request received`);
			if (dummyProducts.length === 0) {
				throw new NotFoundException('product not found');
			}
			return dummyProducts;
		} catch (error) {
			Logger.warn('[ProductService] Error fetching products', error);
			throw error;
		}
	}
	async findById(productId: number) {
		try {
			Logger.info(`[ProductService] Find product request received with id: ${productId}`);

			const product = dummyProducts.find((p) => p._id === productId);
			console.log(product);
			if (!product) {
				throw new NotFoundException('product not found for given ID');
			}

			return product;
		} catch (error) {
			Logger.warn('[ProductService] Error finding product', error);
			throw error;
		}
	}
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

			return dummyProducts[newProduct - 1];
		} catch (error) {
			Logger.warn('[ProductService] Error creating product', error);
			throw error;
		}
	}
	async update(
		productId: number,
		productData: Partial<Omit<IProductDocument, '_id' | 'createdAt' | 'updatedAt'>>,
	) {
		try {
			Logger.info(
				`[ProductController] update product request received with id: ${productId} and input: ${JSON.stringify(productData)}`,
			);

			const existingProductIndex = dummyProducts.findIndex((p) => p._id === productId);
			if (existingProductIndex === -1) {
				throw new NotFoundException('product not found for given ID');
			}

			dummyProducts[existingProductIndex] = {
				...dummyProducts[existingProductIndex],
				...productData,
				updatedAt: new Date(),
			};

			return dummyProducts[existingProductIndex];
		} catch (error) {
			Logger.warn('[ProductService] Error updating product', error);
			throw error;
		}
	}
	async delete(productId: number) {
		try {
			Logger.info(`[ProductService] Delete product request received with id: ${productId}`);

			const existingProductIndex = dummyProducts.findIndex((p) => p._id === productId);
			if (!existingProductIndex) {
				throw new NotFoundException('product not found for given ID');
			}

			dummyProducts.splice(existingProductIndex, 1);

			return true;
		} catch (error) {
			Logger.warn('[ProductService] Error deleting product', error);
			throw error;
		}
	}
}

export default new ProductService();
