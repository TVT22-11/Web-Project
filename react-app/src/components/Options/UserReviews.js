import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReadReview from '../Reviews/ReadReview';


function UserReviews () {
    const { id } = useParams();
    const [review, setReview] = useState(null);
  
    useEffect(() => {
      const fetchReview = async () => {
        try {
          const reviewResponse = await axios.get(
            `http://localhost:3001/review?movie_id=${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          setReview(reviewResponse.data);
  
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchReview();
    }, [id]);
  
    if (!review) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='Review-Container'>
        <h1>Review</h1>
        <h2>{review.title}</h2>
        <p>{review.review}</p>
        <ReadReview />
      </div>
    );
  }

  export default UserReviews;

