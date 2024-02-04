import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList ({ movies }) {

    return (
        <>
            <ul className="movies-card-list">
                {movies.map((movie)=> (
                    <MoviesCard movie={movie} key={movie._id} />
                ))}
            </ul>
        </>
    )

}