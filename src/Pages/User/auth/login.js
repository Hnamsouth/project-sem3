
import { GoogleOAuthProvider ,GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import React,{useState,useContext} from 'react';
import jwt_decode from "jwt-decode";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import api from '../../../Service/api';
import { ULogin } from '../../../Service/auth.service';
import UserContext from '../../../context/userContext';
import { useNavigate  } from 'react-router-dom';


const ClientID = "122068012715-mr0gurvo72c3qveo7ntrcq3h3fq1h6sa.apps.googleusercontent.com"

const Login = (props)=>{
    const LoginGG=false;
    const {state,dispatch}=useContext(UserContext)
    let navigate = useNavigate();

    const schema =yup.object({
        Email:yup.string().required().email("Please Enter Email").min(10).max(50),
        Password:yup.string().required().min(8).max(50).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\W]).{8,}$/,"Password must contain 1 uppercase letter, 1 lowercase letter and 1 number"),
    }).required();

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })


    const  LoginSubmit = async (data,{logingg})=>{
        dispatch({type:"SHOW_LOADING"});
        let rs = await ULogin(data,logingg?true:false);
        if(!rs.token) {
            dispatch({type:"HIDE_LOADING"});
            alert("Tài khoản hoặc mật khẩu không đúng");
            return ;
        }
        dispatch({type:"ADD_TOKEN",payload:rs.token})
        api.defaults.headers.common["Authorization"]=`Bearer ${rs.token}`

        setTimeout(()=>{
            dispatch({type:"HIDE_LOADING"});
        },1000)
        navigate("/u-profile");
    }

    const RegisterSubmmit = async (data)=>{

    }

    return (
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
                                <div class="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
                                    <form method='post' onSubmit={handleSubmit(LoginSubmit)}>
                                        <div class="form-group">
                                            <label for="singin-email">Enter Email address *</label>
                                            <input {...register("Email")} className={'form-control'} id="singin-email" />
                                            <span className='text-danger'>{errors.Email?.message}</span>
                                        </div>

                                        <div class="form-group">
                                            <label for="singin-password">Password *</label>
                                            <input type="password" {...register("Password")} class={"form-control"} />
                                            <span className='text-danger'>{errors.Password?.message}</span>
                                        </div>

                                        <div class="form-footer">
                                            <button type="submit" class="btn btn-outline-primary-2">
                                                <span>LOG IN</span>
                                                <i class="icon-long-arrow-right"></i>
                                            </button>

                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="signin-remember"/>
                                                <label class="custom-control-label" for="signin-remember">Remember Me</label>
                                            </div>

                                            <a href="#" class="forgot-link">Forgot Your Password?</a>
                                        </div>
                                    </form>
                                    <div class="form-choice">
                                        <p class="text-center">or sign in with</p>
                                        <div className='row justify-content-center'>
                                        <GoogleOAuthProvider clientId={ClientID} >
                                                    <GoogleLogin
                                                        onSuccess={credentialResponse => {
                                                            var decoded= jwt_decode(credentialResponse.credential)
                                                            LoginSubmit(decoded,{logingg:true});
                                                        }}
                                                        onError={() => {
                                                            console.log('Login Failed');
                                                        }}
                                                        //useOneTap
                                                    />
                                        </GoogleOAuthProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                                    <form action="#">
                                        <div class="form-group">
                                            <label for="register-email">Your email address *</label>
                                            <input type="email" class="form-control" id="register-email" name="register-email" required/>
                                        </div>

                                        <div class="form-group">
                                            <label for="register-password">Password *</label>
                                            <input type="password" class="form-control" id="register-password" name="register-password" required/>
                                        </div>

                                        <div class="form-footer">
                                            <button type="submit" class="btn btn-outline-primary-2">
                                                <span>SIGN UP</span>
                                                <i class="icon-long-arrow-right"></i>
                                            </button>

                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="register-policy" required/>
                                                <label class="custom-control-label" for="register-policy">I agree to the <a href="#">privacy policy</a> *</label>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="form-choice">
                                        <p class="text-center">or sign in with</p>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <a href="#" class="btn btn-login btn-g">
                                                    <i class="icon-google"></i>
                                                    Login With Google
                                                </a>
                                            </div>
                                            <div class="col-sm-6">
                                                <a href="#" class="btn btn-login  btn-f">
                                                    <i class="icon-facebook-f"></i>
                                                    Login With Facebook
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

    );
}
export default Login;