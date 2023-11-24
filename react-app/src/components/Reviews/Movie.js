import React, { useState, useEffect } from 'react';
import './Movie.css';
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiImageBaseUrl= process.env.REACT_APP_IMDB_IMAGE_API_URL



const Movie = ({language, page}) => {
  const [movie, setMovie] = useState([]);

useEffect(() =>{
  const fetchData = async () => {
    try {
      const response = await fetch( `${apiUrl}movie/top_rated?language=en-US&page=1`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMovie(data.results.slice(0, 3)); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
  
  return (
    <div className='Movie-Container' >
      {movie.map((movie) => (
          <li className='Movie-Box' key={movie.id}>
      <img  src={`${apiImageBaseUrl}${movie.poster_path}`}
            style={{ maxWidth: '80%' }}/>

      <div className='Movie-Desc'>
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      </div>
      </li>
      
        ))}
    </div>
  );
}
export default Movie;