const bcrypt = require('bcryptjs');

const User = require('../db/models/User');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('following followers', ['username', 'profilePicture']);

    if (!user) return res.status(400).json('User not found');

    res.json(user);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json('User not found');
    }
    res.status(500).json('Server Error');
  }
};

const getUserByName = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password')
      .populate('following', ['username', 'profilePicture']);
    if (!user) return res.status(400).json('User not found');

    res.json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json('Server Error');
  }
};

const updateUser = async (req, res) => {
  if (req.body.userId !== req.params.id)
    return res.status(403).json('You dont have permation to do that');
  try {
    const { username, email, password, desc, city, from, relationship } =
      req.body;

    const user = await User.findById(req.params.id);

    if (!user) return res.status(400).json('User not found');

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (desc) user.desc = desc;
    if (city) user.city = city;
    if (from) user.from = from;
    if (relationship) user.relationship = relationship;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json('User not found');
    }
    res.status(500).json('Server Error');
  }
};

const deleteUser = async (req, res) => {
  if (req.body.userId !== req.params.id)
    return res.status(403).json('You dont have permation to do that');
  try {
    await User.deleteOne({ id: req.params.id });

    res.json('User Removed');
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json('User not found');
    }
    res.status(500).json('Server Error');
  }
};

const followUser = async (req, res) => {
  if (req.body.userId === req.params.id)
    return res.status(400).json('You cant follow yourself');

  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!user || !currentUser) return res.status(400).json('User not found');

    if (user.followers.includes(req.body.userId))
      return res.status(400).json('You already following');

    await user.updateOne({ $push: { followers: req.body.userId } });
    await currentUser.updateOne({
      $push: {
        following: req.params.id,
      },
    });

    res.json('user has been followed');
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json('User not found');
    }
    res.status(500).json('Server Error');
  }
};

const unfollowUser = async (req, res) => {
  if (req.body.userId === req.params.id)
    return res.status(400).json('You cant follow yourself');

  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!user || !currentUser) return res.status(400).json('User not found');

    if (!user.followers.includes(req.body.userId))
      return res.status(400).json('You dont follow this user');

    await user.updateOne({ $pull: { followers: req.body.userId } });
    await currentUser.updateOne({
      $pull: {
        following: req.params.id,
      },
    });

    res.json('user has been unfollowed');
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json('User not found');
    }
    res.status(500).json('Server Error');
  }
};

module.exports = {
  getUserById,
  getUserByName,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
};
