const router = require('express').Router();

const userControllers = require('../controllers/users');

router.get('/:id', userControllers.getUserById);

router.get('/profile/:username', userControllers.getUserByName);

router.patch('/:id', userControllers.updateUser);

router.delete('/:id', userControllers.deleteUser);

router.patch('/:id/follow', userControllers.followUser);

router.patch('/:id/unfollow', userControllers.unfollowUser);

module.exports = router;
