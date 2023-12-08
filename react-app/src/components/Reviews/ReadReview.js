import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReadReview.css";
import { useParams } from "react-router-dom";

function ReadReview() {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [user, setUser] = useState({});
    

    useEffect(() => {
        const fetchReview = async () => {
          try {
            const reviewResponse = await 
            axios.get(`http://localhost:3001/review?movie_id=${id}`);

            setReviews(reviewResponse.data.ReviewData);    

            const accountIds = reviewsResponse.data.ReviewData.map(review => review.id_account);
            
            const usernamesResponse = await axios.get(`http://localhost:3001/account/user`, {
          params: {
            id_account: accountIds.join(','), // Pass the account IDs as a query parameter
          },
        });

        // Assuming usernamesResponse.data is an array of username details, extract usernames
        const usernamesData = usernamesResponse.data.map(user => user.username);

        setUsernames(usernamesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

    return (
        <div>
        <div className="review-box">
          <h2>Reviews</h2>
          <ul>
          {reviews.map((review, index) => (
          <li key={review.id_review}>
            <p>ID: {review.id_review}</p>
            <p>Stars: {review.stars}</p>
            <p>Comment: {review.comment}</p>
            <p>User ID: {review.id_account}</p>
            {usernames[index] && <p>Username: {usernames[index]}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
        
    );
        
};

export default ReadReview;