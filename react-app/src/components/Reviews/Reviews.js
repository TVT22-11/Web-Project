// Reviews.js
import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { Container } from 'react-bootstrap';
import './Reviews.css';
import { useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;

const movieReviewsUrl = process.env.REACT_APP_IMDB_MOVIE_REVIEWS_URL;

export function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [state, setState] = useState({
    id_account: "",
    stars: "",
    comment: "",
    movie_id: ""
  });

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
  const reviewData = {
    id_account: state.id_account,
    stars: state.stars,
    comment: state.comment,
    movie_id: state.movie_id
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5432/review/post`, {
        method: 'POST', 
        headers: {
          //'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          rating: rating,
          text: reviewText,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Submitted:", data);
      setReviews([...reviews, data]); 
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  /*const fetchReviews = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      };

      const response = await fetch(`${apiUrl}movie/${id}/reviews?`,);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setReviews(data.results); 

    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);
  */

  return (
    <div>
      <div className="Reviews-box">
        <Container>
          <h2>Reviews</h2>
          <div className="Reviews">
            <h3>Movie Reviews</h3>
            <ul>
              {reviews.map((result) => (
                <li key={result.id}>
                  <p>Author: {result.author}</p>
                  <p>Content: {result.content}</p>
                  <p>Updated at: {result.updated_at}</p>
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
              comment="comment"
              onChange={handleReviewText}
            />
          </FormGroup>
          <Button color="info" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Form>
      </div>
    </div>
  );
}

export default Reviews;