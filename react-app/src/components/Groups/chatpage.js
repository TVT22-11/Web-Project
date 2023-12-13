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
  const {id_party} = useParams();

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const id_party = params.get('id_party');
  
    console.log('Party ID from URL:', id_party);
  
    setIdPartyToDelete(id_party);
  }, []);

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
      const response = await axios.delete('http://localhost:3001/group/deleteMember', {
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
        <button onClick={handleAddUser}>Add Member</button>
        <button onClick={handleDeleteUser}>Delete Member</button>
      
    </div>
  );
}

export default ChatPage;
