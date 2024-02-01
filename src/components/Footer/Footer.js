import { Link } from 'react-router-dom';

export default function Footer () {

    return (
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="search-form__grey-line"></div>
            <div className="footer__wrapper">
                <div className="footer__links">
                    <Link to="https://practicum.yandex.ru/" target="_blank" className="footer__link">Яндекс.Практикум</Link>
                    <Link to="https://github.com/" target="_blank" className="footer__link">Github</Link>
                </div>
                <p className="footer__year">©2024</p>
            </div>
        </footer>
    )
}