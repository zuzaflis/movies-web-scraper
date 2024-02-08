import React, { useState } from "react";
import axios from "axios";
import MoviesList from './components/MoviesList'
import "./app.css";

const URL = "http://127.0.0.1:5000"

function App() {
  const [newSearchMovie, setNewSearchMovie] = useState("");
  const [movie_info, setMovieInfo] = useState("")

    const handleNewSearchChange = (event) => {
        setNewSearchMovie(event.target.value);
    }


   const handleNewSearchSubmit = async (event) =>{
       event.preventDefault();
       try{
           const response = await axios.get(
           `${URL}/search?movie_name=${newSearchMovie}`
           );

         const data = response.data;
         setMovieInfo(data);
         console.log(movie_info)
        } catch(error) {
        console.error("Error fetching")
        }
   }

  return (
    <div>
        <h1>Movie Search</h1>
        <form className = "submit-form" onSubmit={handleNewSearchSubmit}>
        <input
            type="text"
            value ={newSearchMovie}
            onChange = {handleNewSearchChange}
            placeholder="Enter movie name"
         />

        <button type="submit">Search</button>

        </form>

     <MoviesList 
     movie_info = {movie_info}
     onSearchClick = {handleNewSearchChange}
     />
    </div>
  );
}


export default App;
