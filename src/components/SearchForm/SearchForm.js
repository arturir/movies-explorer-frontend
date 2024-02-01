
export default function SearchForm () {
    return (
        <form className="search-form" name="searchForm">
            <div className="search-form__wrapper-input">
            <input type="text" name="search-input" className="search-form__input" placeholder="Фильм"/>
            <button className="search-form__button"></button>
            </div>
            <div className="search-form__wrapper-checkbox">
                <input type="checkbox" id="toggleCheckbox" className="search-form__checkbox"/>
                <label htmlFor="toggleCheckbox" className="search-form__label-checkbox"></label>
                <p className="search-form__checkbox-description">Короткометражки</p>
            </div>
            <div className="search-form__grey-line"></div>
        </form>
    )
}