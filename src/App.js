import { useState, useEffect} from 'react';

import MovieCard from './MovieCard';

import './App.css'

import SearchIcon from "./search.svg";
//omdb api: 72dc8c77
const API_URL =  'http://www.omdbapi.com?apikey=72dc8c77'

// const movie1 = {
//     "Title": "Batman & Robin",
//     "Year": "1997",
//     "imdbID": "tt0118688",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
// }


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }


    useEffect(() => {
        searchMovies('Love')
    }, []);

    return(
        <div className="app">
            <h1>MovieHub</h1>

            <div className="search">
                <input
                    placeholder="Seach for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            { movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie = {movie} />
                        ))}
                    </div>
                ) : (
                    <div classNam="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )}

         
        </div>
    );
}

export default App;