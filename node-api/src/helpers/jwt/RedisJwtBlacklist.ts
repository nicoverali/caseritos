import jwt from 'jsonwebtoken';
import JwtBlacklist, { ExpirableJwt } from './JwtBlacklist';
import { REDIS_URL, REDIS_TLS } from '../../config/redis';
import redis, { RedisClient } from 'redis';
import { USE_REDIS } from '../../config/jwt';

class RedisJwtBlacklist implements JwtBlacklist {
  private client: RedisClient;

  constructor() {
    if(USE_REDIS){
      this.client = redis.createClient({
        url: REDIS_URL,
        tls: REDIS_TLS,
      });
    }
  }

  waitForConnection(): Promise<void> {
    return new Promise((res, rej) => {
      this.client.on('ready', res);
      this.client.on('error', rej);
    });
  }

  put(token: string): void {
    const payload = jwt.decode(token) as ExpirableJwt;
    if (!payload.exp) throw new Error('Token does not expire');
    if (payload.exp < Date.now() / 1000) return;
    this.client.SET(token, payload.exp.toString(), () => this.client.EXPIREAT(token, payload.exp));
  }

  async has(token: string): Promise<boolean> {
    return new Promise((res, rej) => {
      this.client.GET(token, (err, val) => {
        if (err) rej(err);
        res(val != undefined);
      });
    });
  }
}

export default new RedisJwtBlacklist();
