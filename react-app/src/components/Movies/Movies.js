import React,{ useState, useEffect } from 'react';
import './Movies.css';
import SearchBar from '../Searchbar/searchbar';
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiImageBaseUrl= process.env.REACT_APP_IMDB_IMAGE_API_URL


const Movies = ({language, page}) => {
  const [movie, setMovies] = useState([]);

useEffect(() =>{
  const fetchData = async () => {
    try {
      const response = await fetch( `${apiUrl}movie/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
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
      setMovies(data.results.slice(0, 4)); 
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
      <p>Avarage vote: {movie.vote_average}</p>
      <p>Vote count: {movie.vote_count}</p>
      </div>
      </li>
      
        ))}
    </div>
  );
};

export default Movies;