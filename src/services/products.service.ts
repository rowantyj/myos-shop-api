import { hash } from 'bcrypt';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from '@dtos/products.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class ProductService {
  [x: string]: any;
  public product = new PrismaClient().product;

  public async findAllProduct(): Promise<Product[]> {
    const allProduct: Product[] = await this.product.findMany();
    return allProduct;
  }

  public async findProductById(productId: number): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, 'ProductId is empty');

    const findProduct: Product = await this.product.findUnique({
      where: { id: productId },
    });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  public async updateProduct(
    productId: number,
    productData: CreateProductDto,
  ): Promise<Product> {
    if (isEmpty(productData))
      throw new HttpException(400, 'productData is empty');

    const findProduct: Product = await this.product.findUnique({
      where: { id: productId },
    });
    if (!findProduct) throw new HttpException(409, "product doesn't exist");

    const updateProductData = await this.product.update({
      where: { id: productId },
      data: { ...productData },
    });
    return updateProductData;
  }
}

export default ProductService;
