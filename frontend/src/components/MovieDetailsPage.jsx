import React from "react";
import './MovieDetailsPage.css'; 

const MovieDetailsPage = ({ movie }) => {
    const renderMovieDetails = () => {
        return movie.map((film) => (
            <div key={film.source}>
               
                    {film.source === "europix" && (
                        <>
                            <img src={film.info.poster} alt={film.info.title} className="movie-poster" />
                            <h1 className="movie-title">{film.info.title}</h1>
                            <div className="movie-info">
                            <p>Quality:<b>   {film.info.quality}</b></p>
                            <p>Year:<b>  {film.info.year}</b></p>
                            </div>
                            <div className="watch-box">
                            <h2>Watch here:</h2>
                            <a href={film.info.link}>europix - for free</a>
                            </div>
                        </>
                    )}
                    {film.source === "rt" && (
                        <>
          
                            <div className="watch-box">
                            {film.info.links.map((link, index) => (
                                <div key={index}>
                                    <a href={link[0]}>{link[1]}</a>
                                </div>
                            ))}
                            </div>

                    <div className="description-card">
                        <h3>Description:</h3>
                        <p> {film.info.description}</p>
                        </div>
                        </>
                    )}
                    {film.source === "ev" && (
                        <>
                           <div className="watch-box">
                            <a href={film.info.link}>ev - for free </a>
                            </div>
                        </>
                    )}
                </div>
            
        ));
    };

    return (
        <div className="movie-details-container">
            {renderMovieDetails()}
        </div>
    );
};

export default MovieDetailsPage;
