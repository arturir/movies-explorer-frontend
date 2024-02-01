import { Link } from "react-router-dom";

export default function Form (props) {

    return (
        <section className="form">  
            <Link to="/" className={"form__logo"} />
            {props.children}
        </section>
    )
}