import { Request, Response } from 'express';
import userService from '../services/users.service';

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    return res.status(200).json({ token });
  } catch (error: unknown) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }
};

const findAll = async (req: Request, res: Response): Promise<Response> => {
  const users = await userService.findAll();
  return res.status(200).json(users);
};

export default {
  login,
  findAll,
};