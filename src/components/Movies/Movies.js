import { useState, useEffect, useRef, useCallback } from "react";
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

export default function Movies () {
    const 
    {movies, setMovies} = useContext(CurrentAppContext),
    [searchRequest, setSearchRequest] = useState({}),
    [searchResult, setSearchResult] = useState([]),
    [cardsInAnswer, setCardsInAnswer] = useState(0),
    [amountCardsOnScreen, setAmountCardsOnScreen] = useState(0),
    width = useResize(),
    currentAmmountCardsOnScreen = useRef(0),
    [cachedMovies, setCachedMovies] = useLocalStorageState("cachedMovies", []),
    [moviesConfig, setMoviesConfig] = useLocalStorageState("moviesConfig", {});
    const { savedMovies, setSavedMovies, error, setError } = useContext(CurrentAppContext);

    useEffect(() => {
        moviesApi.getMovies()
            .then((cards) => {
              setMovies(cards);
              setError(false);
            })
            .catch((error) => {handleResponseError(error)});
    }, []);
    useEffect(() => {
        setSearchResult(cachedMovies?.map((movie)=> {
            if(savedMovies.some(film=>{return film.movieId==movie.id})) {
                console.log(movie.nameRU)
                movie.isLiked = true;
            } else {
                movie.isLiked = false;
            }
            return movie
        }));
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
            setSearchResult(
                films.filter((movie) => {
                    if ((movie.nameRU.toLowerCase().includes(searchRequest.textInput?.toLowerCase())
                    || movie.nameEN.toLowerCase().includes(searchRequest.textInput?.toLowerCase()))
                    && (searchRequest.checkboxInput ? movie.duration<=(searchRequest.checkboxInput && 40) : true))
                    {
                        return true
                    }
                }).map((movie)=> {
                    if(savedMovies.some(film=>{return film.movieId==movie.id})) {
                        console.log(movie.nameRU)
                        movie.isLiked = true;
                    } else {
                        movie.isLiked = false;
                    }
                    return movie
                })
            )
        }
    }

    function handleResponseError (error) {
        console.error("Ошибка данных, подробнее > ", error);
        setError(true);
    }

    function Zalupa () {
        setAmountCardsOnScreen(amountCardsOnScreen+cardsInAnswer)
    }

    function ZalupaSearchRequest (value) {
        setSearchRequest(value);    
    }


    return (
        <>
            {(!movies?.length && !error) &&  <Preloader />}
            <Header />
            <main>
                <SearchForm setSearchRequest={ZalupaSearchRequest} moviesConfig={moviesConfig}/>
                <section className="movies">
                    {error && <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз</p>}
                    {!searchResult.length && <p className="movies__empty">Ничего не найдено</p>}
                    {cachedMovies?.length && <MoviesCardList movies={[...cachedMovies].slice(0, amountCardsOnScreen)}/> }
                    {(amountCardsOnScreen<cachedMovies?.length) && <MoreButton action={Zalupa}/>}
                </section>
            </main>
            <Footer />
        </>
     
    )
}


    // useEffect(() => {

    //     window.localStorage.setItem("moviesConfig", JSON.stringify(searchResult))
    // }, [searchResult]);