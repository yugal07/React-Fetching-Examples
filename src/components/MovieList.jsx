// 7. ReactJS Movie List
// ● Objective:
// Build a Movie List application with a list of movies, favorite functionality, and
// navigation.
// Functionality Requirements:
// ● Data:
// ● List of 4 movies via array using lists and keys:
// [
// ● { "id": 1, "title": "Interstellar", "year": 2014 },
// ● { "id": 2, "title": "3 Idiots", "year": 2009 },
// ● { "id": 3, "title": "Inception", "year": 2010 },
// ● { "id": 4, "title": "URI", "year": 2019 }
// ○ ]
// ● Features:
// ○ Each movie has "Add to Favourite" and "Remove from Favourite"
// toggle buttons
// ○ A navbar with “All Movies” and “Favourites” toggle buttons
// ○ Favorite movies saved in Local Storage (persist after refresh)
// Technical Requirements:
// ● Functional components
// ● Hooks (useState)
// ● Local Storage

import { useState , useEffect } from "react";
import axios from "axios";

const MovieList = () => {
    const [movies , setMovies] = useState([]);
    const [favourites , setFavourites] = useState([]);
    const [view , setView] = useState("all") // all or favourites
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const savedFavourites = localStorage.getItem("favouriteMovies");
        if(savedFavourites) {
            setFavourites(JSON.parse(savedFavourites));
        }
    } , [])
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get("/movies.json");
                setMovies(response.data);
            } catch(error) {
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData();
    } , [])

    useEffect(() => {
        localStorage.setItem("favouriteMovies" , JSON.stringify(favourites))
    } , [favourites])

    const toggleFavourite = (movieId) => {
        setFavourites((prevFavourites) => {
            if(prevFavourites.includes(movieId)){
                return prevFavourites.filter(id => id != movieId)
            }
            else {
                return [...prevFavourites , movieId]
            }
        })
    }
    const isFavourite = (movieId) => {
        return favourites.includes(movieId)
    }
    
    const getDisplayMovies = () => {
        if(view == "favourites") {
            return movies.filter((movie) => favourites.includes(movie.id))
        }
        return movies;
    }
    if(loading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <div>
            <nav>
                <div>
                    <button onClick={() => setView("all")}>All Movies {movies.length}</button>
                    <button onClick={() => setView("favourites")}>Favourites {favourites.length}</button>
                </div>
            </nav>
            <div>
                <h1>{view == "all" ? "All Movies" : "Favourite Movies"}</h1>
                {getDisplayMovies().length === 0 ? (
                    <div>No Movies to Display</div>
                ) : (
                    <div style={{display: "flex"}}>
                        {getDisplayMovies().map((movie) => (
                            <div key={movie.id}>
                                <h3>{movie.title}</h3>
                                <p>Year: {movie.year}</p>
                                <button onClick={() => toggleFavourite(movie.id)}>
                                    {isFavourite(movie.id) ? "Remove from favourites" : "Add to favourites"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieList;