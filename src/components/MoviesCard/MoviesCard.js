export default function MoviesCard ({ movie }) {
    return (
        <li className="movies-card">
            <img className="movies-card__image" src={movie.image} alt= {"Обложка фильма" + movie.name }/>
            <div className="movies-card__description">
                <div className="movies-card__top-row">
                    <p className="movies-card__name">
                        {movie.name}
                    </p>
                    <input type="checkbox" id={ "toggleCheckbox" + movie._id } className="movies-card__checkbox"/>
                    <label htmlFor={ "toggleCheckbox" + movie._id } className="movies-card__label-checkbox"></label>
                </div>
                    <p className="movies-card__duration">{movie.duration} мин.</p>
            </div>
        </li>
    )
}