
import React, { useContext } from "react";
import { Navigate,useLoaderData } from "react-router-dom";
import UserContext from "../../../context/userContext";
import { Iuser } from "../../../context/initState";

const RouteProtected= ({child})=>{
    const {state,dispatch}=useContext(UserContext)
    const check = useLoaderData();
    if(check){return child;}
    dispatch({type:"SET_USER",payload:Iuser})
    return <Navigate to="/login"   replace/>;
}
export default RouteProtected;