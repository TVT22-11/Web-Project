import React from 'react';
import CreatingPage from './creatingPage';
import Groups from './Groups';
import ChatPage from './chatpage';
import { Routes, Route, Navigate } from 'react-router-dom';

function GroupRoutes() {

return(

      <Routes>
        
        <Route path="/" element={<Navigate to="Groups" />} />
        <Route path="Groups/*" element={<Groups />} />
        <Route path="CreatingPage" element={<CreatingPage />} />
        <Route path="chatpage/:id_party" element={<ChatPage />} />
      </Routes>
    );  
    };

    export default GroupRoutes