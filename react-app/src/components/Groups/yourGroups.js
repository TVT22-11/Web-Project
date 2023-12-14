import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../User/UserContext';
import { Link } from 'react-router-dom';

function YourGroups() {
  const [myGroups, setMyGroups] = useState([]);
  const { accountID } = useUser();
  const [allGroups, setAllGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const GroupsResponse = await axios.get('http://localhost:3001/group');
        const Groupsdata = GroupsResponse.data.GroupData;

        setAllGroups(Groupsdata);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/group/joined-groups?id_account=${accountID}`);
        const userGroupIds = response.data.Groups.map(group => group.id_party);

        const userGroups = allGroups.filter(group => userGroupIds.includes(group.id_party));
        setMyGroups(userGroups);
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchUserGroups();
  }, [accountID, allGroups]);

  
  const handleDeleteGroup = async (id_party, owner) => {
    console.log('ID Party to Delete:', id_party);
    console.log('ownerID', owner);
    if (!id_party) {
      console.error('No party selected for deletion');
      return;
    }
    if (owner !== accountID) {
      console.error('You do not have permission to delete this group.');
      return;
    }


    try {
      const response = await axios.delete('http://localhost:3001/group/deleteParty', {
        data: {
          id_party: id_party,
        },
      });
      console.log('deleted party id:', id_party);

      if (response.status === 200) {
        console.log('Successfully deleted group');
        window.location.reload();
      } else {
        console.error('Failed to delete group');
      }
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };


  const navigateToChatPage = (id_party) => {
     window.location.href = `/Groups/chatpage/${id_party}`;
  };
  
  return (
    <div className="your-groups-list">
      <h1>Joined Groups: </h1>
      {Array.isArray(myGroups) && myGroups.length > 0 ? (
        myGroups.map((group) => (
          <div key={group.id_party} className='your-group-box'>
            <p>{group.name}</p>
            <button onClick={() => navigateToChatPage(group.id_party)}>Go to Chat</button>
            {group.owner === accountID && ( // Only show delete button if the user is the owner
                    <button onClick={() => handleDeleteGroup(group.id_party, group.owner)}>Delete Group</button>
                  )}
          </div>
        ))
      ) : (
        <p>You have not joined any groups</p>
      )}
    </div>
  );
}

export default YourGroups;