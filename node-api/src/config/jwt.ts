import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (process.env.JWT_SECRET_KEY == null) throw new Error('JWT secret key undefined.');

export const USE_REDIS = process.env.JWT_USE_REDIS || false;
export const SECRET_KEY = process.env.JWT_SECRET_KEY;
export const EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '5s';
