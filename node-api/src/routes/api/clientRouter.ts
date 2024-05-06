import express from 'express';
import authJwt from '../../middleware/authJwt';
import { JwtPayload } from '../../services/SessionService';
import ClientService, { ClientRequest } from '../../services/ClientService';

const clientService = new ClientService();
const clientRouter = express.Router();
clientRouter.use('/client', authJwt.unless({ method: 'POST' }));

/**
 * POST /client
 * @summary Creates a new clients.
 * @description A new Client is created in the app with the given information. The client email must be unique.
 * @bodyContent {Client} application/json
 * @bodyRequired
 * @response 201 - [Created] A new Client has been created. Session token updated in response
 * @responseHeader {string} 201.Location Where to authenticate as the newly created client
 * @response 409 - [Conflict] The given email already exists
 * @response 422 - [Unprocesable entity] Invalid request body
 */
clientRouter.post('/client', async (req, res) => {
  if (!validateClientInformation(req.body)) {
    res.sendStatus(422);
    return;
  }

  try {
    await clientService.create(req.body as ClientRequest);
    res.setHeader('Location', '/session').sendStatus(201);
  } catch {
    res.sendStatus(409);
  }
});

/**
 * GET /client
 * @summary Returns the information about the current authenticated client.
 * @description Given that the user is authenticated, returns the information about the current user.
 * @response 200 - [OK] Success
 * @responseContent {Client} 200.application/json
 * @response 401 - [Unauthorized] User is not authenticated or credentials are not valid
 * @security BearerAuth
 */
clientRouter.get('/client', async (req, res) => {
  try {
    const payload = req.jwt.payload as JwtPayload;
    const client = await clientService.get(payload.id);
    res.send(client);
  } catch {
    res.sendStatus(500);
  }
});

/**
 * PUT /client
 * @summary Updates the information of the current authenticated client.
 * @description Given the complete data of a specific client in the app, the current information of it will be replaced by the new one. The email must be unique
 * @bodyContent {Client} application/json
 * @bodyRequired
 * @response 204 - [No Content] Client updated
 * @response 401 - [Unauthorized] User is not authenticated or credentials are not valid
 * @response 409 - [Conflict] The given email already exists
 * @response 422 - [Unprocesable entity] Invalid request body
 * @security BearerAuth
 */
clientRouter.put('/client', async (req, res) => {
  if (!validateClientInformation(req.body)) {
    res.sendStatus(422);
    return;
  }

  try {
    const { id } = req.jwt.payload as JwtPayload;
    await clientService.update({ id, ...(req.body as ClientRequest) });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(409);
  }
});

function validateClientInformation(request: ClientRequest) {
  return request.name && request.email && request.password && request.phone && request.address;
}

export default clientRouter;
