import {
  OutOfStockError,
  UnauthorizedError,
  UnexpectedRequestError,
} from "./apiErrors";
import { apiClientUrl, apiServerUrl } from "./apiUrl";

export interface Order {
  id: number;
  product: {
    id: number;
    name: string;
    pictureUrl: string;
    thumbnailUrl: string;
    owner: {
      id: number;
      storeName: string;
    };
  };
  quantity: number;
  price: number;
  createdAt: Date;
}

class OrderService {
  async getAll(token: string, signal?: AbortSignal): Promise<Order[]> {
    const res = await fetch(apiServerUrl(`orders`), {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      signal,
    });

    if (res.status == 401) throw new UnauthorizedError();
    if (res.status != 200) throw new UnexpectedRequestError(res);

    const orders = await (res.json() as Promise<Order[]>);
    orders.forEach((o) => (o.createdAt = new Date(o.createdAt)));
    orders.forEach((o) => {
      o.product.pictureUrl = apiClientUrl(`products/${o.product.id}/picture`);
      o.product.thumbnailUrl = apiClientUrl(
        `products/${o.product.id}/thumbnail`
      );
    });

    return orders;
  }

  async getPage(
    page: number,
    size: number,
    token: string,
    signal?: AbortSignal
  ) {
    const offset = page * size;
    const res = await fetch(
      apiServerUrl(`orders?offset=${offset}&limit=${size}`),
      {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
        signal,
      }
    );

    if (res.status == 401) throw new UnauthorizedError();
    if (res.status != 200) throw new UnexpectedRequestError(res);

    const orders = await (res.json() as Promise<Order[]>);
    orders.forEach((o) => (o.createdAt = new Date(o.createdAt)));
    orders.forEach((o) => {
      o.product.pictureUrl = apiClientUrl(`products/${o.product.id}/picture`);
      o.product.thumbnailUrl = apiClientUrl(
        `products/${o.product.id}/thumbnail`
      );
    });

    return orders;
  }

  async place(
    productId: number,
    quantity: number,
    token: string,
    signal?: AbortSignal
  ): Promise<void> {
    const res = await fetch(apiServerUrl(`orders`), {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      signal,
    });

    if (res.status == 409) throw new OutOfStockError();
    if (res.status == 401) throw new UnauthorizedError();
    if (res.status != 201) throw new UnexpectedRequestError(res);
    return;
  }
}

export default new OrderService();
