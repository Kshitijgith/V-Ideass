// socketService.js
const http = require('http');
const { Server } = require('socket.io');
const Project = require('../models/group'); // Import the Project model

let ioInstance = null;

const initializeSocketServer = (req,res) => {
  if (ioInstance) {
    console.log("Socket.IO server is already running");
    res.json('server already running');
    return ioInstance;
  }

  const server = http.createServer(); // Create a standalone HTTP server
  const io = new Server(server, {
    cors: {
      origin: '*', // Adjust according to your frontend origin
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinGroup', (groupId) => {
      socket.join(groupId);
      console.log(`User joined group: ${groupId}`);
    });

    socket.on('groupMessage', async ({ groupId, senderName, message,Date }) => {
      try {
        // Emit the message to the group
        io.to(groupId).emit('newMessage', { senderName, message,Date });

        // Save the message to the database
        await Project.findOneAndUpdate(
          { groupId: groupId },
          { $push: { Chats: { senderName, message,Date } } }
        );
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  const SOCKET_PORT =  3000;
  server.listen(SOCKET_PORT, () => {
    console.log(`Socket.IO server running on port ${SOCKET_PORT}`);
    // res.json('Socket.IO server running on port ${SOCKET_PORT}')
  });

  ioInstance = io; // Store the instance to prevent multiple servers
  return ioInstance;
};

module.exports =  initializeSocketServer ;
