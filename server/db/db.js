const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Database is connectting');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = db;
