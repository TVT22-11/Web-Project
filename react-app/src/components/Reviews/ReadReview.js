import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReadReview.css";
import { useParams } from "react-router-dom";

function ReadReview() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [username, setUsername] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        // Fetch reviews
        const reviewResponse = await axios.get(`http://localhost:3001/review?movie_id=${id}`);
        const reviewsData = reviewResponse.data.ReviewData;
        setReviews(reviewsData);
        
        // Update state with usernames
        setUsername();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  return (
    <div>
      <div className="review-box">
        <h2>Reviews</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No current reviews.</p>
        ) : (
          <div>
            {reviews.map((review) => (
              <div key={review.id_review} className="individual-review">
                <p>User: {review.username}</p>
                <p>Rating: {review.stars}</p>
                <p>Comment: {review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadReview;