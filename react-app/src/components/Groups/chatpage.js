import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Home/News.css';
import { useUser } from '../User/UserContext';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_FINNKINO_API_URL;

function ChatPage() {
  const { accountID } = useUser();
  const navigate = useNavigate();
  const [idPartyToDelete, setIdPartyToDelete] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id_party } = useParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const partyIdFromURL = params.get('id_party');

    console.log('Party ID from URL:', partyIdFromURL);

    setIdPartyToDelete(partyIdFromURL);
    fetchMessages(partyIdFromURL);
  }, []);

  const fetchMessages = async (partyId) => {
    try {
      const response = await axios.get(`${apiUrl}/messages/${partyId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const postMessage = async () => {
    try {
      const response = await axios.post(`${apiUrl}/messages`, {
        id_account: accountID,
        id_party: id_party,
        message: newMessage,
      });

      console.log('Posted message:', newMessage);

      if (response.status === 200) {
        console.log('Successfully posted message');
        fetchMessages(id_party); // Refresh messages after posting
        setNewMessage(''); // Clear the message input
      } else {
        console.error('Failed to post message');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

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
      const response = await axios.delete(`${apiUrl}/group/deleteMember`, {
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
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={postMessage}>Send Message</button>

      <button onClick={handleAddUser}>Add Member</button>
      <button onClick={handleDeleteUser}>Delete Member</button>
    </div>
  );
}

export default ChatPage;
