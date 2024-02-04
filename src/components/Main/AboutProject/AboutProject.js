export default function AboutProject () {
    return (
        <section className="about-project" id={"about-project"}>
            <div className="about-project__wrapper">
                <h2 className="main__title">О проекте</h2>
                <div className="about-project__information">
                    <div className="about-project__column-description">
                        <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="about-project__column-description">
                        <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="about-project__duration">
                    <div className="about-project__column-part">
                        <p className="about-project__green-rectangle">1 неделя</p>
                        <p className="about-project__part">Back-end</p>
                    </div>
                    <div className="about-project__column-part"> 
                        <p className="about-project__grey-rectangle">4 недели</p>
                        <p className="about-project__part">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    )
}