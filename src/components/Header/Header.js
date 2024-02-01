import Navigation from "../Navigation/Navigation";
import PopupNavigation from "../PopupNavigation/PopupNavigation";
import { useState, useEffect } from "react";

export default function Header ({ themeHeaderIsBlue }) {

    const [burgerMenuOpened, setBurgerMenuOpened ] = useState(false),
          body = document.querySelector("body");

    useEffect(() => {
        burgerMenuOpened ? body.classList.add("body_no-scroll") : body.classList.remove("body_no-scroll")
    }, [burgerMenuOpened]);

    function toggleBurgerMenu () {
      setBurgerMenuOpened(!burgerMenuOpened);
    }

    return (
        <>
            <Navigation themeHeaderIsBlue={themeHeaderIsBlue} toggleBurgerMenu={toggleBurgerMenu} />
            <PopupNavigation burgerMenuOpened={burgerMenuOpened} toggleBurgerMenu={toggleBurgerMenu} />
        </>
    );
}