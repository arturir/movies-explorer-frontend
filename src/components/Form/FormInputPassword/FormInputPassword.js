export default function FormInputPassword ({error, required}) {
    return (
        <>
                <label htmlFor="password" className="form__label">Пароль</label>
                <input type="password" id="password" name="password" className={`form__input ${error && 'form__input_error'}`} placeholder="Введите пароль" required={required}/>
                <p className="form__text-validation">{error}</p>
        </>
    )
}