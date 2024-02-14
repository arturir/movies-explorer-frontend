import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";
import Main from '../Main/Main';
import Profile from "../Profile/Profile";
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies"
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from '../PageNoteFound/PageNoteFound';
import mainApi from '../../utils/MainApi';
import PopupInfoTooltip from '../PopupInfoTooltip/PopupInfoTooltip';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true),
        [email, setEmail] = useState(''),
        [userName, setUserName] = useState(''),
        [movies, setMovies] = useState([]),
        [savedMovies, setSavedMovies] = useState([]),
        [editFormIsOpen, setEditFormIsOpen] = useState(false),
        [isPopupInfoTooltippOpen, setIsPopupInfoTooltippOpen] = useState(false),
        [textInfoTooltip, setTextInfoTooltip] = useState(''),
        [error, setError] = useState(false),
        [typeInfoTooltip, setTypeInfoTooltip] = useState(''),
        navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, [])
  
  useEffect(()=> {
    if (editFormIsOpen) {
      document.querySelector("body").classList.add("body_no-scroll");
    } else {
      document.querySelector("body").classList.remove("body_no-scroll");
    }
  }, [editFormIsOpen]);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && email) {
      mainApi.getCards()
        .then(movies => setSavedMovies(movies.movies))
        .catch(err => setError(true))
    }
  }, [loggedIn])

  useEffect(() => {
    savedMovies.forEach(movie => movie.isLiked = true)
  }, [savedMovies]);  

  function handleUpdateUser({name, email, password}) {
    return (
      mainApi.editProfile(name, email, password)
        .then(res => {          
          setEmail(res.email);
          setUserName(res.name);
          handleInfoTooltip('ok', 'Данные успешно изменены')
        })
        .catch(err => handleInfoTooltip('error', 'Ошибка изменения данных!'))
    )
  }

  function handleAuthorize(email, password){
    mainApi.authorize(email, password)
    .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          handleInfoTooltip('ok', 'Вы успешно вошли!');
          navigate('movies', {replace: true})
        } else {
          handleInfoTooltip('error', 'Ошибка при входе!');
          throw new Error (data);
        }
    })

    .catch(err => handleInfoTooltip('error', 'Ошибка при входе!'))
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      mainApi.checkToken(jwt).then(res => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email)
          setUserName(res.name)
        } else {
          throw new Error
        }
      })
      .catch(err => {
        setLoggedIn(false);
        handleInfoTooltip('error', 'Неправильный токен или он отсутствует');
      })
    } else {
      setLoggedIn(false);
    }
  } 

  function toggleLike(event) {
    if (event.target.checked) {
      const newMovie = movies.find((movie) => movie.id==event.target.name);
      return mainApi.addNewCard(newMovie)
      .then(newMovie => {
        newMovie.isLiked = true;
        setSavedMovies([...savedMovies, newMovie]);
        setError(false);
        return newMovie
      })
      .catch(err => setError(true))
    } else {
      const deletedMovie = savedMovies.find((movie) => movie.movieId==event.target.name);
      return mainApi.deleteCard(deletedMovie._id)
        .then((data) => {
          setError(false);
          setSavedMovies(savedMovies.filter((movie) => {return movie.movieId != event.target.name}));
          return data
        })
        .catch(err => setError(true))
    }
  }

  function handleInfoTooltip(type, text) {
    setTypeInfoTooltip(type);
    setTextInfoTooltip(text);
    setIsPopupInfoTooltippOpen(true);
  }

  function addLikesToMovies(array) {
    return array?.map((movie) => {
      movie.isLiked = savedMovies.some(film => film.movieId==movie.id);
      return movie
    })
  }

  function findMovies(array, searchRequest) {
    return array?.filter(movie => {
      if ((movie.nameRU.toLowerCase().includes(searchRequest.textInput?.toLowerCase())
      || movie.nameEN.toLowerCase().includes(searchRequest.textInput?.toLowerCase()))
      && (searchRequest.checkboxInput ? movie.duration<=(searchRequest.checkboxInput && 40) : true))
      {
          return true
      }
    })
  }

  return (
    <CurrentAppContext.Provider value={{movies, setMovies, toggleLike, loggedIn, email, userName, handleUpdateUser, savedMovies, setSavedMovies, error, setError, handleInfoTooltip}}>
      <div className="page">
        <Routes>
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} findMovies={findMovies} addLikesToMovies={addLikesToMovies}/>} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} findMovies={findMovies}/>} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} formIsOpen={editFormIsOpen} setFormIsOpen={setEditFormIsOpen} setLoggedIn={setLoggedIn}/>} />
          <Route path="/signin" element={<Login handleAuthorize={handleAuthorize} />} />
          <Route path="/signup" element={<Register handleAuthorize={handleAuthorize} handleInfoTooltip={handleInfoTooltip} />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <PopupInfoTooltip isOpen={isPopupInfoTooltippOpen} onClose={()=> {setIsPopupInfoTooltippOpen(false)}} type={typeInfoTooltip} title={textInfoTooltip}/>
      </div>
    </CurrentAppContext.Provider>
  );
}
