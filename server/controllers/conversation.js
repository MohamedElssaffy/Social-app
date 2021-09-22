const Conversation = require('../db/models/Conversation');

const createConv = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const conversation = new Conversation({
      sender,
      receiver,
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json('Invalid User');
    }

    res.status(500).json('Server Error');
  }
};

const getConv = async (req, res) => {
  try {
    const conv = await Conversation.find({
      $or: [{ sender: req.params.userId }, { receiver: req.params.userId }],
    }).populate('sender receiver', ['username', 'profilePicture']);

    res.json(conv);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json('Invalid User');
    }
    res.status(500).json('Server Error');
  }
};

module.exports = { createConv, getConv };
