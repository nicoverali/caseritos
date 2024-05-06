import express from 'express';
import { PORT } from './config/express';
import { USE_REDIS } from './config/jwt';
import RedisJwtBlacklist from './helpers/jwt/RedisJwtBlacklist';
import apiRouter from './routes/api';
import docsRouter from './routes/docsRouter';

const app = express();

app.use('/', docsRouter);
app.use('/api', apiRouter);

if (USE_REDIS) {
  RedisJwtBlacklist.waitForConnection()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Listen on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
} else {
  app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
  });
}
