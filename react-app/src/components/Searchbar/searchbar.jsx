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
  const history = useNavigate();
  const searchResultsRef = useRef(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSearch = async () => {
    const params = {
      query,
    };

    const searchResults = await axios.get(`${apiUrl}${selectedType}`, {
      params,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    setSearchResults(searchResults.data.results);
    setShowResults(true);
  };

 const handleResultClick = (movieId) => {
    history(`/movie/${movieId}`);
    setShowResults(false);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOutside = (e) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
      setShowResults(false);
    }
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
        className="Search-Input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      <select value={selectedType} onChange={handleTypeChange}>
        <option value="/search/movie">All-Movies</option>
        <option value="/search/tv">TV-Series</option>
        <option value="/search/multi">Multi</option>
        <option value="/search/person">People</option>

      </select>

      {showResults && (
        <ul ref={searchResultsRef} className="Search-Results">
          {searchResults.map((result) => (
            <li className='search-result-container' key={result.id} onClick={() => handleResultClick(result.id)}>
                  {result.poster_path && (
                <img
                className='Movie-Image-SearchBar'
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
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
