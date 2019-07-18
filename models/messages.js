const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const messageSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User',
  },
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;