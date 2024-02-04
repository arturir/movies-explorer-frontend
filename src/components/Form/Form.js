import { Link } from "react-router-dom";

export default function Form (props) {

    return (
        <section className={props.mod ? "form " + props.mod : "form"}>  
            {!props.mod && <div className="form__wrapper-logo"><Link to="/" className={"form__logo"} /></div>}
            {props.children}
        </section>
    )
}