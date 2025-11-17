import express from 'express';
import type { Application, Request, Response } from 'express';

const app: Application = express();

// Morgan middleware
import morganConfig from './config/morgan.config';
app.use(morganConfig);

//Body-Parser middlewares
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

//Routes
app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

// Product routes
import productRoutes from './routes/product.route';
app.use('/api/v1/products', productRoutes);

export default app;
