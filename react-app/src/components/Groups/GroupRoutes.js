import React from 'react';
import CreatingPage from './creatingPage';
import Groups from './Groups';
import { Routes, Route, Navigate } from 'react-router-dom';

function groupRoutes () {

return(

<Routes>
<Route path="/" element={<Navigate to="Groups" />} />
        <Route path="CreatingPage" element={<CreatingPage />} />
        <Route path="groups" element={<Groups/>} />
      </Routes>
    );  
    };

    export default groupRoutes