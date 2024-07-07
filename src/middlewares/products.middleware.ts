import { RequestHandler } from 'express';
import Joi from 'joi';
import UserModel from '../database/models/user.model';

const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  userId: Joi.number().required().options({ convert: false }),
});

const validateCreateProduct: RequestHandler = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    if (error.details.some((detail) => detail.type === 'any.required')) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(422).json({ message: error.message });
  }
  next();
};

const userIdValidation: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  const host = await UserModel.findOne({
    where: { id: userId },
  });
 
  if (!host) {
    return res.status(422).json({ message: '"userId" not found' });
  }

  next();
};

export default {
  validateCreateProduct,
  userIdValidation,
};