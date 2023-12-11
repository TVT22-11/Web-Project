import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReadReview.css";
import { useParams } from "react-router-dom";

function ReadReview() {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [usernames, setUsernames] = useState({});
    

    useEffect(() => {
        const fetchReview = async () => {
          try {
            // Fetch reviews
            const reviewResponse = await axios.get(`http://localhost:3001/review?movie_id=${id}`);
            const reviewsData = reviewResponse.data.ReviewData;
            setReviews(reviewsData);
        
            // Fetch usernames
            const accountIds = reviewsData.map(review => review.id_account);
            const usernamePromises = accountIds.map(async id_account => {
              try {
                const userResponse = await axios.get(`http://localhost:3001/account/personal`);
                console.log(`User Response Data for id_account ${id_account}:`, userResponse.data);
        
                const userData = userResponse.data;
                const username = userData.username;
                return { id_account, username };
              } catch (error) {
                console.error(`Error fetching username for id_account ${id_account}:`, error);
                return { id_account, username: null };
              }
            });
        
            const resolvedUsernames = await Promise.all(usernamePromises);
        
            const usernamesData = {};
            resolvedUsernames.forEach(({ id_account, username }) => {
              if (username !== null) {
                usernamesData[id_account] = username;
              } else {
                console.error('No username found for id_account:', id_account);
              }
            });
        
            // Update state with usernames
            setUsernames(usernamesData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
      
    fetchReview();
  }, [id]);

    return (
        <div>
        <div className="review-box">
          <h2>Reviews</h2>
          <ul>
          {reviews.map((review,index) => (
          <li key={review.id_review}>
            <p>ID: {review.id_review}</p>
            <p>Stars: {review.stars}</p>
            <p>Comment: {review.comment}</p>
            <p>User ID: {usernames[review.id_account]}</p>
              {usernames[review.id_account] && (
                <p>Username: {usernames[review.id_account]}</p>
              )}
              </li>
            ))}
          </ul>
        </div>
      </div>
        
    );
        
};

export default ReadReview;