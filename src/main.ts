import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { infoLogger, errorLogger } from './logger/index';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Let's make our express `Router` first.
let router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({
    data: 'hello world',
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  return res.status(200).json({
    data: req.params.id,
  });
});

router.post('/post', async (req: Request, res: Response) => {
  return res.status(200).json({
    data: req.body,
  });
});

// express-winston logger makes sense BEFORE the router
app.use(infoLogger());

// this must come after the winston config and before error logger
app.use(router);

// express-winston errorLogger makes sense AFTER the router.
app.use(errorLogger());

app.listen(PORT, () => console.log('🔥 server is running at PORT : ', PORT, '🔥'));
