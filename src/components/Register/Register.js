import { Link } from "react-router-dom";
import Form from "../Form/Form";
import FormInputName from "../Form/FormInputName/FormInputName";
import FormInputEmail from "../Form/FormInputEmail/FormInputEmail";
import FormInputPassword from "../Form/FormInputPassword/FormInputPassword";
import FormSubmitButton from "../Form/FormSubmitButton/FormSubmitButton";

export default function Register () {

    return (
        <Form>
            <h2 className="form__greeting">Добро пожаловать!</h2>
            <form className="form__wrapper">
                <FormInputName />
                <FormInputEmail />
                <FormInputPassword />
                <FormSubmitButton text={"Зарегистрироваться"}/>
                <div className="form__under-button">
                    <p className="form__description">Уже зарегистрированы?</p>
                    <Link className="form__link" to="/signin">Войти</Link>
                </div>
            </form>
        </Form>
    )
}