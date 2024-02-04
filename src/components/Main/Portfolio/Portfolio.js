import { Link } from "react-router-dom"
export default function Main () {
    return (
            <section className="portfolio">
                <div className="portfolio__wrapper">
                    <p className="portfolio__title">Портфолио</p>
                    <ul className="portfolio__list">
                        <li className="portfolio__item">
                            <Link to="https://github.com/arturir/russian-travel" target="_blank" className="portfolio__link">Статичный сайт</Link>
                        </li>
                        <div className="portfolio__grey-line"></div>
                        <li className="portfolio__item">
                            <Link to="https://github.com/arturir/mesto" target="_blank" className="portfolio__link">Адаптивный сайт</Link>
                        </li>
                        <div className="portfolio__grey-line"></div>
                        <li className="portfolio__item">
                            <Link to="https://github.com/arturir/mesto-react" target="_blank" className="portfolio__link">Одностраничное приложение</Link>
                        </li>
                    </ul>
                </div>
            </section>
    )
}