import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SeriesDetail.css';
import ReadReview from '../Reviews/ReadReview';
import SetReview from '../Reviews/SetReview';

const apiKey = process.env.REACT_APP_IMDB_API_BEARER_TOKEN;
const apiUrl = process.env.REACT_APP_IMDB_API_URL;
const apiImageBaseUrl = process.env.REACT_APP_IMDB_IMAGE_API_URL;
const seriesCreditsUrl = process.env.REACT_APP_IMDB_SERIES_CREDITS_URL;

function SeriesDetail() {
  const { id } = useParams();
  console.log('Series ID:', id); 
  const [series, setSeries] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    console.log('Series ID:', id); 
    const fetchSeriesDetails = async () => {
      try {
        const seriesResponse = await axios.get(
          `${apiUrl}/tv/${id}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setSeries(seriesResponse.data);

        const creditsResponse = await axios.get(
          seriesCreditsUrl.replace('{series_id}', id),
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

    fetchSeriesDetails();
  }, [id]);

  if (!series || !credits) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Series-Container'>
      <img
        src={`${apiImageBaseUrl}${series.poster_path}`}
        className='Series-Image'
        alt={series.name}
      />
      <div className="Series-Text">
        <h1>{series.name}</h1>
        <p>{series.overview}</p>
      </div>
      <div className='Series-Info'>
        <h2>Series Credits</h2>
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

export default SeriesDetail;
