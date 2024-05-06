import { Pool, PoolClient, QueryResult } from 'pg';

type QueryParam = string | string[] | number | number[] | Date;

export class PgClient {
  protected client: PoolClient;
  protected waitConnection: Promise<void>;

  constructor(pool: Pool) {
    this.waitConnection = this._init(pool);
  }

  private async _init(pool: Pool): Promise<void> {
    this.client = await pool.connect();
  }

  async waitForConnection(): Promise<this> {
    await this.waitConnection;
    return this;
  }

  release(err?: boolean | Error): void {
    this.client.release(err);
  }

  async query<T>(text: string, ...params: QueryParam[]): Promise<T[]> {
    return this.client.query<T>(text, params).then((queryResult) => queryResult.rows);
  }

  async queryStrict<T>(text: string, ...params: QueryParam[]): Promise<T[]> {
    return this._strict<T>(text, ...params).then((res) => res.rows);
  }

  async queryFirstStrict<T>(text: string, ...params: QueryParam[]): Promise<T> {
    return this._strict<T>(text, ...params).then((res) => res.rows[0]);
  }

  private async _strict<T>(text: string, ...params: QueryParam[]): Promise<QueryResult<T>> {
    const result = await this.client.query<T>(text, params);
    if (result.rowCount == 0) throw new Error('No result for strict query');
    return result;
  }
}

export class PgTransactionalClient extends PgClient {
  private runningTransaction = false;
  private closingTransaction = false;

  async begin(): Promise<PgTransactionalClient> {
    if (this.runningTransaction) throw new Error('Already running a transaction');
    this.runningTransaction = true;
    await this.client.query('BEGIN');
    return this;
  }

  async commit(): Promise<PgTransactionalClient> {
    return this._closeTransaction('COMMIT');
  }

  async rollback(): Promise<PgTransactionalClient> {
    return this._closeTransaction('ROLLBACK');
  }

  private async _closeTransaction(closeCommand: string): Promise<PgTransactionalClient> {
    if (this.closingTransaction) throw new Error('Transaction is already closing');
    if (!this.runningTransaction) throw new Error('No transaction running');
    this.closingTransaction = true;
    await this.client.query(closeCommand);
    this.closingTransaction = false;
    this.runningTransaction = false;
    return this;
  }
}
