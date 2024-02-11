import React from "react";
import './MovieDetailsPage.css'; // Importujemy plik CSS dla naszego komponentu

const MovieDetailsPage = ({ movie }) => {
    const renderMovieDetails = () => {
        return movie.map((film) => (
            <div key={film.source}>
               
                    {film.source === "europix" && (
                        <>
                             <h1 className="movie-title">{film.info.title}</h1>
                            <img src={film.info.poster} alt={film.info.title} className="movie-poster" />
                            <p>Quality:<b>   {film.info.quality}</b></p>
                            <p>Year:<b>  {film.info.year}</b></p>
                            <h2>Watch here:</h2>
                            <a href={film.info.link}>europix</a>
                        </>
                    )}
                    {film.source === "rt" && (
                        <>
          
                            
                            {film.info.links.map((link, index) => (
                                <div key={index}>
                                    <a href={link[0]}>{link[1]}</a>
                                </div>
                            ))}

                    <div className="description-card">
                        <h3>Description:</h3>
                        <p> {film.info.description}</p>
                        </div>
                        </>
                    )}
                    {film.source === "ev" && (
                        <>
                            <a href={film.info.link}>ev</a>
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
