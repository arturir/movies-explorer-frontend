export default function FormInputEmail () {
    return (
        <>
            <label htmlFor="email" className="form__label">E-mail</label>
            <input type="email" id="email" name="email" className="form__input" minLength="5" placeholder="name@example.com" required/>
            <p className="form__text-validation">Текст ошибки</p>
        </>
    )
}