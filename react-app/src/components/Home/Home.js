import React from 'react';
import './Home.css';
import News from './News';
import Searchbar from '../Searchbar/searchbar';


function Home() {
    return (
        <div>
          <News />
          <Searchbar />
        </div>
      );
  }
export default Home;