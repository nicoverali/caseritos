import express from 'express';
import clientRouter from './clientRouter';
import ordersRouter from './ordersRouter';
import productsRouter from './productsRouter';
import sessionRouter from './sessionRouter';
import cors from 'cors';

const apiRouter = express.Router();

apiRouter.use(cors())

apiRouter.use(sessionRouter);
apiRouter.use(clientRouter);
apiRouter.use(productsRouter);
apiRouter.use(ordersRouter);

export default apiRouter;
