import pool from '../helpers/pgPool';
import { PgClient, PgTransactionalClient } from '../helpers/pgQueries';
import OrderModel, { OrderId, OrderRow } from '../models/OrderModel';
import ProductModel, { ProductId } from '../models/ProductModel';
import { SellerProfileId } from '../models/SellerProfileModel';
import { ClientId } from './ClientService';

export type Order = {
  id: OrderId;
  product: {
    id: ProductId;
    name: string;
    owner: {
      id: SellerProfileId;
      storeName: string;
    };
  };
  quantity: number;
  price: number;
  createdAt: Date;
};

export default class OrderService {
  async getOrdersOfClient(id: ClientId, limit?: number, offset?: number): Promise<Order[]> {
    const pg = await new PgClient(pool).waitForConnection();
    const orders = await OrderModel.getAllByClientId(pg, id, limit, offset);
    pg.release();
    return orders.map(createOrder);
  }

  async getOrderOfClient(id: OrderId, clientId: ClientId): Promise<Order> {
    const pg = await new PgClient(pool).waitForConnection();
    const order = await OrderModel.get(pg, id);
    pg.release();
    if (order.client_id != clientId) {
      throw new Error('Client does not own the requested order');
    }
    return createOrder(order);
  }

  async createOrder(clientId: ClientId, productId: ProductId, quantity: number): Promise<OrderId> {
    const pg = await new PgTransactionalClient(pool).waitForConnection();
    await pg.begin();
    try {
      const id = await OrderModel.create(pg, productId, quantity, clientId);
      await ProductModel.decreaseStock(pg, quantity, productId);
      await pg.commit();
      pg.release();
      return id;
    } catch (err) {
      await pg.rollback();
      pg.release();
      throw err;
    }
  }
}

function createOrder(orderRow: OrderRow): Order {
  return {
    id: orderRow.id,
    product: {
      id: orderRow.product_id,
      name: orderRow.product_name,
      owner: {
        id: orderRow.product_owner_id,
        storeName: orderRow.product_owner_name,
      },
    },
    quantity: orderRow.quantity,
    price: orderRow.price,
    createdAt: orderRow.created_at,
  };
}
