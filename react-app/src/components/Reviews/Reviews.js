// Reviews.js
import React, { useState,useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import SearchBar from '../Searchbar/searchbar';
import { Container} from 'react-bootstrap';
import './Reviews.css';

const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiImageBaseUrl= process.env.REACT_APP_IMDB_IMAGE_API_URL;
const token = process.env.JWT_SECRET_KEY;


    const Reviews = () => {
        
        const [isReviewAdded, setIsReviewAdded] = useState(false);
        const [review, setReview] = useState({ stars: 0 }); // Initialize as an object with stars property
        

        const handleRating = (newRating) => {
          // Implement logic for handling rating
          setReview({ ...review, stars: newRating });
        };
      
        const handleReviewText = (event) => {
          // Implement logic for handling review text
          setReview({ ...review, text: event.target.value });
        };
      
        const handleSubmit = () => {
          // Implement logic for handling form submission
          console.log("Submitted:", review);
          // Add logic to send the review data to the server
          setIsReviewAdded(true);
        };


        useEffect(() =>{
          const fetchData = async () =>{
            try{
              const response = await fetch( `${apiUrl}/movie/movie_id/reviews?language=en-US&page=1`,
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
              const data = await response.json();
              setReview(data.results.slice(0, 2)); 
            }
            catch (error) {
              console.error('Error fetching data:', error);
            }
            

          };


          fetchData();
        }, []);

    return (
        <div>
            <SearchBar />
            <div className="Reviews-box">
              <Container>
                 <h2>Reviews</h2>

                 {review.map((review) => (
          <li className='Movies-Box' key={review.id}>
              <img  src={`${apiImageBaseUrl}${review.avatar_path}`}
                style={{ maxWidth: '100%' }}
              alt={review.username}
              />

            <div className='Movies-Desc'>
              <h2>{review.author}</h2>
              <p>content:{review.content}</p>
              
            </div>
          </li>
        
          ))}
             

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
                            initialValue={review.stars}
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
            </Form>
            </div>
        </div>
        )};
    

export default Reviews;