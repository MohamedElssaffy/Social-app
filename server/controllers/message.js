const Message = require('../db/models/Message');

const createMsg = async (req, res) => {
  try {
    const { conversation, sender, text } = req.body;

    const message = new Message({ conversation, sender, text });
    await message.save();

    res.status(201).json(message);
  } catch (err) {
    console.error(err);

    if (err.errors) {
      return res.status(400).json('Invalid User');
    }
    res.status(500).json('Server Error');
  }
};

const getMsg = async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversationId,
    }).populate('sender', ['username', 'profilePicture']);

    res.json(messages);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json('Invalid User');
    }
    res.status(500).json('Server Error');
  }
};

module.exports = {
  getMsg,
  createMsg,
};
