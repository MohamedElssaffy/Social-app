const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// For read enviroment
dotenv.config();

// Connect to database
const dbConnect = require('./db/db');
dbConnect();

// Local imports
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const conversationRoute = require('./routes/conversation');
const messageRoute = require('./routes/message');

const app = express();

// Middelware
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === 'develop') {
  app.use(morgan('common'));
}

// App routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server is running!');
});
