import { Link } from "react-router-dom";
import Form from "../Form/Form";
import FormInputEmail from "../Form/FormInputEmail/FormInputEmail";
import FormInputPassword from "../Form/FormInputPassword/FormInputPassword";
import FormSubmitButton from "../Form/FormSubmitButton/FormSubmitButton";
import useFormWithValidation from "../../hooks/useFormWithValidation/useFormWithValidation";

export default function Login ({handleAuthorize}) {

    const formWithValidation = useFormWithValidation();

    function changeForm (event) {
        event.preventDefault();
        formWithValidation.handleChange(event);
    }

    function handleSubmit (event) {
        event.preventDefault();
        const [email, password] = event.currentTarget;
        handleAuthorize(email.value, password.value);
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