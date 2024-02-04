import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";
import CloseButton from "../CloseButton/CloseButton"

export default function PopupNavigation ({ burgerMenuOpened, toggleBurgerMenu }) {
    const { loggedIn } = useContext(CurrentAppContext);
    

    return (
        <>
            {burgerMenuOpened && <div className="popup-navigation">
                <CloseButton action={toggleBurgerMenu} />
                {loggedIn && <div className="popup-navigation__links">
                    <NavLink to="/" className={"popup-navigation__link"} >Главная</NavLink>
                    <NavLink to="/movies" className={"popup-navigation__link"} >Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={"popup-navigation__link"} >Сохраненные Фильмы</NavLink>
                </div>}
                {!loggedIn && <div className="popup-navigation__links">
                    <NavLink to="/signup" className={"popup-navigation__link"} >Регистрация</NavLink>
                </div>}
                {loggedIn && <NavLink to="/profile" className={"menu__profile"} >Аккаунт</NavLink>}
                {!loggedIn && <NavLink to="/signin" className={"menu__signin-button"}>Войти</NavLink>}
            </div> }
            {burgerMenuOpened && <div className="background-wrapper"> 
            </div> }
        </>
    );
}