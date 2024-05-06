import jwt from 'jsonwebtoken';
import JwtBlacklist, { ExpirableJwt } from './JwtBlacklist';

const blacklist: [string, number][] = [];

class InMemoryJwtBlacklist implements JwtBlacklist {
  put(token: string): void {
    const payload = jwt.decode(token) as ExpirableJwt;
    if (!payload.exp) throw new Error('Token does not expire');
    if (payload.exp < Date.now() / 1000) return;
    blacklist.push([token, payload.exp]);
  }

  has(token: string): Promise<boolean> {
    const has = blacklist.find((blackToken) => blackToken[0] == token) != undefined;
    this.trashExpiredTokens();
    return Promise.resolve(has);
  }

  async trashExpiredTokens(): Promise<void> {
    blacklist.filter(async (token) => {
      await new Promise(setImmediate);
      return token[1] > Date.now();
    });
  }
}

export default new InMemoryJwtBlacklist();
