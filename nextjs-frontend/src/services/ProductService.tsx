import { NotFoundError, UnexpectedRequestError } from "./apiErrors";
import { apiClientUrl, apiServerUrl } from "./apiUrl";

export interface Product {
  id: number;
  name: string;
  pictureUrl: string;
  thumbnailUrl: string;
  description: string;
  price: number;
  stock: number;
  owner: {
    id: number;
    storeName: string;
  };
  createdAt: Date;
}

class ProductService {
  async getAll(signal?: AbortSignal): Promise<Product[]> {
    const res = await fetch(apiServerUrl(`products`), { signal });

    if (res.status != 200) throw new UnexpectedRequestError(res);

    const products = await (res.json() as Promise<Product[]>);

    products.forEach((p) => {
      p.pictureUrl = apiClientUrl(`products/${p.id}/picture`);
      p.thumbnailUrl = apiClientUrl(`products/${p.id}/thumbnail`);
    });

    return products;
  }

  async get(id: number, signal?: AbortSignal): Promise<Product> {
    const res = await fetch(apiServerUrl(`products/${id}`), { signal });

    if (res.status == 404) throw new NotFoundError();
    if (res.status != 200) throw new UnexpectedRequestError(res);

    const product = await (res.json() as Promise<Product>);

    product.pictureUrl = apiClientUrl(`products/${product.id}/picture`);
    product.thumbnailUrl = apiClientUrl(`products/${product.id}/thumbnail`);

    return product;
  }

  async getPage(
    page: number,
    size: number,
    signal?: AbortSignal
  ): Promise<Product[]> {
    const offset = page * size;
    const res = await fetch(
      apiServerUrl(`products?offset=${offset}&limit=${size}`),
      {
        signal,
      }
    );

    if (res.status != 200) throw new UnexpectedRequestError(res);

    const products = await (res.json() as Promise<Product[]>);

    products.forEach((p) => {
      p.pictureUrl = apiClientUrl(`products/${p.id}/picture`);
      p.thumbnailUrl = apiClientUrl(`products/${p.id}/thumbnail`);
    });

    return products;
  }
}

export default new ProductService();
