import React, { useState } from "react";
import axios from "axios";
import MoviesList from './components/MoviesList'
import { TextField, Button, Typography, Grid} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CircularIndeterminate from "./components/CircularIndeterminate";

const URL = "http://127.0.0.1:5000"

function App() {
  const [newSearchMovie, setNewSearchMovie] = useState("");
  const [movie_info, setMovieInfo] = useState("")
  const [isLoading, setIsLoading] = useState(false)

    const handleNewSearchChange = (event) => {
        setNewSearchMovie(event.target.value);
    }


   const handleNewSearchSubmit = async (event) =>{
       event.preventDefault();
       setIsLoading(true);
       try{
           const response = await axios.get(
           `${URL}/search?movie_name=${newSearchMovie}`
           );

         const data = response.data;
         setMovieInfo(data);
         setIsLoading(false);
        } catch(error) {
        console.error("Error fetching")
        }
   }

  return (
    <div>
    <div style={{ backgroundColor: "pink", padding: "10px 0", marginBottom: "20px" }}>
      <Typography variant="h2" align="center" style={{ fontFamily: "Arial", color: "white" }}>Movies Scraper</Typography>
    </div>
    <form onSubmit={handleNewSearchSubmit}>
      <Grid container alignItems="center" marginBottom="20px" justifyContent="center" spacing={2}>
        <Grid item>
          <TextField
            label=""
            variant="outlined"
            value={newSearchMovie}
            onChange={handleNewSearchChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit" startIcon={<SearchIcon />} sx={{ backgroundColor: "pink" }}>Search</Button>
        </Grid>
      </Grid>
    </form>

    {isLoading ? (
      <CircularIndeterminate/>
    ) : (
      <MoviesList 
      movie_info = {movie_info}
      onSearchClick = {handleNewSearchChange}
      />
    )}
    
    </div>
  );
}


export default App;
