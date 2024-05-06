import pool from '../helpers/pgPool';
import { PgClient } from '../helpers/pgQueries';
import ProductModel, { Base64Image, ProductRow } from '../models/ProductModel';
import { SellerProfileId } from '../models/SellerProfileModel';

export type ProductId = number;

export type Product = {
  id: ProductId;
  name: string;
  owner: {
    id: SellerProfileId;
    storeName: string;
  };
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
};

export default class ProductService {
  async getAll(limit?: number, offset?: number): Promise<Product[]> {
    const pg = await new PgClient(pool).waitForConnection();
    const products = await ProductModel.getAll(pg, limit, offset);
    pg.release();

    return products.map(createProduct);
  }

  async get(id: ProductId): Promise<Product> {
    const pg = await new PgClient(pool).waitForConnection();
    const product = await ProductModel.get(pg, id);
    pg.release();

    return createProduct(product);
  }

  async getPicture(id: ProductId): Promise<Base64Image> {
    const pg = await new PgClient(pool).waitForConnection();
    const picture = await ProductModel.getPicture(pg, id);
    pg.release();
    return picture;
  }

  async getThumbnail(id: ProductId): Promise<Base64Image> {
    const pg = await new PgClient(pool).waitForConnection();
    const thumbnail = await ProductModel.getThumbnail(pg, id);
    pg.release();
    return thumbnail;
  }
}

function createProduct(product: ProductRow) {
  return {
    id: product.id,
    name: product.name,
    owner: {
      id: product.owner_id,
      storeName: product.owner_name,
    },
    description: product.description,
    price: product.price,
    stock: product.stock,
    createdAt: product.created_at,
  };
}
