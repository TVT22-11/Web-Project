import React from 'react';
import CreatingPage from './CreatingPage';
import Groups from './Groups';
import { Routes, Route, Navigate } from 'react-router-dom';

function groupRoutes () {

return(

      <Routes>
        
        <Route path="/" element={<Navigate to="Groups" />} />
        <Route path="groups" element={<Groups/>} />
        <Route path="CreatingPage" element={<CreatingPage />} />

      </Routes>
    );  
    };

    export default groupRoutes