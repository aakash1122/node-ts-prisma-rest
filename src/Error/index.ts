class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  getCode() {
    return 400;
  }
}

class NotFound extends BaseError {
  constructor(msg: string) {
    super(msg);
    this.message = msg;
  }
  getCode() {
    return 404;
  }
}

class BadRequest extends BaseError {
  constructor(msg: string) {
    super(msg);
    this.message = msg;
  }
  getCode() {
    return 400;
  }
}

export { BaseError, NotFound, BadRequest };
