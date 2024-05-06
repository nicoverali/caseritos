import { PgClient } from '../helpers/pgQueries';
import { escape } from 'sqlstring';

const COLUMNS = 'products.id, owner_id, store_name AS owner_name, name, description, price, stock, products.created_at';
const PROD_JOIN_SELLER = '"products" INNER JOIN "seller_profiles" ON "products"."owner_id" = "seller_profiles"."id"';

export type Base64Image = Buffer;
export type ProductId = number;

export type ProductRow = {
  id: ProductId;
  owner_id: number;
  owner_name: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: Date;
};

class ProductModel {
  async getAll(pg: PgClient, limit?: number, offset?: number): Promise<ProductRow[]> {
    return pg.query<ProductRow>(
      `SELECT ${COLUMNS} FROM ${PROD_JOIN_SELLER} 
      WHERE "products"."deleted_at" IS NULL AND "products"."stock" > 0
      ORDER BY "products"."id" DESC
      ${limit ? `LIMIT ${escape(limit)}` : ''}
      ${offset ? `OFFSET ${escape(offset)}` : ''}`,
    );
  }

  async get(pg: PgClient, id: ProductId): Promise<ProductRow> {
    return pg.queryFirstStrict<ProductRow>(
      `SELECT ${COLUMNS} FROM ${PROD_JOIN_SELLER} 
      WHERE "products"."id" = $1 AND "products"."deleted_at" IS NULL AND "products"."stock" > 0
      LIMIT 1`,
      id,
    );
  }

  async getPicture(pg: PgClient, id: ProductId): Promise<Base64Image> {
    return parseDBImage(
      (
        await pg.queryFirstStrict<{ pic: string }>(
          `SELECT encode(picture, 'escape') AS pic FROM "products"
      WHERE "products"."id" = $1 AND "products"."deleted_at" IS NULL
      LIMIT 1`,
          id,
        )
      ).pic,
    );
  }

  async getThumbnail(pg: PgClient, id: ProductId): Promise<Base64Image> {
    return parseDBImage(
      (
        await pg.queryFirstStrict<{ thumb: string }>(
          `SELECT encode(thumbnail, 'escape') AS thumb FROM "products"
      WHERE "products"."id" = $1 AND "products"."deleted_at" IS NULL
      LIMIT 1`,
          id,
        )
      ).thumb,
    );
  }

  async decreaseStock(pg: PgClient, quantity: number, id: ProductId): Promise<void> {
    await pg.query<void>(
      `UPDATE products
      SET stock = stock - $1
      WHERE id = $2`,
      quantity,
      id,
    );
  }
}

function parseDBImage(image: string): Buffer {
  const prefixEndIdx = image.indexOf(',');
  if (prefixEndIdx != -1) {
    image = image.substr(prefixEndIdx + 1);
  }
  return Buffer.from(image, 'base64');
}

export default new ProductModel();
