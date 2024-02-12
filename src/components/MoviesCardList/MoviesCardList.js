import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList ({ movies, isSavedCards }) {
    return (
        <>
            <ul className="movies-card-list">
                {movies.map((movie)=> (

                    <MoviesCard movie={movie} key={movie.id || movie.movieId} isSavedCard={isSavedCards || false}/>
                ))}
            </ul>
        </>
    )

}