declare namespace Express {
  interface Jwt {
    token: string;
    payload: unknown;
  }

  export interface Request {
    jwt: Jwt;
  }
}
