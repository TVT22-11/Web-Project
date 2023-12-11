import React from 'react';
import './Home.css';
import News from './News';
import Searchbar from '../Searchbar/searchbar';
import MovieBox from '../Movies/MovieBox';
import {useUser} from '../User/UserContext';

function Home() {
  
  const { username } = useUser();
 
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