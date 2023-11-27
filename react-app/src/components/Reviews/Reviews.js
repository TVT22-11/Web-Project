import React, { useState,useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import SearchBar from '../Searchbar/searchbar';
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiImageBaseUrl= process.env.REACT_APP_IMDB_IMAGE_API_URL;
const token = process.env.JWT_SECRET_KEY;


    const Reviews = () => {
        const [movie, setMovies] = useState([]);
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
  const fetchData = async () => {
    try {
      const response = await fetch( `${apiUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
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
      setMovies(data.results.slice(0, 25)); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};
fetchData();
}, []);

    return <div className="Review-box">
        {isReviewAdded || !token ? null :(
        <div>
            <SearchBar />
            
            <div className='Movies-Container' >
                {movie.map((movie) => (
                <li className='Movies-Box' key={movie.id}>
                    <img  src={`${apiImageBaseUrl}${movie.poster_path}`}
                        style={{ maxWidth: '100%' }}
                    alt={movie.title}
                    />

                    <div className='Movies-Desc'>
                    <h2>{movie.title}</h2>
                    <p>Release:{movie.release_date}</p>
                    <p>Avarage vote: {movie.vote_average}</p>
                    <p>Vote count: {movie.vote_count}</p>
                    </div>
                </li>
                
                ))}
            </div>
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
        )}
    </div>;
};
export default Reviews;