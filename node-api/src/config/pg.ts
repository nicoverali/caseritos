import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const DATABASE_URL = process.env.DATABASE_URL || process.env.PG_DATABASE_URL;
export const HOST = process.env.PG_HOST;
export const PORT = process.env.PG_PORT;
export const DATABASE = process.env.PG_DATABASE;
export const USERNAME = process.env.PG_USERNAME;
export const PASSWORD = process.env.PG_PASSWORD;
export const SSL = process.env.PG_SSL;
