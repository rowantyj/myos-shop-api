import { Router } from 'express';
import ProductsController from '@controllers/products.controller';
import { CreateProductDto } from '@dtos/products.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productsController.getProducts);
    this.router.get(
      `${this.path}/:id(\\d+)`,
      this.productsController.getProductById,
    );
    this.router.get(
      `${this.path}/find/:keyword`,
      this.productsController.getProductByKeyword,
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateProductDto, 'body'),
      this.productsController.createProduct,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      validationMiddleware(CreateProductDto, 'body', true),
      this.productsController.updateProduct,
    );
  }
}

export default ProductsRoute;
