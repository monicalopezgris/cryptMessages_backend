const createError = require('http-errors');

module.exports = {
  auth: (req, res, next) => {
    if (
      req.body === null ||
      req.body === undefined ||
      req.body.username.length <= 2 ||
      req.body.username === null ||
      req.body.password.length <= 2) {
      next(createError(400));
    } else {
      next();
    }
  },
  message: (req, res, next) => {
    if (
      req.body === null ||
      req.body === undefined) {
      next(createError(400));
    } else {
      next();
    }
  },
}