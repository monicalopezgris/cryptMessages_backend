
const express = require('express');
const createError = require('http-errors');
const Message = require('../models/messages')
const User = require('../models/users')
const router = express.Router();

const {
  secured,
} = require('../middlewares/auth');
const {
  encrypt,
  decrypt,
  getJump,
} = require('../helpers/crypt');

router.post(
  '/',
  secured,
  async (req, res, next) => {
    try {
      let { message } = req.body;
      const { currentUser } = req.session;
      const user = await User.findById(currentUser)
      if (
        user !== null
        || user.length <= 0
      ) {
        // Get messages from user
        const messageHisto = await Message.find({
          author: currentUser
        })
        // Encrypt
        message = await encrypt(message, getJump(messageHisto, decrypt))
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

router.get(
  '/',
  secured,
  async (req, res, next) => {
    const { currentUser } = req.session;
    const messages = await Message.find({
      author: currentUser,
    })
    res.status(200).json(messages)
  }
);

router.post(
  '/delete',
  secured,
  async (req, res, next) => {
    const { currentUser } = req.session;
    const messages = await Message.deleteMany({
      author: currentUser,
    })
    res.status(200);
  }
);


module.exports = router;
