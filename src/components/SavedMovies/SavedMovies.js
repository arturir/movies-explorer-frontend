import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader"

export default function Movies ({ movies }) {
    return (
        <>
            <Header />
            <SearchForm />
            <section className="saved-movies">
                <MoviesCardList movies={movies} />
                <MoreButton />
            </section>
            <Footer />
        </>
    )
}