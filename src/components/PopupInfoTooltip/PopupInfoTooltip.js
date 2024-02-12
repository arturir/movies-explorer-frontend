import { useState } from "react";
import CloseButton from "../CloseButton/CloseButton";

export default function PopupInfoTooltip ({type, title, isOpen, onClose}) {

    const close = () => {
        onClose();
    }

    function handleOverlayClose (event) {
        if (event.target.classList.contains("popup")) {
            close();
        }
    }

    return (
        <div className={!isOpen? "popup" : "popup popup_active"} onMouseDown={handleOverlayClose}>
           
            <div className="popup__container popup__container_form ">
            <div className="popup__wrapper">
                <p className={type==="error" ? "popup__text popup__text_type_error": "popup__text"}>{title}</p>
                <CloseButton action={close}/> 
            </div>
            </div>
        </div>
    )
}