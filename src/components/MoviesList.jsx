import React, { useState } from 'react';
import "./MovieList.css";
import ModalComponent from './Modal';
import MovieDetailsPage from './MovieDetailsPage';


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




    return(
      <div className="movie-container">
      {Object.keys(movie_info).map((title) => (
        movie_info[title].filter((movie) => movie.source === "europix").map((movie) => (
          <div className="movie-card" key={title} onClick={() => openModal(movie_info[title])}>
            <h3>{title}</h3>
            <div key={movie.source}>
              <img src={movie.info.poster} alt={movie.info.title} />
              <h4>{movie.info.year}</h4>
              <p>{movie.info.quality}</p>
            </div>
          </div>
        ))
      ))}


       <ModalComponent
       isOpen={isModalOpen}
       closeModal={closeModal}
       content={<MovieDetailsPage movie={currentMovie}/>}
       />

      </div>
    );
}

export default MoviesList;