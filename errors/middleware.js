const httpStatus = require('http-status');
const APIError = require('./APIError');

const handler = (err, req, res) => {
  const data = {
    code: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };
  return res.status(data.code).json(data);
};

const converter = (err, req, res, next) => {
  let convertedError = err;
  const isAPIError = err instanceof APIError;
  console.group('Error:');
  console.dir(err);
  console.groupEnd();
  if (!isAPIError) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }
  return handler(convertedError, req, res);
};

const notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};

module.exports = {
  setup: (app) => {
    app.use(converter);
    app.use(notFound);
    app.use(handler);
  },
};
