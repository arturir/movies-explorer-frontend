import { Link } from 'react-router-dom';

export default function Footer () {

    return (
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__wrapper">
                <ul className="footer__links">
                    <li className="footer__link-wrapper">
                        <Link to="https://practicum.yandex.ru/" target="_blank" className="footer__link">Яндекс.Практикум</Link>
                    </li>
                    <li className="footer__link-wrapper">
                        <Link to="https://github.com/" target="_blank" className="footer__link">Github</Link>
                    </li>
                </ul>
                <p className="footer__year">©2024</p>
            </div>
        </footer>
    )
}