const createError = require('http-errors');

module.exports = {
  secured: (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      next(createError(401));
    }
  },
  anon: (req, res, next) => {
    if (!req.session.currentUser) {
      next();
    } else {
      next(createError(403));
    }
  },
}