import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSendClick = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tin nhắn..."
        style={{ width: '80%', padding: '8px' }}
        onKeyDown={(e) => e.key === 'Enter' && handleSendClick()}
      />
      <button onClick={handleSendClick} style={{ padding: '8px', marginLeft: '10px' }}>
        Gửi
      </button>
    </div>
  );
};

export default MessageInput;
