const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    if (msg.toLowerCase() === 'hello') {
      io.emit('chat message', 'Hello! How can I help you?');
    } else if (msg.toLowerCase() === 'bye') {
      io.emit('chat message', 'Goodbye!');
    } else if (msg.toLowerCase() === 'how are you?') {
      io.emit('chat message', 'I am just a bot, but I am doing fine!');
    } else if (msg.toLowerCase() === 'help') {
      io.emit('chat message', 'How can I assist you?');
    } else if (msg.toLowerCase() === 'time') {
      io.emit('chat message', `The current time is ${new Date().toLocaleTimeString()}`);
    } else if (msg.toLowerCase() === 'date') {
      io.emit('chat message', `Today's date is ${new Date().toLocaleDateString()}`);
    } else {
      io.emit('chat message', 'I am just a basic bot. Please say hello.');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
