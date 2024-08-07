// server.js
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

const responses = {
  'hello': 'Hello! How can I help you?',
  'hi': 'Hi there! What can I do for you today?',
  'help': 'I am here to assist you. What do you need help with?',
  'bye': 'Goodbye! Have a great day!',
  'thanks': 'You\'re welcome!'
};

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    const response = responses[msg.toLowerCase()] || 'I am just a basic bot. Please say hello.';
    io.emit('chat message', response);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
