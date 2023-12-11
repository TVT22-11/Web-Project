import React, { useEffect, useState } from 'react';
import './Home.css';
import News from './News';
import Searchbar from '../Searchbar/searchbar';
import MovieBox from '../Movies/MovieBox';


function Home() {
  
  const [username, setUsername] = useState('');
  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUsername(decodedToken.username);
    }
  }, []);
 
    return (
        <div className='Home-container'>
        {username && <p className='Welcome-Message'>Welcome, {username}!</p>}
          <News />
          <Searchbar />
          <div>
            <h2 className='Top-Movie'>TOP 3 MOVIES</h2>
          <MovieBox />
          </div>
        </div>
      );
  }
export default Home;