import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Home/News.css';
import { useUser } from '../User/UserContext';
import axios from 'axios';

function Getchats() {
  const { id_party } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, [id_party]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/group/fetch-messages?id_party=${id_party}`);
      if (Array.isArray(response.data.messages)) {
        setMessages(response.data.messages);
      } else {
        console.error('Invalid data format for messages:', response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div className='Message-board'>
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className='message-box'>
            <p>{message.messages}</p>
            <p>{message.create_time}</p>
          </div>
        ))
      ) : (
        <p>No messages available</p>
      )}
    </div>
  );
}

export default Getchats;
