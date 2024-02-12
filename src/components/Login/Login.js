import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Form from "../Form/Form";
import FormInputEmail from "../Form/FormInputEmail/FormInputEmail";
import FormInputPassword from "../Form/FormInputPassword/FormInputPassword";
import FormSubmitButton from "../Form/FormSubmitButton/FormSubmitButton";
import useFormWithValidation from "../../hooks/useFormWithValidation/useFormWithValidation";
import mainApi from "../../utils/MainApi";
import { useNavigate } from "react-router-dom";

export default function Login ({handleInfoTooltip, setLoggedIn, setEmail, setUserName}) {
    const navigate = useNavigate(),
          formWithValidation = useFormWithValidation();

    function changeForm (event) {
        event.preventDefault();
        formWithValidation.handleChange(event);
    }

    function handleSubmit (event) {
        event.preventDefault();
        console.log("acts")
        const [email, password] = event.currentTarget;
        mainApi.authorize(email.value, password.value)
        .then((data) => {
            if (data.token) {
              localStorage.setItem('jwt', data.token);
              setLoggedIn(true);
              handleInfoTooltip('ok', 'Вы успешно вошли!');
              navigate('/', {replace: true});
            } else {
              handleInfoTooltip('error', 'Ошибка при входе!');
              throw new Error (data);
            }
        })
        .catch(err=>{
            handleInfoTooltip('error', 'Ошибка при входе!');
        })
    }



    return (
        <main>
            <Form>
                <h1 className="form__greeting">Рады видеть!</h1>
                <form className="form__wrapper" onChange={changeForm} onSubmit={handleSubmit}>
                    <FormInputEmail error={formWithValidation.errors?.email}/>
                    <FormInputPassword error={formWithValidation.errors?.password} required={true}/>
                    <FormSubmitButton text={"Войти"} isValid={formWithValidation.isValid}/>
                    <div className="form__under-button">
                        <p className="form__description">Ещё не зарегистрированы?</p>
                        <Link className="form__link" to="/signup">Регистрация</Link>
                    </div>
                </form>
            </Form>
        </main>

    )
}