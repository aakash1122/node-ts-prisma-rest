import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import expressListRoutes from 'express-list-routes';
import { errorLogger } from './logger/index';
import { errorHandler } from './middleware/errorHandler';
import AuthRoutes from './routes/AuthRoutes';
import postRoutes from './routes/PostRoutes';
import userRoutes from './routes/UserRoutes';
const listEndpoints = require('express-list-endpoints');

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const processRequest = (req: Request, res: Response, next: NextFunction) => {
  let correlationId = req.headers['x-correlation-id'];

  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers['x-correlation-id'] = correlationId;
  }
  res.set('x-correlation-id', correlationId);

  return next();
};
// process incomng request with correlation id
app.use(processRequest);

// express-winston logger makes sense BEFORE the router
// app.use(infoLogger());

// this must come after the winston config and before error logger
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/auth', AuthRoutes);

// express-winston errorLogger makes sense AFTER the router.
app.use(errorLogger());

// Error Handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log('🔥 server is running at PORT : ', PORT, '🔥')
);

// log routes
(function logRoutes() {
  console.log('--------------------------------------------');
  expressListRoutes(app, { prefix: '/', spacer: 10 });
  console.log(listEndpoints(app));
  console.log('--------------------------------------------');
})();
