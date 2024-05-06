import { Pool } from 'pg';
import { DATABASE_URL, HOST, PORT, DATABASE, PASSWORD, USERNAME, SSL } from '../config/pg';

export default new Pool(
  DATABASE_URL
    ? {
        connectionString: DATABASE_URL,
        ssl: Boolean(SSL),
      }
    : {
        host: HOST,
        port: Number(PORT),
        database: DATABASE,
        password: PASSWORD,
        user: USERNAME,
        ssl: Boolean(SSL),
      },
);
