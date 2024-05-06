import { PgClient } from '../helpers/pgQueries';
import { RoleRow } from './RoleModel';
import { ClientProfileRow, CLIENT_PROFILE_TYPE } from './ClientProfileModel';
import bcrypt from 'bcrypt';
import { ClientId } from '../services/ClientService';

const USER_MODEL_TYPE = 'App\\Models\\User';

export type UserRow = {
  id: number;
  name: string;
  email: string;
  password: string;
};

class UserModel {
  async getById(pg: PgClient, id: number): Promise<UserRow> {
    return pg.queryFirstStrict<UserRow>(
      `SELECT id, name, email, password 
      FROM "users" 
      WHERE "users"."deleted_at" IS NULL AND "users"."id"= $1 
      LIMIT 1`,
      id,
    );
  }

  async getByClientId(pg: PgClient, id: ClientId): Promise<UserRow> {
    return pg.queryFirstStrict<UserRow>(
      `SELECT "users"."id", "users"."name", "users"."email", "users"."password"
      FROM "users" INNER JOIN "model_has_roles" ON "model_has_roles"."model_id" = "users"."id"
      WHERE "model_has_roles"."role_profile_type" = $1 AND "users"."deleted_at" IS NULL AND "model_has_roles"."role_profile_id" = $2 
      LIMIT 1`,
      CLIENT_PROFILE_TYPE,
      id,
    );
  }

  async getByEmail(pg: PgClient, email: string): Promise<UserRow> {
    return pg.queryFirstStrict<UserRow>(
      `SELECT id, name, email, password 
      FROM "users" 
      WHERE "users"."deleted_at" IS NULL AND "users"."email" = $1
      LIMIT 1`,
      email,
    );
  }

  async create(pg: PgClient, name: string, email: string, password: string): Promise<UserRow> {
    const hashPassword = await bcrypt.hash(password, 10);
    return pg.queryFirstStrict<UserRow>(
      `INSERT INTO "users" 
      ("name", "email", "email_verified_at", "password", "remember_token", "created_at", "updated_at") 
      VALUES ($1, $2, NULL, $3, NULL, $4, $4) 
      RETURNING "id", "name", "email", "password"`,
      name,
      email,
      hashPassword,
      new Date(),
    );
  }

  async update(pg: PgClient, id: number, name: string, email: string, password: string): Promise<UserRow> {
    const hashPassword = await bcrypt.hash(password, 10);
    return pg.queryFirstStrict<UserRow>(
      `UPDATE "users"
      SET "name" = $1, "email" = $2, "password" = $3, updated_at = $4
      WHERE "id" = $5`,
      name,
      email,
      hashPassword,
      new Date(),
      id,
    );
  }

  async assignRole(pg: PgClient, user: UserRow, role: RoleRow): Promise<void> {
    await pg.query(
      `INSERT INTO "model_has_roles" 
      ("role_id", "model_id", "model_type") 
      VALUES ($1, $2, $3)`,
      role.id,
      user.id,
      USER_MODEL_TYPE,
    );
  }

  async assignClientProfile(
    pg: PgClient,
    user: UserRow,
    role: RoleRow,
    clientProfile: ClientProfileRow,
  ): Promise<void> {
    await pg.query(
      `UPDATE "model_has_roles" 
      SET "role_profile_type" = $1, "role_profile_id" = $2 
      WHERE "model_type" = $3 AND "model_id" = $4 AND "role_id" = $5`,
      CLIENT_PROFILE_TYPE,
      clientProfile.id,
      USER_MODEL_TYPE,
      user.id,
      role.id,
    );
  }
}

export default new UserModel();
