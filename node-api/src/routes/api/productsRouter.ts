import express from 'express';
import ProductService from '../../services/ProductService';

const productService = new ProductService();
const productsRouter = express.Router();

/**
 * GET /products
 * @summary Returns all the products available in descending order by creation date. Allows pagination.
 * @description Returns a collection of all the products available in the app. The collection in returned in descending order
 * by creation date. This means that latest products will appear first.
 * Each of them is provided with its complete information. Limit/offset pagination parameters may be provided.
 * @queryParam {number} [limit] Number of products per page. If not provided, all products will be returned
 * @queryParam {number} [offset] Offset of pagination. Determines first element that needs to be returned.
 * If not provided, the page will start from the first element
 * @response 200 - [OK] Success
 * @responseContent {Product[]} 200.application/json
 * @response 400 - [Bad request] Parameters are invalid
 */
productsRouter.get('/products', async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const products = await productService.getAll(Number(limit as string), Number(offset as string));
    res.send(products);
  } catch {
    res.sendStatus(400);
  }
});

/**
 * GET /products/{productId}
 * @summary Returns information about a single product.
 * @description Returns all the information of a particular product.
 * @pathParam {string} productId ID of the product which information will be returned
 * @response 200 - [OK] Success
 * @responseContent {Product} 200.application/json
 * @response 404 - [Not found]
 */
productsRouter.get('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.get(id);
    res.send(product);
  } catch {
    res.sendStatus(404);
  }
});

/**
 * GET /products/{productId}/picture
 * @summary Returns the picture of a single product
 * @description Given the ID of a Product, returns the picture of it.
 * @pathParam {string} productId ID of the product which picture will be returned
 * @response 200 - [OK] Success
 * @responseContent {Picture} 200.image/*
 * @response 404 - [Not found]
 */
productsRouter.get('/products/:id/picture', async (req, res) => {
  try {
    res.type('image/jpeg').send(await productService.getPicture(parseInt(req.params.id)));
  } catch {
    res.sendStatus(404);
  }
});

/**
 * GET /products/{productId}/thumbnail
 * @summary Returns the thumbnail of a single product
 * @description Given the ID of a Product, returns the thumbnail of it.
 * @pathParam {string} productId ID of the product which thumbnail will be returned
 * @response 200 - [OK] Success
 * @responseContent {Thumbnail} 200.image/*
 * @response 404 - [Not found]
 */
productsRouter.get('/products/:id/thumbnail', async (req, res) => {
  try {
    res.type('image/jpeg').send(await productService.getThumbnail(parseInt(req.params.id)));
  } catch {
    res.sendStatus(404);
  }
});

export default productsRouter;
