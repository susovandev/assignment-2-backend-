import { Router } from 'express';
import productController from '../controller/product.controller';

const router = Router();

router.route('/create').post(productController.createProductHandler);

export default router;
