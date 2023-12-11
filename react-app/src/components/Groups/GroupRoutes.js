import React from 'react';
import CreatingPage from './creatingPage';
import ChatPage from './chatpage'
import Groups from './Groups';
import { Routes, Route, Navigate } from 'react-router-dom';

function groupRoutes () {

return(

      <Routes>
        
        <Route path="/" element={<Navigate to="Groups" />} />
        <Route path="groups" element={<Groups/>} />
        <Route path="CreatingPage" element={<CreatingPage />} />
        <Route path="/Groups/chatpage/:id_party" element={<ChatPage />} />

      </Routes>
    );  
    };

    export default groupRoutes