export default function FormInputPassword () {
    return (
        <>
                <label htmlFor="password" className="form__label">Пароль</label>
                <input type="password" id="password" name="password" className="form__input" placeholder="Введите пароль" required minLength={6} maxLength={128}/>
                <p className="form__text-validation">Текст ошибки</p>
        </>
    )
}