/* eslint max-classes-per-file: 0 */
const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor({ message: rawMessage, fallback, ...props }) {
    const message = rawMessage || fallback;
    super(message);
    this.name = this.constructor.name;
    this.rawMessage = rawMessage;
    Object.assign(this, props);
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
  }
}

class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor(props) {
    const params = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      ...props,
    };
    super(params);
  }
}

module.exports = APIError;
