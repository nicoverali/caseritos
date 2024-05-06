import adaptHash from '../helpers/adaptHash';
import pool from '../helpers/pgPool';
import bcrypt from 'bcrypt';
import { PgClient, PgTransactionalClient } from '../helpers/pgQueries';
import ClientProfileModel from '../models/ClientProfileModel';
import RoleModel from '../models/RoleModel';
import UserModel from '../models/UserModel';

export type ClientId = number;

export type Client = {
  id: ClientId;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type ClientRequest = {
  id?: ClientId;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export default class ClientService {
  async create(req: ClientRequest): Promise<Client> {
    const pg = await new PgTransactionalClient(pool).waitForConnection();
    await pg.begin();
    try {
      const user = await UserModel.create(pg, req.name, req.email, req.password);
      const role = await RoleModel.getByName(pg, 'client');
      const clientProfile = await ClientProfileModel.create(pg, req.phone, req.address);

      await UserModel.assignRole(pg, user, role);
      await UserModel.assignClientProfile(pg, user, role, clientProfile);

      await pg.commit();
      pg.release();
      const { name, email } = user;
      return { name, email, ...clientProfile };
    } catch (err) {
      await pg.rollback();
      pg.release();
      throw err;
    }
  }

  async validate(email: string, password: string): Promise<ClientId> {
    const pg = await new PgClient(pool).waitForConnection();
    const user = await UserModel.getByEmail(pg, email);
    const hashPass = adaptHash(user.password);

    if (!(await bcrypt.compare(password, hashPass))) {
      throw Error('Invalid credentials');
    }

    const { id } = await ClientProfileModel.getByUserId(pg, user.id);
    pg.release();
    return id;
  }

  async get(id: ClientId): Promise<Client> {
    const pg = await new PgClient(pool).waitForConnection();
    const user = await UserModel.getByClientId(pg, id);
    const clientProfile = await ClientProfileModel.getById(pg, id);
    pg.release();
    const { name, email } = user;
    return { name, email, ...clientProfile };
  }

  async update(req: ClientRequest): Promise<void> {
    if (!req.id) {
      throw new Error('No ID provided for update client.');
    }

    const pg = await new PgTransactionalClient(pool).waitForConnection();
    pg.begin();
    try {
      const user = await UserModel.getById(pg, req.id);
      await UserModel.update(pg, user.id, req.name, req.email, req.password);
      await ClientProfileModel.update(pg, req.id, req.phone, req.address);
      await pg.commit();
      pg.release();
    } catch (err) {
      await pg.rollback();
      pg.release();
      throw err;
    }
  }
}
