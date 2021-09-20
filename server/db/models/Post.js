const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', PostSchema);
