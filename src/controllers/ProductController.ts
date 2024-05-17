import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

export class ProductController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      // Verifica se name e description são strings
      if (typeof name !== 'string' || typeof description !== 'string') {
        throw new Error('Invalid input data');
      }

      // Chame o serviço para criar o produto
      const product = await productService.createProduct(name, description);
      console.log('Product created:', product);
      return response.status(201).json(product); // Retorna o produto criado
    } catch (error: any) {
      console.error('Error creating product:', error);
      return response.status(400).json({ error: error.message });
    }
  }

  async index(request: Request, response: Response) {
    try {
      const products = await productService.getAllProducts();
      console.log('Products retrieved:', products);
      return response.json(products);
    } catch (error: any) {
      console.error('Error listing products:', error);
      return response.status(500).json({ error: error.message });
    }
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const product = await productService.getProductById(id);
      if (!product) {
        console.error('Product not found');
        return response.status(404).json({ error: 'Product not found' });
      }
      console.log('Product retrieved:', product);
      return response.json(product);
    } catch (error: any) {
      console.error('Error retrieving product:', error);
      return response.status(500).json({ error: error.message });
    }
  }
}
