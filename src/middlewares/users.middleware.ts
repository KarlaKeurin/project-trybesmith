import { RequestHandler } from 'express';
import Joi from 'joi';

const loginBodySchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const validateLogin: RequestHandler = (req, res, next) => {
  const { error } = loginBodySchema.validate(req.body);
  if (error) {
    if (error.details.some((detail) => detail.type === 'any.required')) {
      return res.status(400).json({ message: '"username" and "password" are required' });
    }
    return res.status(401).json({ message: 'Username or password invalid' });
  }
  next();
};

export default {
  validateLogin,
};