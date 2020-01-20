
const express = require('express');
const createError = require('http-errors');
const Message = require('../models/messages')
const User = require('../models/users')
const router = express.Router();

const {
  secured,
} = require('../middlewares/auth');
const {
  message,
} = require('../middlewares/verification');
const {
  encrypt,
  decrypt,
  getJump,
  crcToDec,
  getJumpFinal,
} = require('../helpers/crypt');

router.post(
  '/',
  secured,
  message,
  async (req, res, next) => {
    try {
      let { data: message } = req.body;
      const { currentUser } = req.session;
      const user = await User.findById(currentUser)
      if (
        user !== null ||
        user.length <= 0
      ) {
        // Get messages from user
        const messageHisto = await Message.find({
          author: currentUser
        })
        // Encrypt
        const crc = crcToDec(message);
        const jump = getJumpFinal(messageHisto, getJump);
        message = await encrypt(message, jump)
        const resMessage = await Message.create({
          author: currentUser,
          message,
          crc
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
    try {
      const { currentUser } = req.session;
      // Get messages from user
      const messages = await Message.find({
        author: currentUser,
      })
      // Decrypt
      const decryptedMessages = await messages.map((message, index) => {
        const messageHisto = messages.slice(0, index)
        let totalCrc = 0;
        messageHisto.forEach(({ crc }) => {
          totalCrc = totalCrc + crc
        });
        const jump = getJump(totalCrc)
        if (jump > 0) {
          return decrypt({ message }, jump)
        }
      })
      res.status(200).json(decryptedMessages)
    } catch (error) {
      next(createError(404))
    }
  }
);

router.post(
  '/deleteAll',
  secured,
  async (req, res, next) => {
    const { currentUser } = req.session;
    const messages = await Message.deleteMany({
      author: currentUser,
    })
    res.status(200);
  }
);

router.post(
  '/:id/delete',
  secured,
  async (req, res, next) => {
    const { id } = req.params;
    const { currentUser } = req.session;
    const message = await Message.deleteOne({
      _id: id,
      author: currentUser,
    })
    res.status(200);
  }
);


module.exports = router;
