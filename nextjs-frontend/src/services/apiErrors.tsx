export class UnauthorizedError extends Error {
  constructor() {
    super("Client credentials are invalid");
    this.name = "UnauthorizedError";
  }
}

export class OutOfStockError extends Error {
  constructor() {
    super("The requested product is out of stock");
    this.name = "OutOfStockError";
  }
}

export class UnavailableEmail extends Error {
  constructor() {
    super("The given emails is already taken");
    this.name = "UnavailableEmailError";
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Unable to find the requested entity");
    this.name = "NotFoundError";
  }
}

export class UnexpectedRequestError extends Error {
  constructor(res: Response) {
    super(`Request failed with status: ${res.status} (${res.statusText})`);
    this.name = "UnexpectedRequestError";
  }
}
