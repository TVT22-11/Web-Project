import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import './SetReview.css';
import { jwtToken } from "../Login/signals";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useUser } from "../User/UserContext";


export function SetReviews({ movieTitle }){
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const { accountID, isLoggedIn } = useUser();
  const { id } = useParams();
  const [reviewSend, setReviewSend] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

    const handleRating = (rate) => {
        setRating(rate);
      };
    
      const handleReset = () => {

        console.log("Reset:", reviewText);
        console.log("Reset:", rating);
        setRating(0);
        setReviewText("");
      };
    
      const handleReviewText = (event) => {
        setReviewText(event.target.value);
      };  
      
      const handleSubmit = async () => {
       
        const reviewData = {
          id_account:  accountID ,
          stars: rating,
          comment: reviewText,
          movie_id:  id ,
          movie_name: movieTitle ,
      };
      
      console.log('reviewdata: ',reviewData); // Testausta varten...

        try {
            const response = await axios.post(`http://localhost:3001/review/post`,reviewData,
                {
                  headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                  },
                    
                 
                }
              );
              if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = response.data;
            console.log('Submitted:', reviewData);
            setReviews([...reviews, data]);
            setSubmitMessage('Review submitted successfully!');
            setReviewSend(true);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    useEffect(() => {
      let timeoutId;
        if (reviewSend) {
          timeoutId = setTimeout(() => {
            window.location.reload(true);
          }, 1500);
        }
        return () => {
          
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
    }, [reviewSend]); 

        


    return (
      <div className="Review-container">
          <h2>Create review:</h2>
          {!isLoggedIn && <p>Sign in to create reviews</p>}
      {isLoggedIn && (
          <Form>
              <FormGroup>
                
                  <Label for="exampleText">Overall rating</Label>
                  <div>
                      <Rating
                          onClick={handleRating}
                          initialValue={rating.rate}
                          size={24}
                      />
                  </div>
              </FormGroup>
              <FormGroup>
                  <Label for="reviewText">Leave your review here</Label>
                  <Input
                      type="textarea"
                      name="reviewText"
                      id="reviewText"
                      onChange={handleReviewText}
                      value={reviewText}
                  />
              </FormGroup>
              {submitMessage && <p>{submitMessage}</p>}
              <Button color="info" onClick={handleSubmit}>
                  Submit
              </Button>
              <Button onClick={handleReset}>Reset</Button>
          </Form>
       )} </div>
  );
}
export default SetReviews;