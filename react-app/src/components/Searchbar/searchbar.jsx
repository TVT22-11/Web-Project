import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiImageBaseUrl = process.env.REACT_APP_IMDB_IMAGE_API_URL;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedType, setSelectedType] = useState('/search/movie');
  const [showResults, setShowResults] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const history = useNavigate();
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${apiUrl}/genre/movie/list`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSearch = async () => {
    const params = {
      query,
    };

    try {
      const response = await axios.get(`${apiUrl}${selectedType}`, {
        params,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      setSearchResults(response.data.results);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

 const handleResultClick = (movieId) => {
    history(`/movie/${movieId}`);
    history(`/series/${movieId}`);
    setShowResults(false);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };


 const handleGenreChange = (e) => {
  console.log(selectedGenre);
  setSelectedGenre(e.target.value);
 }


const getGenreNames = (genreIds) => {
  return genreIds
  .map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
  .filter(Boolean)
  .join(', ');
  
};


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
   
    <div className="Search-bar">
      <input
        onKeyUp={handleSearch}
        className="Search-Input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        
        
      />
      <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      <select value={selectedGenre} onChange={handleGenreChange}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
        
      ))}
    </select>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="/search/movie">All-Movies</option>
        <option value="/search/tv">TV-Series</option>
        <option value="/search/multi">Multi</option>
        <option value="/search/person">People</option>
      </select>


      {showResults && (
        
        <ul ref={searchResultsRef} className="Search-Results">
          {searchResults
      .filter(
        (result) =>
          selectedGenre === '' || result.genre_ids.includes(parseInt(selectedGenre, 10))
      )
          .map((result) => (
            <li className='search-result-container' key={result.id} onClick={() => handleResultClick(result.id)}>
                  {result.poster_path && (
                <img
                className='Movie-Image-SearchBar'
                  src={`${apiImageBaseUrl}${result.poster_path}`}
                  alt={result.title}
                />
              )}
            <div className='results-description-container'>
             <h1 className='result-title'>{result.title}{result.name}</h1> 
              <h2 className='result-release-date'>{result.release_date}</h2>
              
              </div>
            </li>
          ))}
        </ul>
      )}
      
    </div>

  );
};

export default SearchBar;
