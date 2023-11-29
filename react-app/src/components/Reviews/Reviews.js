// Reviews.js
import React, { useState,useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { Container} from 'react-bootstrap';
import './Reviews.css';
import { useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiImageBaseUrl= process.env.REACT_APP_IMDB_IMAGE_API_URL;
const token = process.env.JWT_SECRET_KEY;
const movieReviewsUrl= process.env.RACT_APP_IMDB_MOVIE_REVIEWS_URL;


    export function Reviews(){
        
        const {id} = useParams();
        const [movie, setMovie] = useState();
        const [isReviewAdded, setIsReviewAdded] = useState(false);
        const [review, setReview] = useState([]);
        const [rating, setRating] = useState(0);

        const handleRating = (rate: number) => {
          setRating(rate)  
        };
        const handleReset = () => {
          
          console.log("Reset:", review);
          setRating(0)
        };
      
        const handleReviewText = (event) => {
         
          setReview({text: event.target.value });
        };
      
        const handleSubmit = () => {
          
          console.log("Submitted:", review);
          
          setIsReviewAdded(true);
        };


        useEffect(() =>{
          const fetchReviews = async () =>{
            try{
              const response = await fetch( `${apiUrl}/movie/${id}/reviews`,
              {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  'Authorization': `Bearer ${apiKey}`,
                 
                }
              });

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json(
                
                {
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              setReview(data); 
            }
            catch (error) {
              console.error('Error fetching data:', error);
            }
            

          };


          fetchReviews();
        }, [id]);


    return (
        <div>
            <div className="Reviews-box">
              <Container>
                 <h2>Reviews</h2>
                
                  <div className="Review-Text">
                  <p>{review.text}</p>
                  </div>

                  <div className="Reviews">
                    <h3>Movie Reviews</h3>
                    <ul>
                      {review.map((result) => (
                        <li key={result.id}>
                          {result.author}
                          {result.content}
                          {result.updated_at}
                        </li>

                      ))}
                    </ul>
                  </div>
              </Container>
            </div>                      
            <div className="Review-container">
            <h2>Create review:</h2>
            <Form>
                <FormGroup>
                    <Label for="exampleText">Overall rating</Label>
                    <div>
                        <Rating
                            onClick={handleRating}
                            initialValue={rating}
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
                     />
                        
                </FormGroup>
                <Button color="info" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button onClick={handleReset}>Reset
                     </Button>
            </Form>
            </div>
        </div>
        )};
    

export default Reviews;