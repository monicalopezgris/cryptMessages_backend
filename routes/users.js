const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../models/users')
const router = express.Router();

const {
  secured,
  anon,
} = require('../middlewares/auth');

router.post(
  '/signup',
  anon,
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const isUser = await User.findOne({ username });
      if (isUser) {
        next(createError(422));
      } else {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const user = await User.create({
          username,
          password: hash,
        });
        const { _id: id } = user;
        req.session.currentUser = id;
        res.status(200).json(user);
      }
    } catch (error) {
      next(createError(404));
    }
  });

router.post(
  '/login',
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        const { _id: id } = user;
        req.session.currentUser = id;
        return res.status(200).json(user);
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/logout',
  (req, res, next) => {
    try {
      req.session.destroy();
      return res.status(204).send();
    } catch (error) {
      next(createError(404))
    }
  });

module.exports = router;
