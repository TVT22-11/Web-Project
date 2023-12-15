import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Home/News.css';
import { useUser } from '../User/UserContext';
import axios from 'axios';
import Getchats from './Getchats';

function ChatPage() {
  const { accountID } = useUser();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const { id_party } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupData, setGroupData] = useState(null);

  const fetchGroupData = async () => {
    try {
      const response = await axios.get(`/group`);
      if (Array.isArray(response.data.GroupData)) {
        setGroupData(response.data.GroupData.find(group => group.id_party === Number(id_party)));
      } else {
        console.error('Invalid data format for group data:', response.data.GroupData);
      }
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };

  const fetchGroupMembers = async () => {
    try {
      const response = await axios.get(`/group/fetch-group-members?id_party=${id_party}`);
      if (Array.isArray(response.data.members)) {
        const members = await Promise.all(
          response.data.members.map(async (member) => {
            const usernameResponse = await axios.get(`/account/user?id_account=${member.id_account}`);
            return {
              id_account: member.id_account,
              username: usernameResponse.data[0].username,
            };
          })
        );
        setGroupMembers(members);
      } else {
        console.error('Invalid data format for group members:', response.data.members);
      }
    } catch (error) {
      console.error('Error fetching group members:', error);
    }
  };

  const postMessage = async () => {
    try {
      console.log('id ACCOUNT :', accountID);
      const response = await axios.post(`/group/send-message`, {
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
        const response = await axios.get(`/group/fetch-messages?id_party=${id_party}`);
        if (Array.isArray(response.data.messages)) {
          setRefreshKey((prevKey) => prevKey + 1);
        } else {
          console.error('Invalid data format for messages:', response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchGroupData();
    fetchMessages();
    fetchGroupMembers();
  }, [id_party]);


  const handleRemoveUser = async (id_account) => {
    try {
      if (!groupData || groupData.owner !== accountID) {
        console.error('You are not the owner of this group. Cannot remove user.');
        return;
      }

      const response = await axios.delete(`/group/deleteMember`, {
        data: {
          id_account,
          id_party: id_party,
        },
      });

      console.log('Removed account:', id_account);
      console.log('Removed from id party:', id_party);

      if (response.status === 200) {
        console.log('Successfully removed member');
        // Update the group members after removing a member
        fetchGroupMembers();
      } else {
        console.error('Failed to remove member');
      }
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };


  const handleDeleteUser = async () => {
    console.log('ID Party to Delete:', id_party);
    if (!id_party) {
      console.error('No party selected for deletion');
      return;
    }

    try {
      const response = await axios.delete(`/group/deleteMember`, {
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
    <div className='chatpage-container'>

      <input
        className='chat-page-text-input'
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            postMessage();
          }
        }}
        placeholder="Type your message..."
      />
      <div className='chat-page-buttons'>
      <button onClick={postMessage}>Send Message</button>
      </div>
          <div className='group-members'>
        <h2>Group Members:</h2>
        <ul>
          {groupMembers.map((member) => (
            <li key={member.id_account}>
              {`${member.username} `}
              {groupData && groupData.owner === accountID && member.id_account !== accountID && (
                <button onClick={() => handleRemoveUser(member.id_account)}>Remove User</button>
              )}
            </li>
          ))}
        </ul>
        <button onClick={handleDeleteUser}>Leave Group</button>
      </div>
      <div>
        <Getchats key={refreshKey} />
      </div>
    </div>
  );
}

export default ChatPage;
