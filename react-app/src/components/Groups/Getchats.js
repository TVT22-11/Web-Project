import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Home/News.css';
import { useUser } from '../User/UserContext';
import axios from 'axios';

function Getchats() {
  const { id_party } = useParams();
  const [messages, setMessages] = useState([]);
  const [usernames, setusernames] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, [id_party]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/group/fetch-messages?id_party=${id_party}`);
      if (Array.isArray(response.data.messages ) && response.status === 200) {
        setMessages(response.data.messages);
  
        const idAccounts = response.data.messages.map(message => message.id_account);
  
        const usernamesPromises = idAccounts.map(async idAccount => {
          try {
            const userResponse = await axios.get(`http://localhost:3001/account/user?id_account=${idAccount}`);
            return userResponse.data[0]?.username || null;
          } catch (userError) {
            console.error('Error fetching username:', userError);
            return null; 
          }
        });
  
         setusernames(await Promise.all(usernamesPromises));
  
        console.log('usernames:', usernames);
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
      messages.map((message, index) => (
        <div key={message.id} className='message-box'>
          <p>user: {usernames[index]}</p> 
          <p>{message.messages}</p>
          <p>{new Date(message.create_time).toLocaleDateString('fi-FI', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}</p>
        </div>
        ))
      ) : (
        <p>No messages available</p>
      )}
    </div>
  );
}

export default Getchats;
