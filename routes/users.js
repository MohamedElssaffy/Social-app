const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome in users route');
});

module.exports = router;
