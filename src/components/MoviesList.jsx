import React from 'react';
import "./MovieList.css";

function MoviesList({movie_info, onSearchClick }){
    if (!Array.isArray(movie_info)) {
        return <div>No movies found</div>;
      }
    return(
        <div className="movie-container">
        {movie_info.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <div>
              <h3>{movie.title}</h3>
              <p>Year: {movie.year}</p>
              <p>Duration: {movie.duration}</p>
              <p>Quality: {movie.quality}</p>
              <a href={movie.link}>Watch Now</a>
            </div>
          </div>
        ))}
      </div>
    );
}

export default MoviesList;