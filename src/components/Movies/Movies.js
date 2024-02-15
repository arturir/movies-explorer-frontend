import { useState, useEffect, useRef } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import useResize from "../../hooks/useResize/useResize";
import moviesApi from "../../utils/MoviesApi";
import useLocalStorageState from "../../hooks/useLocalStorageState/useLocalStorageState";
import { useContext } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";

export default function Movies ({findMovies, addLikesToMovies}) {

    const {movies, setMovies} = useContext(CurrentAppContext),
          [searchRequest, setSearchRequest] = useState({}),
          [searchResult, setSearchResult] = useState([]),
          [cardsInAnswer, setCardsInAnswer] = useState(0),
          [amountCardsOnScreen, setAmountCardsOnScreen] = useState(0),
          width = useResize(),
          currentAmmountCardsOnScreen = useRef(0),
          [cachedMovies, setCachedMovies] = useLocalStorageState("cachedMovies", []),
          [moviesConfig, setMoviesConfig] = useLocalStorageState("moviesConfig", {}),
          {error, setError} = useContext(CurrentAppContext);

    useEffect(() => {
        moviesApi.getMovies()
            .then(cards => {
              setMovies(cards);
              setError(false);
            })
            .catch(error => handleResponseError(error));
    }, []);

    useEffect(() => {
        setSearchResult(addLikesToMovies(cachedMovies));
    }, []);

    useEffect(() => {
        getRequestedMovies();
        setError(false)
    }, [searchRequest]);  

    useEffect(() => {
        setCachedMovies(searchResult);
        if (searchRequest.textInput) {
            setMoviesConfig(searchRequest);
        }
    }, [searchResult]);  
      
    useEffect(() => {
        if (width<768) {
            setCardsInAnswer(2);
            currentAmmountCardsOnScreen.current = 5;
        } else if (width<1280) {
            setCardsInAnswer(2);
            currentAmmountCardsOnScreen.current = 8;
        } else {
            setCardsInAnswer(4);
            currentAmmountCardsOnScreen.current = 16;
        }
        setAmountCardsOnScreen(currentAmmountCardsOnScreen.current);
    }, [width, searchRequest])

    const getRequestedMovies = (films=movies) => {
        if (searchRequest.textInput) {
            setSearchResult(addLikesToMovies(findMovies(films, searchRequest)))
        }
    }

    function handleResponseError (error) {
        console.error("Ошибка данных, подробнее > ", error);
        setError(true);
    }

    function moreButtonHandler () {
        setAmountCardsOnScreen(amountCardsOnScreen+cardsInAnswer)
    }

    function searchRequestHandler (value) {
        setSearchRequest(value);    
    }

    return (
        <>
            {(!movies?.length && !error) &&  <Preloader />}
            <Header />
            <main>
                <SearchForm setSearchRequest={searchRequestHandler} moviesConfig={moviesConfig}/>
                <section className="movies">
                    {error && <p className="movies__error">
                        Во время запроса произошла ошибка. 
                        Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз
                    </p>}
                    {!searchResult?.length && <p className="movies__empty">Ничего не найдено</p>}
                    {cachedMovies?.length && <MoviesCardList movies={[...cachedMovies].slice(0, amountCardsOnScreen)}/> }
                    {(amountCardsOnScreen<cachedMovies?.length) && <MoreButton action={moreButtonHandler}/>}
                </section>
            </main>
            <Footer />
        </>
     
    )
}