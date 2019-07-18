const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const messageSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User',
  },
  message: String,
  crc: Number,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;