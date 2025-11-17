import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from '../utils/logger.utils';
import ApiResponse from '../utils/apiResponse';
import productService from '../services/product.service';

class ProductController {
	public async createProductHandler(req: Request, res: Response, next: NextFunction) {
		try {
			Logger.info(`[ProductController] Create product request received`);

			// Delegate core logic to service layer
			await productService.create(req.body);

			// Send structured API response
			return res
				.status(StatusCodes.CREATED)
				.json(new ApiResponse(StatusCodes.CREATED, 'Product created successfully'));
		} catch (error) {
			Logger.warn('[ProductController] Error creating product', error);
			next(error);
		}
	}
}

export default new ProductController();
