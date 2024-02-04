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
import Login from "../Login/Login"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true),
        [editFormIsOpen, setEditFormIsOpen] = useState(false),
        [movies, setMovies] = useState([{_id: 1, name: "Иван васильевич меняет профессию", duration: "92", image: "https://chapchap.su/uploads/posts/2022-02/1644017206_1.jpg" }, {_id: 2, name: "Иван васильевич меняет профессию", duration: "92", image: "https://chapchap.su/uploads/posts/2022-02/1644017206_1.jpg" }, {_id: 3, name: "Иван васильевич меняет профессию", duration: "92", image: "https://chapchap.su/uploads/posts/2022-02/1644017206_1.jpg" }, {_id: 4, name: "Иван васильевич меняет профессию", duration: "92", image: "https://chapchap.su/uploads/posts/2022-02/1644017206_1.jpg" }]),
        [savedMovies, setSavedMovies] = useState([{_id: 1, name: "Иван васильевич меняет профессию", duration: "92", image: "https://chapchap.su/uploads/posts/2022-02/1644017206_1.jpg" }]);
  
  useEffect(()=> {
    if (editFormIsOpen) {
      document.querySelector("body").classList.add("body_no-scroll");
    } else {
      document.querySelector("body").classList.remove("body_no-scroll");
    }
  }, [editFormIsOpen])

  return (
    <CurrentAppContext.Provider value={{loggedIn}}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies movies={movies}/>} />
          <Route path="/saved-movies" element={<SavedMovies movies={savedMovies} />} />
          <Route path="/profile" element={<Profile formIsOpen={editFormIsOpen} setFormIsOpen={setEditFormIsOpen}/>} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentAppContext.Provider>
  );
}
