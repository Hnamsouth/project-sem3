
import React, { useEffect,useContext } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { UVerifyEmail } from '../../../Service/auth.service';
import UserContext from '../../../context/userContext';

const VerifyEmail = ()=>{
    const {state,dispatch} = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    let mess="";
    // Lấy các tham số từ "query string"
    dispatch({type:"SHOW_LOADING"})
    const queryParams = new URLSearchParams(location.search);
    let formCheck = {
        token:queryParams.get('token'),
        email:queryParams.get('email')
    }

    const CheckVirify =async()=>{
        let check= await UVerifyEmail(formCheck);
        console.log(check)
        if(check){
            navigate("/login");
        }else{
            mess="Email or token invalid";
        }
        dispatch({type:"HIDE_LOADING"})
    }
    useEffect(()=>{
        CheckVirify();
    },[])
    return (
        <h1>{mess}</h1>
    );


}
export default VerifyEmail;