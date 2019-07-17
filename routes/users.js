const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../models/users')
const router = express.Router();

/* POST signup */
router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const isUser = await User.findOne({ username });
    if (isUser) {
      // res.status(422).json(isUser);
      next(createError(422));
    } else {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      const user = await User.create({
        username,
        password: hash,
      });
      res.status(200).json(user);
    }
  } catch (error) {
    // res.status(404).json(error);
    next(createError(404));
  }
});

module.exports = router;
