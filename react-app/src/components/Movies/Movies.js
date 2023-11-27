import React,{ useState, useEffect } from 'react';
import './Movies.css';
import Searchbar from '../Searchbar/searchbar';
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiImageBaseUrl= process.env.REACT_APP_IMDB_IMAGE_API_URL


const Movies = ({language, page}) => {
  const [movie, setMovies] = useState([]);

useEffect(() =>{
  const fetchData = async () => {
    try {
      const response = await fetch( `${apiUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        }
        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.results.slice(0, 25)); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
  
  return (
    <div>

        <Searchbar />

      <div className='Movies-Container' >
          {movie.map((movie) => (
          <li className='Movies-Box' key={movie.id}>
              <img  src={`${apiImageBaseUrl}${movie.poster_path}`}
                style={{ maxWidth: '100%' }}
              alt={movie.title}
              />

            <div className='Movies-Desc'>
              <h2>{movie.title}</h2>
              <p>Release:{movie.release_date}</p>
              <p>Avarage vote: {movie.vote_average}</p>
              <p>Vote count: {movie.vote_count}</p>
            </div>
          </li>
        
          ))}
      </div>

    </div>
    
  );
};

export default Movies;