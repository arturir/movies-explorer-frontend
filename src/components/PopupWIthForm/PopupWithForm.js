import Form from "../Form/Form";
import FormInputName from "../Form/FormInputName/FormInputName";
import FormInputEmail from "../Form/FormInputEmail/FormInputEmail";
import FormSubmitButton from "../Form/FormSubmitButton/FormSubmitButton";
import CloseButton from "../CloseButton/CloseButton";
import { useContext, useEffect, useState } from "react";
import { CurrentAppContext } from "../../contexts/CurrentAppContext";
import useFormWithValidation from "../../hooks/useFormWithValidation/useFormWithValidation";


export default function PopupWithForm ({formIsOpen, toggleFormIsOpen}) {

    const {userName, email, handleUpdateUser} = useContext(CurrentAppContext),
          formWithValidation = useFormWithValidation(),
          [buttonIsDisabled, setButtonIsDisabled] = useState(false);

    function changeForm(event) {
        if ((userName == event.currentTarget.name.value) && (email == event.currentTarget.email.value)) {
            setButtonIsDisabled(true);
        } else {
            setButtonIsDisabled(false);
            formWithValidation.handleChange(event);
        }
    }

    function handleOverlayClose(event) {
        if (event.target.classList.contains("popup")) {
            toggleFormIsOpen(event);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const [name, email, password] = event.currentTarget;
        setButtonIsDisabled(true);
        handleUpdateUser({name: name.value, email: email.value, password: password.value})
            .then((data) => {
                toggleFormIsOpen(event);
            })
            .finally(()=>{
                setButtonIsDisabled(false);
            })
    }

    return (
        <div className={!formIsOpen? "popup" : "popup popup_active"} onMouseDown={handleOverlayClose}>
            <div className="popup__container popup__container_form ">
            <Form mod={"form_type_edit"}>
                <h2 className="form__greeting form__greeting_type_edit ">Изменить данные</h2>
                <form className="form__wrapper" onChange={changeForm} onSubmit={handleSubmit}>
                    <FormInputName error={formWithValidation.errors?.name} value={userName} />
                    <FormInputEmail error={formWithValidation.errors?.email} value={email} />
                    <FormSubmitButton text={"Изменить"} mod={"form__button_type_edit"} isValid={formWithValidation.isValid && !buttonIsDisabled}/>
                </form>
            </Form>
            <CloseButton action={toggleFormIsOpen}/> 
            </div>
        </div>
    )
}