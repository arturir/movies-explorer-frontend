import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {CurrentAppContext} from "../../contexts/CurrentAppContext"; 
export default function ProtectedRouteElement ({ element: Component, ...props  }) {
  const { loggedIn } = useContext(CurrentAppContext);
  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace/>
)}
