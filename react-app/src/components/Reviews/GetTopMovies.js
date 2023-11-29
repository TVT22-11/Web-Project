import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GetTopMovies.css';
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiImageBaseUrl= process.env.REACT_APP_IMDB_IMAGE_API_URL



const GetTopMovies = ({language, page}) => {
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
      
      setMovie(data.results.slice(0, 3));  // Näyttää vain 3 TOP elokuvista.

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
  
return (
  <div className='Movie-Container'>
    {movie.map((movie) => (
      <li className='Movie-Box' key={movie.id}>
        <Link to={`/movie/${movie.id}`} className='Movie-Link'>
          <img
            src={`${apiImageBaseUrl}${movie.poster_path}`}
            className='Movie-Image'
            alt={movie.title}
          />
          <div className='Movie-Desc'>
            <p>Rating: TBA</p>
            <h2>{movie.title}</h2>
            <p className='movie-overview'>{movie.overview}</p>
            <p className='movie-release-date'>{'Release date : '}{'\n'}{movie.release_date}</p>
          </div>
        </Link>
      </li>
    ))}
  </div>
);
};

export default GetTopMovies;