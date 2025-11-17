import { Router } from 'express';
import productController from '../controller/product.controller';
import validateRequest from '../middleware/validation.middleware';
import { createProductValidationSchema, validateId } from '../validation/product.validation';

const router = Router();

router
	.route('/:id')
	.get(validateRequest(validateId, 'params'), productController.fetchProductHandler);

router
	.route('/create')
	.post(validateRequest(createProductValidationSchema), productController.createProductHandler);

export default router;
