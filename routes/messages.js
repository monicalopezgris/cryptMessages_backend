const express = require('express');
const createError = require('http-errors');
const Message = require('../models/messages')
const User = require('../models/users')
const router = express.Router();

const {
  secured,
} = require('../middlewares/auth');

router.post(
  '/',
  secured,
  async (req, res, next) => {
    try {
      const { message } = req.body;
      const { currentUser } = req.session;
      const user = await User.findById(currentUser)
      if (
        user !== null
        || user.length <= 0
      ) {
        const resMessage = await Message.create({
          author: currentUser,
          message
        })
        res.status(200).json(resMessage)
      } else {
        next(createError(403))
      }
    } catch (error) {
      next(createError(404))
    }
  })


module.exports = router;
