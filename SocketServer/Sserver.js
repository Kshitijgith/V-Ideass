const http = require('http');
const { Server } = require('socket.io');
 const Project = require('../server/models/group'); // Import the Project model
const connectDb = require('../server/config/db');
const dotenv = require('dotenv');
dotenv.config();

const server = http.createServer();
 connectDb();
const io = new Server(server, {
  cors: {
    origin: '*',  // Allow requests from any origin
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log('User joined group: ${groupId}');
  });

  socket.on('groupMessage', async ({ groupId, senderName, message, timestamp }) => {
    try {
      // Emit the message to the group
      io.to(groupId).emit('newMessage', { senderName, message, timestamp });

      //Save the message to the database
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

const SOCKET_PORT = 5001;
server.listen(SOCKET_PORT, '0.0.0.0', () => {  // Explicitly specify '0.0.0.0' to listen on all interfaces
  console.log(`Socket.IO server running on port ${SOCKET_PORT}`);
});
