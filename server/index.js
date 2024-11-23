// backend/server.js

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // Import http to create server
const { Server } = require('socket.io'); // Import Socket.IO

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Adjust the limit as needed

// Routes
app.use('/admin', require('./routes/adminRoutes'));
app.use('/auth', require('./routes/authroutes')); // Authentication Routes
app.use('/teacher', require('./routes/teacherroute')); // Teacher Management Routes
app.use('/student', require('./routes/studentroute'));
app.use('/all', require('./routes/CommonRoutes'));

// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'MERN Auth App Backend' });
});

// Create HTTP server
const server = http.createServer(app);

// Set up WebSocket server with the same HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust according to your frontend origin
    methods: ['GET', 'POST']
  }
});

// WebSocket logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group: ${groupId}`);
  });

  socket.on('groupMessage', async ({ groupId, senderName, message, Date }) => {
    try {
      io.to(groupId).emit('newMessage', { senderName, message, Date });

      // Save the message to the database
      const Project = require('../models/group'); // Import the Project model
      await Project.findOneAndUpdate(
        { groupId: groupId },
        { $push: { Chats: { senderName, message, Date } } }
      );
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
