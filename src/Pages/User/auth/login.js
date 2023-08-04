import { GoogleLogin  } from '@react-oauth/google';
import React,{useContext, useState} from 'react';
import jwt_decode from "jwt-decode";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import api from '../../../Service/api';
import { ULogin } from '../../../Service/auth.service';
import UserContext from '../../../context/userContext';
import { useNavigate  } from 'react-router-dom';

const Login =()=>{
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
        localStorage.setItem("token",rs.token)
        setTimeout(()=>{
            dispatch({type:"HIDE_LOADING"});
        },1000);
        dispatch({type:"HIDE_AUTH_MODAL"});
        navigate("/u-profile");
    }
    return (
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
                                            <button type="submit" class="btn btn-outline-primary-2" on>
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
                                                    <GoogleLogin
                                                        onSuccess={credentialResponse => {
                                                            var decoded= jwt_decode(credentialResponse.credential)
                                                            LoginSubmit(decoded,{logingg:true});
                                                        }}
                                                        onError={() => {
                                                            alert('Login Failed');
                                                        }}
                                                    />
                                        </div>
                                    </div>
                                </div>
    );

}
export default Login;