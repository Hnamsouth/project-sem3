
import React,{useContext,useState,useEffect} from "react";
import UserContext from "../../../context/userContext";
import jwt_decode from "jwt-decode";
import { getProfile } from "../../../Service/auth.service";
const Uprofile = (props)=>{
    const {state,dispatch}=useContext(UserContext);
    const [user,setUser]=useState({Id:"",Email:""});
    const [asd,setAsd]=useState([]);


    const getP = async ()=>{
        var u = await  getProfile();
        setUser(u);
        let token = localStorage.getItem("token")
        console.log({statetoken:state.token});
        dispatch({type:"HIDE_LOADING"})
    }

    useEffect( ()=>{
        dispatch({type:"SHOW_LOADING"})
        getP();
    },[])

    return (
        <div className="container">
            <h1>{user.id}</h1>
            <h2>{user.email}</h2>
        </div>
    );
}

export default Uprofile;