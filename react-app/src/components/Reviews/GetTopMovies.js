import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetTopMovies.css';
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiImageBaseUrl= process.env.REACT_APP_IMDB_IMAGE_API_URL



const GetTopMovies = ({language, page}) => {
  const [movie, setMovie] = useState([]);
  const history = useNavigate();


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
  const movieClickHandler = (movieid) => {
history(`/movie/${movieid}`);
}
return (
  <div className='HomeMovie-Container'>
    {movie.map((movie) => (
      <li className='TopMovie-Box' key={movie.id} onClick={() => movieClickHandler(movie.id)}>
          <img
            src={`${apiImageBaseUrl}${movie.poster_path}`}
            className='Top-Movie-Image'
            alt={movie.title}
          />
          <div className='TopMovie-Desc'>
            <h2>{movie.title}</h2>
            <p className='movie-overview'>{movie.overview}</p>
            <p className='Topmovie-release-date'>{'Release date : '}{'\n'}{movie.release_date}</p>
          </div>
      </li>
    ))}
  </div>
);
};

export default GetTopMovies;