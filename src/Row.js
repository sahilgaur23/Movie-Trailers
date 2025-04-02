import React,{ useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
const fallbackImageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzM0MzQzNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl]= useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
                setError(null);
                return request;
            } catch (error) {
                console.error(`Error fetching ${title} movies:`, error);
                setError("Failed to load movies");
            }
        }
        fetchData();
    }, [fetchUrl, title]);

    const opts= {
        height: "390",
        width:"100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
                .then((url) => {
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get("v"));
                    }
                })
                .catch((error) => {
                    console.error("Error loading trailer:", error);
                    setTrailerUrl("");
                });
        }
    };

    const handleImageError = (e) => {
        e.target.onerror = null; 
        e.target.src = fallbackImageUrl;
    };

    if (error) {
        return <div className="row"><h2>{title}</h2><p className="row__error">{error}</p></div>;
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {/*several row__posters(s) */}

                {movies.map((movie)=> {
                    const posterPath = isLargeRow ? movie.poster_path : movie.backdrop_path;
                    if (!posterPath) {
                        return null; 
                    }
                    return (
                        <img
                            key={movie.id}
                            onClick={()=>handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${base_url}${posterPath}`}
                            alt={movie.name || movie.title}
                            onError={handleImageError}
                        />
                    );
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;