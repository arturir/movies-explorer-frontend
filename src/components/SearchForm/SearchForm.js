
import { useState, useEffect } from "react";
import moviesApi from "../../utils/MoviesApi";

export default function SearchForm ({setSearchRequest, moviesConfig}) {
    const [textInput, setTextInput] = useState(''),
          [checkboxInput, setCheckboxInput] = useState(moviesConfig?.checkboxInput || ''),
          [errIsOpen, setErrIsOpen] = useState(false);

    useEffect(()=> {
        setTextInput(moviesConfig?.textInput || '')
    },[]);

    useEffect(()=> {
        setSearchRequest({textInput, checkboxInput})
    }, [checkboxInput])

    function submitHandler (event) {
        event.preventDefault();
        if (textInput) {
            setErrIsOpen(false);
            setSearchRequest({textInput, checkboxInput})
        } else {
            setErrIsOpen(true)
        }
    }
    
    return (
        <form className="search-form" name="searchForm" onSubmit={submitHandler}>
            <div className="search-form__wrapper-input">
            <input type="text" name="search-input" className="search-form__input" placeholder="Фильм" value={textInput} onChange={(e) => setTextInput(e.target.value)}  />
            <button type="submit" className="search-form__button"></button>
            </div>
            <div className="search-form__wrapper-checkbox">
                <input type="checkbox" id="toggleCheckbox" className="search-form__checkbox" checked={checkboxInput} onChange={(e) => {setCheckboxInput(!checkboxInput); }} />
                <label htmlFor="toggleCheckbox" className="search-form__label-checkbox"></label>
                <p className="search-form__checkbox-description">Короткометражки</p>
            </div>
            <div className={errIsOpen ? "search-form__error search-form__error_active" : "search-form__error"}>
                <p className="search-form__error-text">Нужно ввести ключевое слово</p>
            </div>
        </form>
    )
}