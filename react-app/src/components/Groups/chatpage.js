import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Home/News.css';
import { useUser } from '../User/UserContext';
import axios from 'axios';
import Getchats from './Getchats';

function ChatPage() {
  const { accountID } = useUser();
  const navigate = useNavigate();
  const [idPartyToDelete, setIdPartyToDelete] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const { id_party } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);

  const postMessage = async () => {
    try {
      console.log('id ACCOUNT :', accountID);
      const response = await axios.post(`http://localhost:3001/group/send-message`, {
        id_account: accountID,
        id_party: id_party,
        messages: newMessage,
      });

      console.log('Posted message:', newMessage);

      if (response.status === 200) {
        console.log('Successfully posted message');
        setNewMessage('');
        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        console.error('Failed to post message');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/group/fetch-messages?id_party=${id_party}`);
        if (Array.isArray(response.data.messages)) {
          setRefreshKey((prevKey) => prevKey + 1);
        } else {
          console.error('Invalid data format for messages:', response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id_party]);

  const handleAddUser = () => {
    // Implement the logic for adding a user
    console.log('Add User button clicked');
  };

  const handleDeleteUser = async () => {
    console.log('ID Party to Delete:', id_party);
    if (!id_party) {
      console.error('No party selected for deletion');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3001/group/deleteMember`, {
        data: {
          id_account: accountID,
          id_party: id_party,
        },
      });

      console.log('deleted account:', accountID);
      console.log('deleted id party:', id_party);

      if (response.status === 200) {
        console.log('Successfully deleted member');
        navigate('/groups');
      } else {
        console.error('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div>

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={postMessage}>Send Message</button>

      <button onClick={handleAddUser}>Add Member</button>
      <button onClick={handleDeleteUser}>Delete Member</button>
      <div>
        <Getchats key={refreshKey} />
      </div>
    </div>
  );
}

export default ChatPage;
