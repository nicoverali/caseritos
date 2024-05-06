import { PgClient } from '../helpers/pgQueries';
import { ClientId } from '../services/ClientService';

export const CLIENT_PROFILE_TYPE = 'App\\Models\\Profiles\\ClientProfile';

export type ClientProfileRow = {
  id: number;
  phone: string;
  address: string;
};

class ClientProfileModel {
  async create(pg: PgClient, phone: string, address: string): Promise<ClientProfileRow> {
    return pg.queryFirstStrict<ClientProfileRow>(
      `INSERT INTO "client_profiles" 
      ("picture", "thumbnail", "phone", "address", "updated_at", "created_at") 
      VALUES (\'see\', \'see\', $1, $2, $3, $3) 
      RETURNING "id", "phone", "address"`,
      phone,
      address,
      new Date(),
    );
  }

  async update(pg: PgClient, id: number, phone: string, address: string): Promise<ClientProfileRow> {
    return pg.queryFirstStrict<ClientProfileRow>(
      `UPDATE "client_profiles"
      SET "phone" = $1, "address" = $2, "updated_at" = $3
      WHERE "id" = $4`,
      phone,
      address,
      new Date(),
      id,
    );
  }

  async getById(pg: PgClient, clientId: ClientId): Promise<ClientProfileRow> {
    return pg.queryFirstStrict<ClientProfileRow>(
      `SELECT id, phone, address 
      FROM "client_profiles" 
      WHERE "client_profiles"."deleted_at" IS NULL AND "client_profiles"."id" = $1
      LIMIT 1`,
      clientId,
    );
  }

  async getByUserId(pg: PgClient, userId: number): Promise<ClientProfileRow> {
    return pg.queryFirstStrict<ClientProfileRow>(
      `SELECT id, phone, address 
      FROM "client_profiles" INNER JOIN "model_has_roles" ON "model_has_roles"."role_profile_id" = "client_profiles"."id" 
      WHERE "model_has_roles"."model_id" = $1 AND "model_has_roles"."role_profile_type" = $2 AND "client_profiles"."deleted_at" IS NULL
      LIMIT 1`,
      userId,
      CLIENT_PROFILE_TYPE,
    );
  }
}

export default new ClientProfileModel();
