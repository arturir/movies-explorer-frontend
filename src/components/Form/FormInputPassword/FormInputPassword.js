export default function FormInputPassword () {
    return (
        <>
                <label htmlFor="password" className="form__label">Пароль</label>
                <input type="password" name="password" className="form__input" placeholder="Введите пароль" required/>
                <p className="form__text-validation">Текст ошибки</p>
        </>
    )
}