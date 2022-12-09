import { NextFunction, Request, Response } from 'express';
import { Product } from '@prisma/client';
import { CreateProductDto } from '@dtos/products.dto';
import productService from '@services/products.service';

class ProductsController {
  public productService = new productService();

  public getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findAllProductsData: Product[] =
        await this.productService.findAllProduct();

      res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const productId = Number(req.params.id);
      const findOneProductData: Product =
        await this.productService.findProductById(productId);

      res.status(200).json({ data: findOneProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
  public getProductByKeyword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const keyword = req.params.keyword;
      const findAllProductData: Product[] =
        await this.productService.findProduct(keyword);

      res.status(200).json({ data: findAllProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: Product =
        await this.productService.createProduct(productData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const productId = Number(req.params.id);
      const productData: CreateProductDto = req.body;
      const updateProductData: Product =
        await this.productService.updateProduct(productId, productData);

      res.status(200).json({ data: updateProductData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
