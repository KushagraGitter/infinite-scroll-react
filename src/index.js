import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
function ChatMessage({ author, text }) {
  return (
    <div className={`chat-message-${author}`}>
      <span>{author}:</span>
      <div className="message-text">{text}</div>
    </div>
  );
}

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const woffResponses = [
    'Woff woff!',
    'Arf arf!',
    'Bow wow!',
    'Ruff ruff!',
    'Woff woff! Woff woff!',
    'Woff woff! Arf arf! Arf arf!',
  ];
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (messages.length % 2 === 1) {
      // Bot response
      const woffResponse =
        woffResponses[Math.floor(Math.random() * woffResponses.length)];
      const newResponse = {
        author: 'chatbot',
        text: woffResponse,
      };
      setTimeout(() => {
        setMessages([...messages, newResponse]);
        setUserInput('');
      }, 2000);
    }
  }, [messages]);

  function handleFormSubmit(event) {
    event.preventDefault();
    const newMessage = {
      author: 'user',
      text: userInput,
    };
    setMessages([...messages, newMessage]);
    setUserInput('');
  }

  function handleInputChange(event) {
    setUserInput(event.target.value);
  }

  return (
    <div id="chat-app">
      <div id="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            author={message.author}
            text={message.text}
          />
        ))}
      </div>
      <div className="chat-form-container">
        <form className="chat-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="user-input"
            value={userInput}
            placeholder="Type your message here..."
            onChange={handleInputChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

ReactDOM.render(<ChatApp />, document.getElementById('chat-container'));
