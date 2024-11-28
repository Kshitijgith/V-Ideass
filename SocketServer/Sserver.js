const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const connectDb = require('../server/config/db');
const Project = require('../server/models/group'); // Import your Project model
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Connect to MongoDB
connectDb();

// Create HTTP server using Express
const server = http.createServer(app);

// Create Socket.IO instance attached to the HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Basic HTTP route
app.get('/', (req, res) => {
  res.send('Socket.IO and Express server running!');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group: ${groupId}`);
  });

  socket.on('groupMessage', async ({ groupId, senderName, message, timestamp }) => {
    try {
      // Emit the message to the group
      io.to(groupId).emit('newMessage', { senderName, message, timestamp });

      // Save the message to the database
      await Project.findOneAndUpdate(
        { groupId: groupId },
        { $push: { Chats: { senderName, message, timestamp } } }
      );
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Ensure you use an open HTTP port (e.g., 5001)
const PORT = process.env.PORT || 5001;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
