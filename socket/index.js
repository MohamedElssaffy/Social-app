const io = require('socket.io')(8000, {
  cors: { origin: 'http://localhost:3000' },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on('connection', (socket) => {
  // When connect
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // Send a message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    io.to(user.socketId).emit('getMessage', { senderId, text });
  });

  // When disconnect
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
