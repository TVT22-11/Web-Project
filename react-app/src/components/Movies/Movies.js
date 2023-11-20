import React from 'react';
import './Movies.css';
import SearchBar from '../Searchbar/searchbar';

function Movies (){
  return (
    <div className="movie-container">
      <h1>Movies</h1>
      <div>
        <SearchBar/>
      </div>

      <div className="movie-box-container">
        <div className="movie-box movie-box1">Movie 1</div>
        <div className="movie-box movie-box2">Movie 2</div>
        <div className="movie-box movie-box3">Movie 3</div>
        <div className="movie-box movie-box4">Movie 4</div>
      </div>
    </div>
  );
};

export default Movies;