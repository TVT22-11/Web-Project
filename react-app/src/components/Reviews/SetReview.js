import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import './SetReview.css';
import { jwtToken } from "../Login/signals";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useUser } from "../User/UserContext";

export function SetReviews(){
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [state, setState] = useState({});
    const {idAccount} = useUser();
    const { id } = useParams();
    console.log('account_id:', idAccount);

    const handleRating = (rate) => {
        setRating(rate);
      };
    
      const handleReset = () => {
        console.log("Reset:", reviewText);
        setRating(0);
      };
    
      const handleReviewText = (event) => {
        setReviewText(event.target.value);
      };  
      
      const handleSubmit = async () => {
       
        const reviewData = {
            id_account: {idAccount},
            stars: state.stars,
            comment: state.comment,
            movie_id: {id}
        };
        try {
            const response = await axios.post(`http://localhost:3001/review/post`,reviewData,
                {
                  headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                  },
                    
                 
                }
              );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            

          }
    
          const data = await response.json();
    
          console.log("Submitted:", reviewData);
          setReviews([...reviews, reviewData]); 
        } catch (error) {
          console.error('Error submitting review:', error);
        }
      };

return(
<div className="Review-container">
        <h2>Create review:</h2>
        <Form>
          <FormGroup>
            <Label for="exampleText">Overall rating</Label>
            <div>
              <Rating
                onClick={handleRating}
                initialValue={rating.state}
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
              comment="comment"
              onChange={handleReviewText}
              value={state.comment}
              
            />
          </FormGroup>
          <Button color="info" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Form>
      </div>
    );
};

export default SetReviews;