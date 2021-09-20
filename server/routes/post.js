const router = require('express').Router();

const postControllers = require('../controllers/post');

router.get('/:id', postControllers.getPost);

router.get('/timeline/:userId', postControllers.getTimelinePosts);

router.get('/profile/:username', postControllers.getUserPosts);

router.post('/', postControllers.createPost);

router.patch('/:id', postControllers.updatePost);

router.patch('/:id/like', postControllers.likePost);

router.delete('/:id', postControllers.deletePost);

module.exports = router;
