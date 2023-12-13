import React from 'react';
import CreatingPage from './creatingPage';
import Groups from './Groups';
import { Routes, Route, Navigate } from 'react-router-dom';

function GroupRoutes() {

return(

      <Routes>
        
        <Route path="/" element={<Navigate to="Groups" />} />
        <Route path="Groups/*" element={<Groups />} />
        <Route path="CreatingPage" element={<CreatingPage />} />
      </Routes>
    );  
    };

    export default GroupRoutes