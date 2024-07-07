import { RequestHandler } from 'express';
import productService from '../services/products.service';

const create: RequestHandler = async (req, res) => {
  const createdProduct = await productService.create(req.body);
  res.status(201).json(createdProduct);
};

const findAll: RequestHandler = async (_req, res) => {
  const products = await productService.findAll();
  res.status(200).json(products);
};

export default {
  create,
  findAll,
};