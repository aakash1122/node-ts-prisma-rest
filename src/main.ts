import { errorHandler } from './middleware/errorHandler';
const listEndpoints = require('express-list-endpoints');
import expressListRoutes from 'express-list-routes';
import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';
import postRoutes from './routes/PostRoutes';
import userRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';
// import Passport from "passport";
import passport from './helper/passportStrategy';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());
// require("./helper/passportStrategy")(Passport);

// express-winston logger makes sense BEFORE the router
// app.use(infoLogger());

// this must come after the winston config and before error logger
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/auth', AuthRoutes);

// express-winston errorLogger makes sense AFTER the router.
// app.use(errorLogger());

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
