export default function FormInputName () {
    return (
        <>
            <label htmlFor="name" className="form__label">Имя</label>
            <input type="text" name="name" className="form__input form__input_error" minLength="2" placeholder="Ваше имя"/>
            <p className="form__text-validation">Текст ошибки</p>
        </>
    )
}