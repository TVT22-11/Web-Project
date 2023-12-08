import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReadReview.css";
import { useParams } from "react-router-dom";

function ReadReview() {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        
    })

    return (
        <div>
        <div className="review-box">
          <h2>Review Data</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>User:</strong> {review.id_account}
                <br />
                <strong>Stars:</strong> {review.stars}
                <br />
                <strong>Comment:</strong> {review.comment}
                <br />
                {/* Add other data fields as needed */}
              </li>
            ))}
          </ul>
        </div>
      </div>
        
    );
        
};

export default ReadReview;