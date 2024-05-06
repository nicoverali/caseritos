import { PgClient } from '../helpers/pgQueries';

export type SellerProfileId = number;

export type SellerProfileRow = {
  id: SellerProfileId;
  store_name: string;
};

class SellerProfileModel {
  async get(pg: PgClient, ...ids: SellerProfileId[]): Promise<SellerProfileRow | SellerProfileRow[]> {
    const result = await pg.queryStrict<SellerProfileRow>(
      `SELECT id, store_name 
      FROM "seller_profiles"
      WHERE "seller_profiles"."id" = ANY ($1::int[]) AND "seller_profiles"."deleted_at" IS NULL`,
      ids,
    );
    return result.length > 1 ? result : result[0];
  }
}

export default new SellerProfileModel();
