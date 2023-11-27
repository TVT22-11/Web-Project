import React from 'react';
import GetTop from '../Reviews/GetTopMovies'
import './MovieBox.css';

function MovieBox(){
    return(
        <div className="movie-box-container">
        <GetTop />
        </div>
        );
    };
    
    export default MovieBox;