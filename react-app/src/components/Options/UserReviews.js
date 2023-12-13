import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../User/UserContext';
import './UserReviews.css';

function UserReviews() {
  const { accountID } = useUser();
  const [reviews, setReviews] = useState({ ReviewData: [] });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewResponse = await axios.get(
          `http://localhost:3001/review?id_account=${accountID}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Fetched reviews:', reviewResponse.data);
        setReviews(reviewResponse.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [accountID]);

  const handleDeleteReview = async (idReview) => {
    try {
      await axios.delete(`http://localhost:3001/review/${idReview}`);
      setReviews((prevReviews) => {
        const reviewsArray = Array.isArray(prevReviews.ReviewData) ? prevReviews.ReviewData : [];
        return { ReviewData: reviewsArray.filter((review) => review.id_review !== idReview) };
      });
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  

  return (
    <div className='myreviews'>
      <h2>Your Reviews</h2>
      <ul>
        {reviews.ReviewData.map((review) => (
          <li key={review.id_review}>
            <div className='myreviewsbox'>
              <p>Movie: {review.movie_name}</p>
              <p>Rating: {review.stars}</p>
              <p>Comment: {review.comment}</p>
              <button onClick={() => handleDeleteReview(review.id_review)}>
                Delete Review
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserReviews;
