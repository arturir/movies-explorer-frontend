import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../Header/Header";


export default function Profile () {
    const currentName = "Name";
    const currentEmail = "dog@sobaka.gav";
    return (
        <>
            <Header />

            <h2 className="profile__greeting">Привет, {currentName}!</h2>
            <div className="profile__row"><p className="profile__text">Имя</p><p className="profile__text">{currentName}</p></div>
            <div className="profile__grey-line"></div>
            <div className="profile__row"><p className="profile__text">E-mail</p><p className="profile__text">{currentEmail}</p></div>
            <Link to="/" className="profile__edit-link">Редактировать</Link>
            <Link to="/" className="profile__exit-link">Выйти из аккаунта</Link>
        </>
    )
}