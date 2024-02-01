import { Link } from "react-router-dom"
export default function AboutMe () {
    return (
        <section className="about-me" id="about-me">
            <div className="about-me__wrapper">
                <h2 className="main__title">Студент</h2>
                <div className="main__black-line"></div>
                <div className="about-me__wrapper-about">
                    <img src={require("../../../images/student.jpg")} className="about-me__photo" />
                    <div className="about-me__left-column">
                        <h3 className="about-me__name">Артур</h3>
                        <p className="about-me__profossion">Фронтенд-разработчик, 27 лет</p>
                        <p className="about-me__about">
                            Я живу во Владимире, по образаванию техник-программист.
                            С 2019 года я предприниматель. У меня с другом небольшая мастерская по ремонту техники.
                            Я люблю слушать музыку, а ещё увлекаюсь плаваньем. Сейчас решил заняться Frontend-разработкой. 
                            После того, как закончу курс по веб-разработке, планирую начать заниматься веб-разработкой.
                        </p>
                        <Link to="https://github.com/arturir/" className="about-me__github-link">Github</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}