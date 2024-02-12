export default function FormSubmitButton ({ text, mod, isValid }) {
    return (
        <>
            <button type="submit" className={"form__button " + mod} disabled={!isValid}>{text}</button>
        </>
    )
}