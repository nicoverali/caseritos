import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const REDIS_TLS = process.env.REDIS_TLS_URL;
export const REDIS_URL = process.env.REDIS_URL;
