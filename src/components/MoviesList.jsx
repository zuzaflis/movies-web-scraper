import React, { useState } from 'react';
import "./MovieList.css";
import ModalComponent from './Modal';
import MovieDetailsPage from './MovieDetailsPage';
import { Grid, CardContent} from "@mui/material";


function MoviesList({movie_info, onSearchClick }){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({});

    const openModal = (movie) => {
      setCurrentMovie(movie);
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setIsModalOpen(false);
    }



    return (
      <Grid container spacing={1}>
        {Object.keys(movie_info).map((title) => (
          movie_info[title].filter((movie) => movie.source === "europix").map((movie) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={title}>
                <CardContent>
                  <div className="movie-card" onClick={() => openModal(movie_info[title])}>
                  <h3 style={{ textAlign: 'center' , marginTop: '10px', marginBottom: '10px'}}>{title}</h3>
                    <div className="poster-container" key={movie.source}>
                      <img src={movie.info.poster} alt={movie.info.title} />
                      <p><b>{movie.info.year}</b>,  {movie.info.quality}</p>
                    </div>
                  </div>
                </CardContent>
            </Grid>
          ))
        ))}
        <ModalComponent
          isOpen={isModalOpen}
          closeModal={closeModal}
          content={<MovieDetailsPage movie={currentMovie}/>}
        />
      </Grid>
    );
}

export default MoviesList;