export default function FormSubmitButton ({ text, mod }) {
    return (
        <>
            <button type="submit" className={"form__button " + mod}>{text}</button>
        </>
    )
}