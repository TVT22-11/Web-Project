import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReadReview.css";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

function ReadReview() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [username, setUsername] = useState({});
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [expandedComment, setExpandedComment] = useState(null);

  const handleReadMoreClick = (reviewId) => {
    setExpandedComment(reviewId);
  };

  const handleModalClose = () => {
    setExpandedComment(null);
  };
  
  useEffect(() => {
    const fetchReview = async () => {
      try {
        // Fetch reviews
        const reviewResponse = await axios.get(`/review?movie_id=${id}`);
        const reviewsData = reviewResponse.data.ReviewData;
       
        const totalStars = reviewsData.reduce((total, review) => total + review.stars, 0);
        const avgRating = (totalStars / reviewsData.length).toFixed(2);
        setAverageRating(avgRating)

        setUsername();
        setReviews(reviewsData || []);
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
        <div className="review-box-top-text">
        <h2>Reviews</h2>
        <p>Average Rating: {averageRating}</p>
        <Rating
                          initialValue={averageRating}
                          size={24}
                          readonly={true}
                          allowFraction={true}
                      />
        </div>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No current reviews.</p>
        ) : (
          <div>
            {reviews.map((review) => (
              <div key={review.id_review} className="individual-review">
                <p>User: {review.username}</p>
                <p>Rating: {review.stars}</p> <Rating
                          initialValue={review.stars}
                          size={24}
                          readonly={true}
                      />
                <p>Comment:</p>
                <p className="Comment-box">
                  {expandedComment === review.id_review
                    ? review.comment 
                    : `${review.comment.substring(0, 25)}`}
                  {review.comment.length > 25 && (
                    <div>
                    <span
                      className="read-more-link"
                      onClick={() => handleReadMoreClick(review.id_review)}
                    >
                      Read more
                    </span>
                    </div>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {expandedComment !== null && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <p>
              {reviews.find((review) => review.id_review === expandedComment)?.comment}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadReview;