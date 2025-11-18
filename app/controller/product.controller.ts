import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from '../utils/logger.utils';
import ApiResponse from '../utils/apiResponse';
import productService from '../services/product.service';

class ProductController {
	public async fetchProductHandler(req: Request, res: Response, next: NextFunction) {
		try {
			Logger.info(`[ProductController] Fetch product request received with id: ${req.params.id}`);

			// Delegate core logic to service layer
			const product = await productService.findById(Number(req.params.id));

			// Send structured API response
			return res
				.status(StatusCodes.OK)
				.json(new ApiResponse(StatusCodes.OK, 'Product fetched successfully', product));
		} catch (error) {
			Logger.warn('[ProductController] Error fetching product', error);
			next(error);
		}
	}
	public async createProductHandler(req: Request, res: Response, next: NextFunction) {
		try {
			Logger.info(`[ProductController] Create product request received`);

			// Delegate core logic to service layer
			const newProduct = await productService.create(req.body);
			console.log(newProduct);
			// Send structured API response
			return res
				.status(StatusCodes.CREATED)
				.json(new ApiResponse(StatusCodes.CREATED, 'Product created successfully', newProduct));
		} catch (error) {
			Logger.warn('[ProductController] Error creating product', error);
			next(error);
		}
	}
	public async updateProductHandler(req: Request, res: Response, next: NextFunction) {
		try {
			Logger.info(`[ProductController] update product request received with id: ${req.params.id}`);

			// Delegate core logic to service layer
			const updatedProduct = await productService.update(Number(req.params.id), req.body);

			// Send structured API response
			return res
				.status(StatusCodes.OK)
				.json(new ApiResponse(StatusCodes.OK, 'Product updated successfully', updatedProduct));
		} catch (error) {
			Logger.warn('[ProductController] Error update a product', error);
			next(error);
		}
	}
	public async deleteProductHandler(req: Request, res: Response, next: NextFunction) {
		try {
			Logger.info(`[ProductController] delete product request received with id: ${req.params.id}`);

			// Delegate core logic to service layer
			await productService.delete(Number(req.params.id));

			// Send structured API response
			return res
				.status(StatusCodes.OK)
				.json(new ApiResponse(StatusCodes.OK, 'Product deleted successfully'));
		} catch (error) {
			Logger.warn('[ProductController] Error delete a product', error);
			next(error);
		}
	}
}

export default new ProductController();
