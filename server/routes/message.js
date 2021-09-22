const router = require('express').Router();

const msgControllers = require('../controllers/message');

router.post('/', msgControllers.createMsg);
router.get('/:conversationId', msgControllers.getMsg);

module.exports = router;
