import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";
import mainApi from "../../utils/MainApi";

export default function SavedMovies () {

    const { savedMovies, setSavedMovies, error, setError } = useContext(CurrentAppContext);
    const [movies, setMovies] = useState([]),
    [searchRequest, setSearchRequest] = useState({}),
    [searchResult, setSearchResult] = useState([]);


    useEffect(() => {
        savedMovies.forEach(movie => {
            movie.isLiked = true;
        });
    }, [savedMovies]);  

    useEffect(() => {
        getRequestedMovies();
        
    }, [searchRequest]);  

    function ZalupaSearchRequest (value) {
        setSearchRequest(value);    
    }


    const getRequestedMovies = (films=savedMovies) => {
        if (searchRequest.textInput || searchRequest.checkboxInput) {
            setSearchResult(
                films.filter((movie) => {
                    if ((movie.nameRU.toLowerCase().includes(searchRequest.textInput?.toLowerCase())
                    || movie.nameEN.toLowerCase().includes(searchRequest.textInput?.toLowerCase()))
                    && (searchRequest.checkboxInput ? movie.duration<=(searchRequest.checkboxInput && 40) : true))
                    {
                        return true
                    }
                })
            )
        }
    }


    
    return (
        <>
            <Header />
            <SearchForm setSearchRequest={ZalupaSearchRequest}/>
            <section className="saved-movies">
                {error && <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
                            Подождите немного и попробуйте ещё раз</p>}
                            {!savedMovies.length && <p className="movies__empty">Ничего не найдено</p>}
                            
                <MoviesCardList movies={(searchRequest.textInput || searchRequest.checkboxInput) ? [...searchResult] : [...savedMovies]} isSavedCards={true}/>
            </section>
            <Footer />
        </>
    )
}