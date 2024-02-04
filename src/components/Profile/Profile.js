import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../Header/Header";
import PopupWithForm from "../PopupWIthForm/PopupWithForm";


export default function Profile ({formIsOpen, setFormIsOpen}) {
    const currentName = "Name";
    const currentEmail = "dog@sobaka.gav";

    function toggleFormIsOpen (event) {
        event.preventDefault();
        setFormIsOpen(!formIsOpen);
    }

    return (
        <>
            <Header />
            <main className="profile">
                <h1 className="profile__greeting">Привет, {currentName}!</h1>
                <div className="profile__row profile__row_with-bottom-line"><p className="profile__text">Имя</p><p className="profile__text">{currentName}</p></div>

                <div className="profile__row"><p className="profile__text">E-mail</p><p className="profile__text">{currentEmail}</p></div>
                <Link to="/" className="profile__edit-link" onClick={toggleFormIsOpen}>Редактировать</Link>
                <Link to="/" className="profile__exit-link">Выйти из аккаунта</Link>
                <PopupWithForm formIsOpen={formIsOpen} toggleFormIsOpen={toggleFormIsOpen}/>
            </main>
        </>
    )
}