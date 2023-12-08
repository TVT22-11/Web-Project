import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import AvailableGroups from './availableGroups';

const ChatPage = ({ id_party }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/group/${AvailableGroups.id_party}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id_party]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      await axios.post(`http://localhost:3001/group/${AvailableGroups.id_party}`, {
        sender: 'User', // You may replace 'User' with the actual sender
        content: message,
      });

      // Fetch updated messages after sending a new message
      await fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async (id_party) => {
    try {
      const response = await axios.get(`http://localhost:3001/group/${id_party}`);
      if (response.status === 200 && response.data && response.data.messages) {
        return response.data.messages;
      } else {
        console.error('Invalid data structure received from the server');
        return [];
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };


  return (
    <div className='chat'>
      <div className='chat-backround'>
        <Container>
          <h1>Chat Page</h1>
          <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <ListGroup.Item key={index}>{msg.sender}: {msg.content}</ListGroup.Item>
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
        <div className='delete-button'>
          <button>Delete Group</button>
        </div>
      </div>
    </div>
  );
};


export default ChatPage;
