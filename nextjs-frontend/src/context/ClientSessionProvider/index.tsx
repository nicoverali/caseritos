import React, { createContext, ReactNode, useEffect, useState } from "react";
import ClientService, { Client } from "services/ClientService";
import SessionService, { Credentials } from "services/SessionService";

export type ClientSessionContextState = {
  token: string | null | undefined;
  isLoggedIn: boolean | undefined;
  client: Client | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
};

export const ClientSessionContext = createContext<ClientSessionContextState>({
  token: null,
  isLoggedIn: undefined,
  client: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

interface ClientSessionProviderProps {
  children?: ReactNode;
}

export default function ClientSessionProvider(
  props: ClientSessionProviderProps
) {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [client, setClient] = useState<Client | null>(null);

  const login = async (credentials: Credentials): Promise<void> => {
    const token = await SessionService.login(credentials);
    setToken(token);
    setClient(await ClientService.get(token));
  };

  const logout = async () => {
    await SessionService.logout();
    setToken(null);
    setClient(null);
  };

  useEffect(() => {
    const token = SessionService.isLoggedIn();
    setToken(token);
    if (token) {
      ClientService.get(token).then(setClient);
    }
  }, []);

  const isLoggedIn = token === undefined ? undefined : !!token;

  return (
    <ClientSessionContext.Provider
      value={{ token, isLoggedIn, client, login, logout }}
    >
      {props.children}
    </ClientSessionContext.Provider>
  );
}
