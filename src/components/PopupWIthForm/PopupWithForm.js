import { useState } from "react";
import Form from "../Form/Form";
import FormInputName from "../Form/FormInputName/FormInputName";
import FormInputEmail from "../Form/FormInputEmail/FormInputEmail";
import FormInputPassword from "../Form/FormInputPassword/FormInputPassword";
import FormSubmitButton from "../Form/FormSubmitButton/FormSubmitButton";
import CloseButton from "../CloseButton/CloseButton";

export default function PopupWithForm ({formIsOpen, toggleFormIsOpen}) {

    function handleOverlayClose (event) {
        if (event.target.classList.contains("popup")) {
            toggleFormIsOpen(event);
        }
    }

    return (
        <div className={!formIsOpen? "popup" : "popup popup_active"} onMouseDown={handleOverlayClose}>
            <div className="popup__container popup__container_form ">
            <Form mod={"form_type_edit"}>
                <h2 className="form__greeting form__greeting_type_edit ">Изменить данные</h2>
                <form className="form__wrapper" onSubmit={toggleFormIsOpen}>
                    <FormInputName />
                    <FormInputEmail />
                    <FormInputPassword />
                    <FormSubmitButton text={"Изменить"} mod="form__button_type_edit"/>
                </form>
            </Form>
            <CloseButton action={toggleFormIsOpen}/> 
            </div>
        </div>
    )
}