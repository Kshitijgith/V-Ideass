import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const ChatRoom = ({ groupId, yourName, role }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/${role}/Groupchat`,
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


  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    const newSocket = io('https://v-ideass.onrender.com', {
      path: '/socket.io/',
      auth: {
        token: `Bearer ${token}`,
      },
    });

    newSocket.emit('joinGroup', groupId);

    newSocket.on('newMessage', (message) => {
      console.log('Received new message:', message);  // Log message to ensure correct data
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(newSocket);

    fetchMessages();

    return () => newSocket.close();
  }, [groupId]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
  
    const timestamp = Date.now();
    const messageData = {
      groupId,
      senderName: yourName,
      message: newMessage,
      timestamp,
    };
  
    // Emit the message to the server
    socket.emit('groupMessage', messageData);
  
    // Clear the message input
    setNewMessage('');
  };
  
  

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);

  return (
    <div className="h-92p w-100p bg-gray-100 flex flex-col ">
      <div className="h-10p w-full bg-blue-500 sm:hidden flex items-center justify-center font-semibold">
        Chat Room
      </div>

      <div className="h-70p sm:h-100p w-full p-2 flex flex-col gap-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-80p ${msg.senderName === yourName ? 'self-end bg-green-200' : 'self-start bg-blue-200'}`}
          >
            <p className="text-sm font-semibold">{msg.senderName}</p>
            <p>{msg.message}</p>
            <p>
              {msg.timestamp
                ? new Date(msg.timestamp).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })
                : 'Invalid timestamp'}  {/* Handle undefined or loading state */}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="h-15p w-full bg-gray-200 flex items-center p-2 gap-2">
        <input
          type="text"
          className="flex-grow p-2 rounded border border-gray-300"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-600 text-white h-60p w-20p rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
