
import { GoogleOAuthProvider} from '@react-oauth/google';
import React,{ useContext } from 'react';

import Register from './register';
import Login from './login';
import UserContext from '../../../context/userContext';


const ClientID = "122068012715-mr0gurvo72c3qveo7ntrcq3h3fq1h6sa.apps.googleusercontent.com"

const RegisterLogin = (props)=>{
    const {state,dispatch}=useContext(UserContext)
    function closeModal(){
        dispatch({type:"HIDE_AUTH_MODAL"})
    }
    return (
        <GoogleOAuthProvider clientId={ClientID} >
            <div class="form-box">
                <button type="button" class="close" onClick={closeModal} aria-label="Close">
                    <span ><i class="icon-close"></i></span>
                </button>
                        <div class="form-tab">
                            <ul class="nav nav-pills nav-fill" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">Sign In</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="tab-content-5">
                                <Register/>
                                <Login/>
                            </div>
                        </div>
                    </div>
        </GoogleOAuthProvider>
    );
}

export default RegisterLogin;