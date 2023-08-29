
import { GoogleOAuthProvider} from '@react-oauth/google';
import React,{ useContext, useState } from 'react';

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
        <div className='login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17' style={{backgroundImage: 'url("/user/assets/images/backgrounds/login-bg.jpg")'}}>
            <div className='container'>
                <div class="form-box">
                    <button type="button" class="close" onClick={closeModal} aria-label="Close">
                        <span ><i class="icon-close"></i></span>
                    </button>
                        <div class="form-tab">
                            <ul class="nav nav-pills nav-fill" role="tablist">
                                <li class="nav-item">
                                    <a class={state.AuthForm?"nav-link active":"nav-link"} id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">Sign In</a>
                                </li>
                                <li class="nav-item">
                                    <a class={!state.AuthForm?"nav-link active":"nav-link"} id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="tab-content-5">
                                <Register/>
                                <Login/>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
            
        </GoogleOAuthProvider>
    );
}

export default RegisterLogin;