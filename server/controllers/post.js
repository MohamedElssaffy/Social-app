const path = require('path');
const multer = require('multer');

const Post = require('../db/models/Post');
const User = require('../db/models/User');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../client/public/assets/posts'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 100)}-${file.originalname}`
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter(req, file, cb) {
    if (!file) return cb(null, false);

    if (!file.originalname.match(/\.(png|jpeg|jpg)$/))
      return cb(new Error('You must upload an image'));

    cb(null, true);
  },
});

const createPost = async (req, res) => {
  try {
    const img = req.file;
    const { userId, desc } = req.body;
    console.log(desc);
    console.log(userId);

    const post = new Post({ userId, desc });
    if (img) {
      post.img = img.filename;
    }

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json('Post not found');

    res.json(post);
  } catch (err) {
    console.error(err);

    if (err.kind === 'ObjectId') return res.status(400).json('Post not found');

    res.status(500).json('Server Error');
  }
};

const getTimelinePosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const posts = await Post.find({
      userId: { $in: [...user.following, user.id] },
    })
      .populate('userId', ['username', 'profilePicture'])
      .sort('-createdAt');
    res.json(posts);
  } catch (err) {
    console.error(err);

    if (err.kind === 'ObjectId') return res.status(400).json('Post not found');

    res.status(500).json('Server Error');
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({
      userId: user.id,
    })
      .populate('userId', ['username', 'profilePicture'])
      .sort('-createdAt');
    res.json(posts);
  } catch (err) {
    console.error(err);

    if (err.kind === 'ObjectId') return res.status(400).json('Post not found');

    res.status(500).json('Server Error');
  }
};

const updatePost = async (req, res) => {
  try {
    const { img, desc } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json('Post not found');

    if (post.userId.toString() !== req.body.userId)
      return res.status(400).json('You dont have permetion to do this');

    if (img) post.img = img;
    if (desc) post.desc = desc;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);

    if (err.kind === 'ObjectId') return res.status(400).json('Post not found');

    res.status(500).json('Server Error');
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json('Post not found');

    if (post.userId.toString() !== req.body.userId)
      return res.status(400).json('You dont have permetion to do this');

    await post.remove();

    res.json('Post has been deleted');
  } catch (err) {
    console.error(err);

    if (err.kind === 'ObjectId') return res.status(400).json('Post not found');

    res.status(500).json('Server Error');
  }
};

const likePost = async (req, res) => {
  if (!req.body.userId) return res.status(400).json('No user to like');
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json('Post not found');

    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.json('Unlike post');
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.json('Like post');
    }
  } catch (err) {
    console.error(err);

    if (err.kind === 'ObjectId') return res.status(400).json('Post not found');

    res.status(500).json('Server Error');
  }
};

module.exports = {
  createPost,
  getPost,
  getTimelinePosts,
  getUserPosts,
  updatePost,
  deletePost,
  likePost,
  upload,
};
