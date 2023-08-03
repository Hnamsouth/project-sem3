
import { GoogleOAuthProvider} from '@react-oauth/google';
import React,{} from 'react';

import Register from './register';
import Login from './login';


const ClientID = "122068012715-mr0gurvo72c3qveo7ntrcq3h3fq1h6sa.apps.googleusercontent.com"

const RegisterLogin = (props)=>{
    return (
        <GoogleOAuthProvider clientId={ClientID} >
            <div class="form-box">
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