// Reviews.js
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Reviews.css";

export function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [sortByDropdownVisible, setSortByDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/review/all`);
      const data = response.data;
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const readMoreHandler = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleSorting = (type) => {
    let sortedReviews = [...reviews];

    switch (type) {
      case "newest":
        sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        sortedReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "best":
        sortedReviews.sort((a, b) => b.stars - a.stars);
        break;
      case "worst":
        sortedReviews.sort((a, b) => a.stars - b.stars);
        break;
      default:
        break;
    }

    setReviews(sortedReviews);
    setSortByDropdownVisible(false);
  };

  return (
    <div>
      <div className="Reviews-box">
        <Container>
          <div className="Reviews">
            <h3>All Movie Reviews</h3>
            <div className="sorting-buttons">
              <div className="sorting-button" onClick={() => setSortByDropdownVisible(!sortByDropdownVisible)}>
                Sort By
                {sortByDropdownVisible && (
                  <div className="dropdown-menu">
                    <div className="dropdown-title">Sort By</div>
                    <div className="dropdown-item" onClick={() => handleSorting("newest")}>Newest</div>
                    <div className="dropdown-item" onClick={() => handleSorting("oldest")}>Oldest</div>
                    <div className="dropdown-item" onClick={() => handleSorting("best")}>Best</div>
                    <div className="dropdown-item" onClick={() => handleSorting("worst")}>Worst</div>
                  </div>
                )}
              </div>
            </div>
            <ul>
              {reviews.map((result) => (
                <li key={result.id_review}>
                  <div className="AllReviewbox">
                    <p>Author: {result.username}</p>
                    <p>Movie: {result.movie_name}</p>
                    <p>Rating: {result.stars}</p>
                    <p>Comment: {result.comment}</p>
                    <button
                      onClick={() => readMoreHandler(result.movie_id)}
                      className="read-more-btn"
                    >
                      Read More
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Reviews;
