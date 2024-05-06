import openapi from 'openapi-comment-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

const spec = openapi({
  cwd: process.cwd(),
  verbose: false,
});

const docsRouter = express.Router();
docsRouter.use('/', swaggerUi.serve);
docsRouter.get('/', swaggerUi.setup(spec));

export default docsRouter;
