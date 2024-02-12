import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";
import Profile from "../Profile/Profile";
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies"
import Main from '../Main/Main';
import PageNotFound from '../PageNoteFound/PageNoteFound';
import Register from "../Register/Register";
import Login from "../Login/Login";
import mainApi from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';


import PopupInfoTooltip from '../PopupInfoTooltip/PopupInfoTooltip';



export default function App() {
  const [loggedIn, setLoggedIn] = useState(false),
        [editFormIsOpen, setEditFormIsOpen] = useState(false),
        [movies, setMovies] = useState([]),
        [savedMovies, setSavedMovies] = useState([]),
        [isPopupInfoTooltippOpen, setIsPopupInfoTooltippOpen] = useState(false),
        [textInfoTooltip, setTextInfoTooltip] = useState(''),
        [error, setError] = useState(false),
        [email, setEmail] = useState(''),
        [userName, setUserName] = useState(''),
        [typeInfoTooltip, setTypeInfoTooltip] = useState(''),
        navigate = useNavigate();



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

  function handleUpdateUser ({name, email, password}) {
    return (
      mainApi.editProfile(name, email, password)
         .then(res => {          
          setEmail(res.email);
          setUserName(res.name);
  
        })
        .catch(err=>{
          handleInfoTooltip('error', 'Ошибка при входе!');
      })
    )
  }
  
useEffect(() => {
  if(loggedIn) {
    mainApi.getCards()
        .then((movies) => {
            console.log(movies.movies);
            setSavedMovies(movies.movies);

        })
        .catch(err=>setError(true))
      }
}, [loggedIn])
useEffect(() => {
  savedMovies.forEach(movie => {
      movie.isLiked = true;
  });
}, [savedMovies]);  

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      mainApi.checkToken(jwt).then(res => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email)
          setUserName(res.name)
          navigate("/", {replace: true})
        }
      })
      .catch(err=> console.log(err, ' Неправильный токен или он отсутствует'));
    }
  } 
  function toggleLike(event){
    console.log(event.target)
    if (event.target.checked) {
      const newMovie = movies.find((movie) =>  movie.id == event.target.name);
      console.log('1', newMovie)
      mainApi.addNewCard(newMovie)
      .then(newMovie => {
        newMovie.isLiked = true;
        setSavedMovies([...savedMovies, newMovie])
        setError(false);
      })
      .catch(err=>setError(true))
    } else {
      const deletedMovie = savedMovies.find((movie) =>  movie.movieId == event.target.name);
      console.log('2', deletedMovie, event.target.classList)
      mainApi.deleteCard(deletedMovie._id)
        .then(()=> {
          setError(false);
        })
        .catch(err=>setError(true))
      setSavedMovies(savedMovies.filter((movie) => {return movie.movieId != event.target.name}))
    }
  }


  function handleInfoTooltip (type, text) {
    setTypeInfoTooltip(type);
    setTextInfoTooltip(text);
    setIsPopupInfoTooltippOpen(true);
  }

  return (
    <CurrentAppContext.Provider value={{movies, setMovies, toggleLike, loggedIn, email, userName, handleUpdateUser, savedMovies, setSavedMovies, error, setError}}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} formIsOpen={editFormIsOpen} setFormIsOpen={setEditFormIsOpen} setLoggedIn={setLoggedIn}/>} />
          <Route path="/profile" element={<ProtectedRouteElement element={Profile} formIsOpen={editFormIsOpen} setFormIsOpen={setEditFormIsOpen} setLoggedIn={setLoggedIn}/>} />
          <Route path="/signin" element={<Login handleInfoTooltip={handleInfoTooltip} setLoggedIn={setLoggedIn} setEmail={setEmail} setUserName={setUserName}/>} />
          <Route path="/signup" element={<Register handleInfoTooltip={handleInfoTooltip} setLoggedIn={setLoggedIn}/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <PopupInfoTooltip isOpen={isPopupInfoTooltippOpen} onClose={()=> {setIsPopupInfoTooltippOpen(false)}} type={typeInfoTooltip} title={textInfoTooltip}/>
      </div>
    </CurrentAppContext.Provider>
  );
}
