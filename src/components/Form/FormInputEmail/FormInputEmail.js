import { useState, useEffect } from "react"
export default function FormInputEmail ({error, value}) {
    const [valueInput, setValueInput] = useState("");


    return (
        <>
            <label htmlFor="email" className="form__label">E-mail</label>
            <input type="email" id="email" name="email" className={`form__input ${error && 'form__input_error'}`} 
                   minLength="5" placeholder="name@example.com" required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}" 
                   onChange={(e) => {setValueInput(e.target.value)}} defaultValue={value}/>
            <p className="form__text-validation">{error}</p>
        </>
    )
}