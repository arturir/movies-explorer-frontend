import { Link, NavLink } from "react-router-dom";
import Form from "../Form/Form";
import FormInputEmail from "../Form/FormInputEmail/FormInputEmail";
import FormInputPassword from "../Form/FormInputPassword/FormInputPassword";
import FormSubmitButton from "../Form/FormSubmitButton/FormSubmitButton";
export default function Login () {

    return (
        <main>
            <Form>
                <h1 className="form__greeting">Рады видеть!</h1>
                <form className="form__wrapper">
                    <FormInputEmail />
                    <FormInputPassword />
                    <FormSubmitButton text={"Войти"}/>
                    <div className="form__under-button">
                        <p className="form__description">Ещё не зарегистрированы?</p>
                        <Link className="form__link" to="/signup">Регистрация</Link>
                    </div>
                </form>
            </Form>
        </main>

    )
}