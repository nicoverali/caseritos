import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY, USE_REDIS } from '../config/jwt';
import unless from 'express-unless';
import RedisJwtBlacklist from '../helpers/jwt/RedisJwtBlacklist';
import InMemoryJwtBlacklist from '../helpers/jwt/InMemoryJwtBlacklist';

const BLACKLIST = USE_REDIS ? RedisJwtBlacklist : InMemoryJwtBlacklist;

/**
 * Looks for a JWT token in the Authentication header of the request.
 * If no token is provided then aborts. If a token is found, then validates the token
 * and adds the 'jwt' property to the request object.
 * If the token is found but is invalid, then aborts.
 *
 * @param req Request
 * @param res Response
 * @param next Next function
 */
async function authJwt(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = parseToken(req);

  if (token == null || (await BLACKLIST.has(token))) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      res.sendStatus(401);
      return;
    }

    req['jwt'] = {
      token,
      payload,
    };

    next();
  });
}

function parseToken(req: Request): string {
  const authHeader = req.header('authorization');
  return authHeader && authHeader.split(' ')[1];
}

authJwt.unless = unless;
export default authJwt as unless.RequestHandler;
