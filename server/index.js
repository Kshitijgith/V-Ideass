// backend/server.js

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors({
  origin: 'http://192.168.0.105:5173', // Step 3: Allow your frontend origin
  credentials: true, // Optional: If you are using cookies
}));

// Middleware
app.use(express.json());


// Routes
app.use('/admin', require('./routes/adminRoutes'))
app.use('/auth', require('./routes/authroutes')); // Authentication Routes
app.use('/teacher', require('./routes/teacherroute')); // Teacher Management Routes
app.use('/student', require('./routes/studentroute'));
app.use('/all', require('./routes/CommonRoutes'));
// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'MERN Auth App Backend' });
});

// Start Server
const PORT = process.env.PORT || 5000;
const LOCALIP = process.env.LOCAL_IP
 ; // Example local IP address

app.listen(PORT, LOCALIP, () => {
  console.log(`Server running at http://${LOCALIP}:${PORT}`);
});

