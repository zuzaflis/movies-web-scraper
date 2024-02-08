import React from "react";

const MovieDetailsPage =({movie}) => {
    
    return(
        <div>
            {/* <h2>{movie.info.title}</h2>
            <img src={movie.info.poster} alt={movie.info.title} />
            <p>Quality: {movie.info.quality}</p>
            <p>Info: {movie.info.info}</p>
            <p>{movie.info.description}</p> */}
            <p>{JSON.stringify(movie)}</p>

            {/* <div className = "platforms-links-container">
                {movie[2].links.map((link, index) =>
                <div key = {index}>
                    <a href ={link[0]}>{link[1]}</a>
                </div>
                )}
            </div> */}
        </div>
    );
};

export default MovieDetailsPage;