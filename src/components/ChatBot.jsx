import axios from 'axios';
import React, { useState } from 'react'


const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
  
    const addMessage = (content, sender) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content, sender }
      ]);
    };
  
    const handleSendMessage = async () => {
      if (!userInput.trim()) return;
  
      addMessage(userInput, 'user');
      setUserInput('');
  
      try {
        const response = await axios.post('/api/chatbot.js', {
          message: userInput
        });
        addMessage(response.data.reply, 'bot');
      } catch (error) {
        console.error('Error fetching bot response:', error);
        addMessage('Sorry, something went wrong.', 'bot');
      }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <div className="messages overflow-y-auto h-96 p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message p-2 my-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white text-right' : 'bg-gray-200 text-left'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
    
            <div className="flex mt-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white p-2 rounded-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      );
}

export default ChatBot