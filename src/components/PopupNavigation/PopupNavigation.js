import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";

export default function PopupNavigation ({ burgerMenuOpened, toggleBurgerMenu }) {
    const { loggedIn } = useContext(CurrentAppContext);
    

    return (
        <>
            {burgerMenuOpened && <div className="popup-navigation">
                <div className={"popup__close"} onClick={toggleBurgerMenu}></div>
                {loggedIn && <div className="popup__links">
                    <NavLink to="/" className={"popup__link"} >Главная</NavLink>
                    <NavLink to="/movies" className={"popup__link"} >Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={"popup__link"} >Сохраненные Фильмы</NavLink>
                </div>}
                {!loggedIn && <div className="popup__links">
                    <NavLink to="/signup" className={"popup__link"} >Регистрация</NavLink>
                </div>}
                {loggedIn && <NavLink to="/profile" className={"menu__profile"} >Аккаунт</NavLink>}
                {!loggedIn && <NavLink to="/signin" className={"menu__signin-button"}>Войти</NavLink>}
            </div> }
            {burgerMenuOpened && <div className="background-wrapper"> 
            </div> }
        </>
    );
}