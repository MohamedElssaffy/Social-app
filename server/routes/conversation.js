const router = require('express').Router();

const convControllers = require('../controllers/conversation');

router.post('/', convControllers.createConv);
router.get('/:userId', convControllers.getConv);

module.exports = router;
