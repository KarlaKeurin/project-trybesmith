import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';

const secret = process.env.JWT_SECRET ?? 'secret';

const login = async (username: string, password: string): Promise<string> => {
  const host = await UserModel.findOne({
    where: { username },
  });

  if (!host) throw new Error('Username or password invalid'); 

  const isPasswordValid = await bcrypt.compare(password, host.dataValues.password);

  if (!isPasswordValid) throw new Error('Username or password invalid');

  const token = jwt.sign({
    id: host.dataValues.id,
    username: host.dataValues.username,
    vocation: host.dataValues.vocation,
    level: host.dataValues.level,
  }, secret, {
    expiresIn: '1d',
  });

  return token;
};

interface UserWithProductIds {
  username: string;
  productIds: number[];
}

const findAll = async (): Promise<UserWithProductIds[]> => {
  const users = await UserModel.findAll({
    include: 'productIds',
  });

  return users.map((user: any) => ({
    username: user.username,
    productIds: user.productIds.map((product: any) => product.id),
  }));
};

export default {
  login,
  findAll,
};