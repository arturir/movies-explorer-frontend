import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader"

export default function Movies ({ movies }) {

    return (
        <>
            <Header />
            <main>
                <SearchForm />
                <section className="movies">
                    <MoviesCardList movies={[...movies]}/>
                    <MoreButton />
                </section>
            </main>
            <Footer />
        </>
     
    )
}