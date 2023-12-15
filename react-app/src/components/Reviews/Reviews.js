import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Reviews.css";
import EnhancedNews from "../Reviews/EnhancedNews";
import ShareLink from "./ShareLink";

export function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [sortByDropdownVisible, setSortByDropdownVisible] = useState(false);
  const [sorting, setSorting] = useState('newest'); // Default sorting for reviews
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = `${window.location.origin}${location.pathname}${location.search}`;

  const sortingRef = useRef(sorting);
  const filtersRef = useRef(filters);
  const linkFieldRef = useRef(null);

  useEffect(() => {
    sortingRef.current = sorting;
    filtersRef.current = filters;
  }, [sorting, filters]);

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(`/review/all`);
      const data = response.data.ReviewData;
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const extractedFilters = Object.fromEntries(urlSearchParams.entries());
    const extractedSorting = extractedFilters.sorting || 'newest';

    setSorting(extractedSorting);
    setFilters(extractedFilters);
  }, [location.search]);

  const readMoreHandler = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSortingReviews = (type) => {
    let sortedReviews = [...reviews];

    switch (type) {
      case 'newest':
        sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        sortedReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'best':
        sortedReviews.sort((a, b) => b.stars - a.stars);
        break;
      case 'worst':
        sortedReviews.sort((a, b) => a.stars - b.stars);
        break;
      default:
        break;
    }

    setReviews([...sortedReviews]);
    setSortByDropdownVisible(false);

    // Update URL with sorting parameter
    updateURL({ sorting: type });
  };

  const handleFiltering = (criteria) => {
    setFilters(criteria);
    updateURL(criteria);
  };

  const updateURL = (criteria) => {
    const queryParams = new URLSearchParams({ ...filters, ...criteria });
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  const handleLinkCopy = () => {
    if (linkFieldRef.current) {
      const queryParams = new URLSearchParams({ sorting: sortingRef.current, ...filtersRef.current });
      const currentURL = `${window.location.origin}${location.pathname}?${queryParams.toString()}`;
      linkFieldRef.current.value = currentURL;

      navigator.clipboard.writeText(currentURL).then(() => {
        // Handle success or provide feedback to the user
      }).catch((error) => {
        console.error('Error copying link to clipboard:', error);
      });
    }
  };

  return (
    <div className='Reviews-box' style={{ display: 'flex' }}>
      <Container style={{ display: 'flex', flex: '30%' }}>
        <div className='Reviews'>
          <h3>All Movie Reviews</h3>
          <div className='sorting-buttons'>
            <div className='sorting-button' onClick={() => setSortByDropdownVisible(!sortByDropdownVisible)}>
              Sort By
              {sortByDropdownVisible && (
                <div className='dropdown-menu'>
                  <div className='dropdown-title'>Sort By</div>
                  <div className='dropdown-item' onClick={() => handleSortingReviews('newest')}>Newest</div>
                  <div className='dropdown-item' onClick={() => handleSortingReviews('oldest')}>Oldest</div>
                  <div className='dropdown-item' onClick={() => handleSortingReviews('best')}>Top-rated</div>
                  <div className='dropdown-item' onClick={() => handleSortingReviews('worst')}>Worst-rated</div>
                </div>
              )}
            </div>
            <div className='link-field-container'>
              <input type='text' id='linkField' readOnly ref={linkFieldRef} />
              <button className='sorting-button' onClick={handleLinkCopy}>
                Copy Link
              </button>
              </div>
          </div>
          <ul>
            {reviews.map((result) => (
              <li key={result.id_review}>
                <div className='AllReviewbox'>
                  <p>Author: {result.username}</p>
                  <p>Movie: {result.movie_name}</p>
                  <p>Rating: {result.stars}</p>
                  <p>Comment: {result.comment}</p>
                  <button onClick={() => readMoreHandler(result.movie_id)} className='read-more-btn'>
                    Read More
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div style={{ flex: '70%' }}>
        <EnhancedNews
          area='your_area'
          categoryID='your_categoryID'
          eventID='your_eventID'
          sorting={sorting}
          onFiltering={handleFiltering}
        />
      </div>
    </div>
  );
}

export default Reviews;