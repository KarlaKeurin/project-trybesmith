import { Router } from 'express';
import productsController from '../controllers/products.controller';
import productsMiddleware from '../middlewares/products.middleware';

const productsRouter = Router();

productsRouter.post(
  '/products',
  productsMiddleware.validateCreateProduct,
  productsMiddleware.userIdValidation,
  productsController.create,
);

productsRouter.get(
  '/products', 
  productsController.findAll,
);

export default productsRouter;
