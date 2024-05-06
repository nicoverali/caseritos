import jwt from 'jsonwebtoken';
import { SECRET_KEY, EXPIRATION_TIME } from '../config/jwt';
import JwtBlacklist from '../helpers/jwt/JwtBlacklist';
import { ClientId } from './ClientService';

export default class SessionService {
  private blacklist: JwtBlacklist;

  constructor(blacklist: JwtBlacklist) {
    this.blacklist = blacklist;
  }

  async createSession(id: ClientId): Promise<string> {
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
    return token;
  }

  deleteSession(token: string): void {
    this.blacklist.put(token);
  }
}

export interface JwtPayload {
  id: ClientId;
  iat: number;
}
