const { INTERNAL_SERVER_ERROR } = require('./http-status');

class APIError extends Error {
  /**
   *
   * @param {param} param0
   */
  constructor({
    message = 'Internal server error occured',
    stack,
    errors,
    status = INTERNAL_SERVER_ERROR,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.stack = stack;
  }
}

module.exports =  APIError;
