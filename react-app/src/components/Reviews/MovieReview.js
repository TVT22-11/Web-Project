import React from 'react';
import './MovieReview.css';


const MovieReview = ({ title, review }) => {

    return (
      <div className='Movie-box' >
    <img src='' ></img>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Source: {source}</p>
      </div>
    );
  };

  export default MovieReview;