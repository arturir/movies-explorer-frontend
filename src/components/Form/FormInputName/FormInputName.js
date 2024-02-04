export default function FormInputName () {
    return (
        <>
            <label htmlFor="name" className="form__label">Имя</label>
            <input type="text" id="name" name="name" className="form__input form__input_error" minLength="2" maxLength={64} placeholder="Ваше имя" required/>
            <p className="form__text-validation">Текст ошибки</p>
        </>
    )
}