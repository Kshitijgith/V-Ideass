import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatRoom = ({ groupId, yourName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Function to fetch chat messages
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.29.220:3000/student/Groupchat',
        { groupid: groupId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding the token in the headers
          },
        }
      );
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);
  

  // Handle input change
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Function to send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://192.168.29.220:3000/student/InsertChat',
        {
          groupid: groupId,
          senderName: yourName,
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding the token in the headers
          },
        }
      );
      setNewMessage(''); // Clear input field
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="h-90p w-100p bg-gray-100 flex flex-col overflow-y-auto">
      <div className="h-10p w-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        Chat Room
      </div>
      
      {/* Chat Messages Section */}
      <div className="h-70p w-full p-2 flex flex-col gap-2 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded-md max-w-80p ${
              msg.senderName === yourName ? 'self-end bg-green-200' : 'self-start bg-blue-200'
            }`}
          >
            <p className="text-sm font-semibold">{msg.senderName}</p>
            <p>{msg.message}</p>
            <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
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
