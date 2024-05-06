import { PgClient } from '../helpers/pgQueries';
import { ClientId } from '../services/ClientService';
import { ProductId } from './ProductModel';
import { SellerProfileId } from './SellerProfileModel';
import { escape } from 'sqlstring';

const COLUMNS =
  '"orders"."id","quantity","orders"."price","orders"."created_at", "client_id","product_id","name" AS "product_name","owner_id" AS "product_owner_id","store_name" AS "product_owner_name"';

export type OrderId = number;

export type OrderRow = {
  id: OrderId;
  quantity: number;
  price: number;
  created_at: Date;
  client_id: ClientId;
  product_id: ProductId;
  product_name: string;
  product_owner_id: SellerProfileId;
  product_owner_name: string;
};

class OrderModel {
  async getAllByClientId(pg: PgClient, id: ClientId, limit?: number, offset?: number): Promise<OrderRow[]> {
    return pg.query<OrderRow>(
      `SELECT ${COLUMNS}
      FROM "orders" INNER JOIN "products" ON "product_id"="products"."id" INNER JOIN "seller_profiles" ON "owner_id"="seller_profiles"."id"
      WHERE"client_id" = $1
      ORDER BY "orders"."created_at" DESC
      ${limit ? `LIMIT ${escape(limit)}` : ''}
      ${offset ? `OFFSET ${escape(offset)}` : ''}`,
      id,
    );
  }

  async get(pg: PgClient, id: OrderId): Promise<OrderRow> {
    return pg.queryFirstStrict<OrderRow>(
      `SELECT ${COLUMNS}
      FROM "orders" INNER JOIN "products" ON "product_id"="products"."id" INNER JOIN "seller_profiles" ON "owner_id"="seller_profiles"."id"
      WHERE "orders"."id" = $1`,
      id,
    );
  }

  async create(pg: PgClient, productId: ProductId, quantity: number, clientId: ClientId): Promise<OrderId> {
    return pg.queryFirstStrict(
      `INSERT INTO "orders" 
      ("quantity", "price", "created_at", "updated_at", "client_id", "product_id") 
      SELECT $1, products.price, $2, $2, $3, $4
      FROM "products"
      WHERE "products"."id" = $4
      RETURNING "id"`,
      quantity,
      new Date(),
      clientId,
      productId,
    );
  }
}

export default new OrderModel();
