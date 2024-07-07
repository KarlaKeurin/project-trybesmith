import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';

const create = async (input: Omit<Product, 'id'>): Promise<Product> => {
  const created = await ProductModel.create({
    name: input.name,
    price: input.price,
    userId: input.userId,
  });

  return {
    id: created.dataValues.id,
    name: created.dataValues.name,
    price: created.dataValues.price,
    userId: created.dataValues.userId,
  };
};

const findAll = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll();

  return products.map((product) => ({
    id: product.dataValues.id,
    name: product.dataValues.name,
    price: product.dataValues.price,
    userId: product.dataValues.userId,
  }));
};

export default {
  create,
  findAll,
};