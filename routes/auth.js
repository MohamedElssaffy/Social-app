const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome in auth route');
});

module.exports = router;
