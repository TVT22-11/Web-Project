import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../User/UserContext';

function UserReviews() {
    const { accountID } = useUser();
    const [reviews, setReviews] = useState([]);
  
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
          setReviews(reviewResponse.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchReviews();
    }, [accountID]);
  
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Your Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default UserReviews;