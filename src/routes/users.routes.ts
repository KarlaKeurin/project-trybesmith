import { Router } from 'express';
import usersController from '../controllers/users.controller';
import usersMiddleware from '../middlewares/users.middleware';

const usersRouter = Router();

usersRouter.post(
  '/login',
  usersMiddleware.validateLogin,
  usersController.login,
);

usersRouter.get(
  '/users',
  usersController.findAll,
);

export default usersRouter;