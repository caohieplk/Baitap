import React from 'react';

const ChatWindow = ({ messages, loading }) => {
  return (
    <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ margin: '8px 0' }}>
          <b>{msg.role === 'user' ? 'You' : 'Bot'}:</b> {msg.content}
        </div>
      ))}
      {loading && <p> Bot đang trả lời...</p>}
    </div>
  );
};

export default ChatWindow;
