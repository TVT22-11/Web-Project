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
  const [showResults, setShowResults] = useState(false);
  const history = useNavigate();
  const searchResultsRef = useRef(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSearch = async () => {
    const searchResults = await axios.get(
      `${apiUrl}/search/movie?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    setSearchResults(searchResults.data.results);
    setShowResults(true);
  };

  const handleResultClick = (movieId) => {
    history(`/movie/${movieId}`);
    setShowResults(false);
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

      {showResults && (
        <ul ref={searchResultsRef} className="Search-Results">
          {searchResults.map((result) => (
            <li className='search-result-container' key={result.id} onClick={() => handleResultClick(result.id)}>
              <img src={`${apiImageBaseUrl}${result.poster_path}`}
              
            className='Movie-Image-SearchBar'
            alt={result.title}
            />
            <div className='results-description-container'>
             <h1 className='result-title'>{result.title}</h1> 
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
