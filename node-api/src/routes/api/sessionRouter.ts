import express from 'express';
import SessionService from '../../services/SessionService';
import authJwt from '../../middleware/authJwt';
import ClientService from '../../services/ClientService';
import RedisJwtBlacklist from '../../helpers/jwt/RedisJwtBlacklist';
import { USE_REDIS } from '../../config/jwt';
import InMemoryJwtBlacklist from '../../helpers/jwt/InMemoryJwtBlacklist';

const BLACKLIST = USE_REDIS ? RedisJwtBlacklist : InMemoryJwtBlacklist;

const clientService = new ClientService();
const sessionService = new SessionService(BLACKLIST);
const sessionRouter = express.Router();

sessionRouter.use(express.json());
sessionRouter.use('/session', authJwt.unless({ method: 'POST' }));

/**
 * POST /session
 * @summary Creates a new session.
 * @description Returns a new session token. The token will be associated with a particular client (given that credentials are OK).
 * @bodyContent {ClientCredentials} application/json
 * @bodyRequired
 * @response 200 - [OK] Session created
 * @responseContent {Session} 200.application/json JWT Token of the newly created session
 * @response 401 - [Unauthorized] Credentials are invalid
 */
sessionRouter.post('/session', async (req, res) => {
  try {
    const id = await clientService.validate(req.body.email, req.body.password);
    const session = await sessionService.createSession(id);
    res.send(session);
  } catch {
    res.sendStatus(401);
  }
});

/**
 * DELETE /session
 * @summary Deletes the current session.
 * @description Deletes the current session token used by the user
 * @response 204 - [No Content] Session deleted
 * @response 401 - [Unauthorized] User not authenticated
 * @security BearerAuth
 */
sessionRouter.delete('/session', (req, res) => {
  sessionService.deleteSession(req.jwt.token);
  res.sendStatus(204);
});

export default sessionRouter;
