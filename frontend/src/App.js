import React, { useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (newMessage) => {
    const updatedMessages = [...messages, { role: 'user', content: newMessage }];
    setMessages(updatedMessages);
    setLoading(true);

    // Gửi yêu cầu tới backend
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let aiReply = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter((line) => line.trim() !== '');

      for (const line of lines) {
        if (line === 'data: [DONE]') {
          setLoading(false);
          break;
        }
        if (line.startsWith('data: ')) {
          const text = line.replace('data: ', '');
          aiReply += text;
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', content: aiReply }];
            } else {
              return [...prev, { role: 'assistant', content: aiReply }];
            }
          });
        }
      }
    }
  };

  return (
    <div className="App">
      <h2>🧠 Chat Bot LLM</h2>
      <ChatWindow messages={messages} loading={loading} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
