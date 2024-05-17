import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {
  async createProduct(name: string, description: string): Promise<Product> {
    try {
      // Verifica se o produto com o mesmo nome já existe
      const existingProduct = await prisma.product.findUnique({
        where: { name },
      });

      if (existingProduct) {
        throw new Error('Product with this name already exists');
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
        },
      });
      console.log('Product created successfully:', product);
      return product;
    } catch (error: any) {
      console.error('Error creating product:', error.message);
      throw new Error('Failed to create product: ' + error.message);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany();
      console.log('Products retrieved successfully:', products);
      return products;
    } catch (error: any) {
      console.error('Error listing products:', error.message);
      throw new Error('Failed to list products: ' + error.message);
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });
      if (!product) {
        throw new Error('Product not found');
      }
      console.log('Product retrieved successfully:', product);
      return product;
    } catch (error: any) {
      console.error('Error retrieving product:', error.message);
      throw new Error('Failed to retrieve product: ' + error.message);
    }
  }
}
