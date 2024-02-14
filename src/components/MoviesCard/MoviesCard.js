import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";

export default function MoviesCard ({ movie, isSavedCard }) {

    const {toggleLike, handleInfoTooltip} = useContext(CurrentAppContext),
          [isLiked, setIsLiked] = useState(movie.isLiked);

    function roundTohours (min) {
        const hours = Math.floor(min/60);
        return `${hours ? hours + ' ч. ' : ''} ${min%60} мин.`
    }
    
    function changeCheckbox (event) {
        toggleLike(event)
            .then((data) => {
                if (data.isLiked || data.message) {
                    setIsLiked(!isLiked);
                    movie.isLiked = !isLiked;
                } else {
                    throw new Error
                }
            })
            .catch(()=> {
                handleInfoTooltip('error', 'При установке лайка произошла ошибка')
            })
    }

    return (
        <li className="movies-card">
            <Link to={movie.trailerLink} target="_blank"><img className="movies-card__image" src={`https://api.nomoreparties.co${movie.image.url || movie.image}`} alt= {`Обложка фильма '${movie.nameRU}'` }/> </Link>
            <div className="movies-card__description">
                <div className="movies-card__top-row">
                    <h2 className="movies-card__name">
                        {movie.nameRU}
                    </h2>
                        <input type="checkbox" id={ `toggleCheckbox${movie.movieId || movie.id}`} className={"movies-card__checkbox"} name={movie.movieId || movie.id} checked={isLiked} onChange={(event) => changeCheckbox(event)}/>
                        <label htmlFor={`toggleCheckbox${movie.movieId || movie.id}`} className={`movies-card__label-checkbox ${isSavedCard && 'movies-card__delete'}`} ></label>
                </div>
                <p className="movies-card__duration">{roundTohours(movie.duration)}</p>
            </div>
        </li>
    )
}