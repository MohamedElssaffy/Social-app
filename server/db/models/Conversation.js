const mongoose = require('mongoose');

const ConvSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

ConvSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = mongoose.model('Conversation', ConvSchema);
