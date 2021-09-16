const bcrypt = require('bcryptjs');

const User = require('../db/models/User');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashPassword });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const login = async (req, res) => {
  try {
    console.log(req.headers);
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json('Invalid credentials');

    const isPassMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPassMatch) return res.status(400).json('Invalid credentials');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
};

module.exports = { register, login };
