import { Link } from "react-router-dom";
import Header from "../Header/Header";
import PopupWithForm from "../PopupWIthForm/PopupWithForm";
import { useContext } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";

export default function Profile ({formIsOpen, setFormIsOpen, setLoggedIn}) {

    const {userName, email} = useContext(CurrentAppContext);

    function toggleFormIsOpen(event) {
        event.preventDefault();
        setFormIsOpen(!formIsOpen);
    }

    function exitAccount () {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('moviesConfig');
        localStorage.removeItem('cachedMovies');
    }

    return (
        <>
            <Header />
            <main className="profile">
                <h1 className="profile__greeting">Привет, {userName}!</h1>
                <div className="profile__row profile__row_with-bottom-line">
                    <p className="profile__text">Имя</p><p className="profile__text">{userName}</p>
                </div>
                <div className="profile__row">
                    <p className="profile__text">E-mail</p><p className="profile__text">{email}</p>
                </div>
                <Link to="/" className="profile__edit-link" onClick={toggleFormIsOpen}>Редактировать</Link>
                <Link to="/" className="profile__exit-link" onClick={exitAccount}>Выйти из аккаунта</Link>
                <PopupWithForm formIsOpen={formIsOpen} toggleFormIsOpen={toggleFormIsOpen} />
            </main>
        </>
    )
}