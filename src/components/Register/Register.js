import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import FormInputName from "../Form/FormInputName/FormInputName";
import FormInputEmail from "../Form/FormInputEmail/FormInputEmail";
import FormInputPassword from "../Form/FormInputPassword/FormInputPassword";
import FormSubmitButton from "../Form/FormSubmitButton/FormSubmitButton";
import useFormWithValidation from "../../hooks/useFormWithValidation/useFormWithValidation";
import mainApi from "../../utils/MainApi";
import { useNavigate } from "react-router-dom";

export default function Register ({handleInfoTooltip, setLoggedIn}) {


    const navigate = useNavigate(),
          formWithValidation = useFormWithValidation();

    function changeForm (event) {
        event.preventDefault();
        formWithValidation.handleChange(event);
    }

    function handleSubmit (event) {
        event.preventDefault();
        const [name, email, password] = event.currentTarget;
        mainApi.register(name.value, email.value, password.value)
        .then(data => {
            mainApi.authorize(email.value, password.value)
            .then((data) => {
                if (data.token) {
                  localStorage.setItem('jwt', data.token);
                  setLoggedIn(true);
                  handleInfoTooltip('ok', 'Вы успешно вошли!');
                  navigate('/', {replace: true});
                } else {
                  throw new Error (data)
                }
            })
          }
        )
        .catch(err=>{
            handleInfoTooltip('error', 'Ошибка при входе!');
        })
    }

    return (
        <main>
            <Form>
                <h1 className="form__greeting">Добро пожаловать!</h1>
                <form className="form__wrapper" onChange={changeForm} onSubmit={handleSubmit}>
                    <FormInputName error={formWithValidation.errors?.name} />   
                    <FormInputEmail error={formWithValidation.errors?.email}/>
                    <FormInputPassword error={formWithValidation.errors?.password} required={true}/>
                    <FormSubmitButton text={"Зарегистрироваться"} isValid={formWithValidation.isValid}/>
                    <div className="form__under-button">
                        <p className="form__description">Уже зарегистрированы?</p>
                        <Link className="form__link" to="/signin">Войти</Link>
                    </div>
                </form>
            </Form>
        </main>
    )
}