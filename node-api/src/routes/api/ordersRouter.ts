import express from 'express';
import authJwt from '../../middleware/authJwt';
import OrderService from '../../services/OrderService';
import { JwtPayload } from '../../services/SessionService';

const ordersService = new OrderService();
const ordersRouter = express.Router();

ordersRouter.use('/orders', authJwt);

/**
 * GET /orders
 * @summary Returns all the orders of a particular user in descending order by creation date. Allows pagination.
 * @description Given the user is authenticated, returns all the orders it has made since register. The collection
 * is returned in descending order by creation date. This means that latest orders will appear first.
 * Limit/offset pagination parameters may be provided.
 * @queryParam {number} [limit] Number of products per page. If not provided, all products will be returned
 * @queryParam {number} [offset] Offset of pagination. Determines first element that needs to be returned.
 * If not provided, the page will start from the first element
 * @response 200 - [OK] Success
 * @responseContent {Order[]} 200.application/json
 * @response 400 - [Bad request] Parameters are invalid
 * @response 401 - [Unauthorized] User not authenticated
 * @security BearerAuth
 */
ordersRouter.get('/orders', async (req, res) => {
  const jwt = req.jwt.payload as JwtPayload;
  const { limit, offset } = req.query;
  try {
    const orders = await ordersService.getOrdersOfClient(jwt.id, Number(limit), Number(offset));
    res.send(orders);
  } catch {
    res.sendStatus(400);
  }
});

/**
 * POST /orders
 * @summary Creates a new order.
 * @description Creates a new order where the client is the current authenticated user.
 * @bodyContent {OrderRequest} application/json
 * @bodyRequired
 * @response 201 - [Created] Order created
 * @responseHeader {string} 201.Location Location of the new order
 * @response 401 - [Unauthorized] User not authenticated
 * @response 409 - [Conflict] Not enough stock
 * @response 422 - [Unprocessable entity] Invalid request body
 * @security BearerAuth
 */
ordersRouter.post('/orders', async (req, res) => {
  const jwt = req.jwt.payload as JwtPayload;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    res.sendStatus(422);
    return;
  }

  try {
    const id = await ordersService.createOrder(jwt.id, productId, quantity);
    res.setHeader('Location', `/${id}`).sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(409);
  }
});

/**
 * GET /orders/{orderId}
 * @summary Returns the information of a single order.
 * @description Given the ID of the order, returns all the information of it. The user must be authenticated and should be the one who made the order in the first place
 * @response 200 - [OK] Success
 * @responseContent {Order} 200.application/json
 * @response 401 - [Unauthorized] User not authenticated
 * @response 403 - [Forbidden] User does not own the requested order
 * @security BearerAuth
 */
ordersRouter.get('/orders/:id', async (req, res) => {
  const jwt = req.jwt.payload as JwtPayload;
  const orderId = parseInt(req.params.id);
  try {
    const order = await ordersService.getOrderOfClient(orderId, jwt.id);
    res.send(order);
  } catch (err) {
    res.sendStatus(403);
  }
});

export default ordersRouter;
