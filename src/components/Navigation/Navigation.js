import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";

export default function Navigation ({ themeHeaderIsBlue, toggleBurgerMenu }) {
    const { loggedIn } = useContext(CurrentAppContext);

    return (
        <nav className={themeHeaderIsBlue ? "menu menu_theme_blue" : "menu"}>  
            <div className="menu__wrapper">
                <Link to="/" className={"menu__logo"} />
                {loggedIn && <div className="menu__navigation">
                    { <div className={`menu__links`}>
                        <Link to="/movies" className={themeHeaderIsBlue ? "menu__link menu__link_theme_blue" : "menu__link"} >Фильмы</Link>
                        <Link to="/saved-movies" className={themeHeaderIsBlue ? "menu__link menu__link_theme_blue" : "menu__link"} >Сохраненные Фильмы</Link>
                    </div> }
                    <Link to="/profile" className={"menu__profile"}>Аккаунт</Link>
                </div>}
                <div className={"menu__burger-link"} onClick={toggleBurgerMenu}>
                    <div className={themeHeaderIsBlue ? "menu__burger menu__burger_theme_blue" : "menu__burger"}></div>
                </div>
                {!loggedIn && <div className={"menu__links menu__links_register"}>
                    <Link to="/signup" className={themeHeaderIsBlue ? "menu__link menu__link_theme_blue" : "menu__link"} >Регистрация</Link>
                    <Link to="/signin" className={"menu__signin-button"}>Войти</Link>
                </div> }    
            </div>
        </nav>
    );
}