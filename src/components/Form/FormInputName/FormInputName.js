import { useState, useEffect } from "react"
export default function FormInputName ({error, value}) {
    const [valueInput, setValueInput] = useState("");

    return (
        <>
            <label htmlFor="name" className="form__label">Имя</label>
            <input type="text" id="name" name="name" className={`form__input ${error && 'form__input_error'}`}  
                   minLength={2} maxLength={64} placeholder="Ваше имя" required pattern="[А-Яа-яA-Za-z\-\s]+" 
                   onChange={(e) => {setValueInput(e.target.value)}} defaultValue={value}/>
            <p className="form__text-validation">{error}</p>
        </>
    )
}