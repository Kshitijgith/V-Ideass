import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatRoom = ({ groupId, yourName,role }) => {
  const startserver =  () => {
    try {
      const token = localStorage.getItem('token');
    
      const response =  axios.post(`http://192.168.29.220:3000/${role}/Run`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
        
      );
      console.log('Socket server started:', response.data);
    } catch (error) {
      console.error('Error starting socket server:', error);
    }
  };

  // Use useEffect to start the server only once on component mount
  useEffect(() => {
    startserver();
  }, []);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  // Reference to the message container
  const messagesEndRef = useRef(null);

  // Fetch previous chat messages
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://192.168.29.220:3000/${role}/Groupchat`,
        { groupid: groupId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Initialize the socket connection
  useEffect(() => {
    const token = localStorage.getItem('token');
       console.log(token);
    // Connect to the Socket.IO server with the authorization token
    const newSocket = io('http://192.168.29.220:5001', {
      auth: {
        token: `Bearer ${token}`,
      },
    });

    newSocket.emit('joinGroup', groupId);

    // Listen for new messages from the server
    newSocket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);

    // Fetch previous messages
    fetchMessages();

    // Clean up the socket connection on unmount
    return () => newSocket.close();
  }, [groupId]);

  // Handle input change
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Send a message through the socket
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      groupId,
      senderName: yourName,
      message: newMessage,
    };

    // Emit the message to the server
    socket.emit('groupMessage', messageData);

    // Clear the input field
    setNewMessage('');
  };

  // Scroll to the last message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-90p w-100p bg-gray-100 flex flex-col overflow-y-auto">
      <div className="h-10p w-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        Chat Room
      </div>

      {/* Chat Messages Section */}
      <div className="h-70p w-full p-2 flex flex-col gap-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-80p ${
              msg.senderName === yourName ? 'self-end bg-green-200' : 'self-start bg-blue-200'
            }`}
          >
            <p className="text-sm font-semibold">{msg.senderName}</p>
            <p>{msg.message}</p>
          </div>
        ))}
        {/* This is the reference for the last message */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Section */}
      <div className="h-15p w-full bg-gray-200 flex items-center p-2 gap-2">
        <input
          type="text"
          className="flex-grow p-2 rounded border border-gray-300"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;