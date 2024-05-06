import {
  UnauthorizedError,
  UnavailableEmail,
  UnexpectedRequestError,
} from "./apiErrors";
import { apiClientUrl } from "./apiUrl";

export interface ClientRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}
class ClientService {
  async register(
    client: ClientRegisterRequest,
    signal?: AbortSignal
  ): Promise<void> {
    const res = await fetch(apiClientUrl("client"), {
      method: "POST",
      body: JSON.stringify(client),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      signal,
    });

    if (res.status == 409) throw new UnavailableEmail();
    if (res.status != 201) throw new UnexpectedRequestError(res);

    return;
  }

  async get(accessToken: string, signal?: AbortSignal): Promise<Client> {
    const res = await fetch(apiClientUrl("client"), {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
      signal,
    });

    if (res.status == 401) throw new UnauthorizedError();
    if (res.status != 200) throw new UnexpectedRequestError(res);

    const client = await (res.json() as Promise<Client>);

    return client;
  }
}

export default new ClientService();
