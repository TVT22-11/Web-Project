// MovieDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';
import ReadReview from '../Reviews/ReadReview';
import SetReview from '../Reviews/SetReview';


const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiImageBaseUrl = process.env.REACT_APP_IMDB_IMAGE_API_URL;
const movieCreditsUrl = process.env.REACT_APP_IMDB_MOVIE_CREDITS_URL;

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `${apiUrl}/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(
          movieCreditsUrl.replace('{movie_id}', id),
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie || !credits) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Movie-Container'>
      <img
        src={`${apiImageBaseUrl}${movie.poster_path}`}
        className='Movie-Image'
        alt={movie.title}
      />
      <div className="Movie-Text">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
      <div className='Movie-Info'>
        <h2>Movie Credits</h2>
        <ul>
          {credits.cast.map((actor) => (
            <li key={actor.id}>{actor.name} as {actor.character}</li>
          ))}
        </ul>
        
      </div>
      <ReadReview />
      <SetReview/>
    </div>
  );
}

export default MovieDetail;
