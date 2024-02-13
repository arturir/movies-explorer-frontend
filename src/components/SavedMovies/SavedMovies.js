import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";

export default function SavedMovies ({findMovies}) {

    const {savedMovies, error} = useContext(CurrentAppContext),
          [searchRequest, setSearchRequest] = useState({}),
          [searchResult, setSearchResult] = useState([]);


    useEffect(() => {
        savedMovies.forEach(movie => movie.isLiked = true)
    }, [savedMovies]);  

    useEffect(() => {
        getRequestedMovies();
    }, [searchRequest]);  

    const getRequestedMovies = (films=savedMovies) => {
        if (searchRequest.textInput || searchRequest.checkboxInput) {
            setSearchResult(findMovies(films, searchRequest))
        }
    }

    function searchRequestHandler (value) {
        setSearchRequest(value);    
    }

    return (
        <>
            <Header />
            <SearchForm setSearchRequest={searchRequestHandler}/>
            <section className="saved-movies">
                {error && <p className="movies__error">
                    Во время запроса произошла ошибка. 
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз
                </p>}
                {!savedMovies?.length && <p className="movies__empty">Ничего не найдено</p>}         
                <MoviesCardList movies={(searchRequest.textInput || searchRequest.checkboxInput) ? [...searchResult] : [...savedMovies]} isSavedCards={true}/>
            </section>
            <Footer />
        </>
    )
}