import { PgClient } from '../helpers/pgQueries';

const GUARD_NAME = 'web';

export type RoleRow = {
  id: number;
  name: string;
};

class RoleModel {
  async getByName(pg: PgClient, roleName: string): Promise<RoleRow> {
    return pg.queryFirstStrict<RoleRow>(
      `SELECT id, name 
      FROM "roles" 
      WHERE "name" = $1 AND "guard_name" = $2 
      LIMIT 1`,
      roleName,
      GUARD_NAME,
    );
  }
}

export default new RoleModel();
