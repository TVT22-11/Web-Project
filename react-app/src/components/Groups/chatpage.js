// ChatPage.js
import React, { useState } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const currentTime = getCurrentTime();
      const newMessage = `${currentTime} - ${message}`;
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
      <div className='chat'>
            <div className='chat-backround'>
                 
    <Container>
      <h1>Chat Page</h1>
      <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <ListGroup.Item key={index}>{msg}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
          />
        </Form.Group>
         <Button variant="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Form>
    </Container>
    
    </div>
    </div>
  );
};

export default ChatPage;
