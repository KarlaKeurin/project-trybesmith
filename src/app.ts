import express from 'express';
import 'express-async-errors';
import productsRouter from './routes/products.routes';
import usersRouter from './routes/users.routes';

const app = express();

app.use(express.json());

app.use('/', productsRouter);
app.use('/', usersRouter);

export default app;
