
import { GoogleLogin  } from '@react-oauth/google';
import React,{useState,useContext} from 'react';
import jwt_decode from "jwt-decode";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import UserContext from '../../../context/userContext';
import { CheckEmail, Uregister } from '../../../Service/auth.service';
import { useNavigate  } from 'react-router-dom';

const ERR={
    PASSWORD:"Password must contain 1 uppercase letter, 1 lowercase letter and 1 number",
    EMAIL:"Email existed"
};


const Register= () =>{
    const {state,dispatch}=useContext(UserContext)
    let navigate = useNavigate();
    const schema =yup.object({
        Email:yup.string().required().email("Please Enter Email").min(10).max(50).test('isExist',ERR.EMAIL,async (value)=>{
            let check=false;
            await CheckEmail(value).then(e=>check=e);
            return !check;
        }),
        Password:yup.string().required().min(8).max(50).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\W]).{8,}$/,ERR.PASSWORD),
        Gender:yup.number().required().min(0).max(1),
        Birthday:yup.date().required().min("1917-01-01").max("2017-01-01"),
        FirstName:yup.string().required().min(3),
        LastName:yup.string().required().min(3),
    }).required();

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })
    const RegisterSubmmit = async (data)=>{
        dispatch({type:"SHOW_LOADING"})
        await Uregister(data).then(e=>{
            if(e){navigate("/login")}
            else{alert("Register failed")}
        })
        dispatch({type:"HIDE_LOADING"})
    }
    return (
        <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                                    <form  onSubmit={handleSubmit(RegisterSubmmit)} method='post'>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="FirstName">FirstName  <span className='text-danger'>*</span></label>
                                                    <input type="text" {...register("FirstName")}  class="form-control" id='FirstName'/>
                                                    <span className='text-danger'>{errors.FirstName?.message}</span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="LastName">LastName  <span className='text-danger'>*</span></label>
                                                    <input type="text" {...register("LastName")}  class="form-control" id='LastName'/>
                                                    <span className='text-danger'>{errors.LastName?.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="register-email">Your Email  <span className='text-danger'>*</span></label>
                                            <input type="email" {...register("Email")} class="form-control" id='register-email'/>
                                            <span className='text-danger'>{errors.Email?.message}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="password">Your Password  <span className='text-danger'>*</span></label>
                                            <input type="password" {...register("Password")} class="form-control" id='password'/>
                                            <span className='text-danger'>{errors.Password?.message}</span>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="gender">Gender <span className='text-danger'>*</span></label>
                                                    <select   class='form-control' id='gender' {...register("Gender")}>
                                                        <option selected>Select Gender </option>
                                                        <option value={1}>Male</option>
                                                        <option value={0}>FeMale</option>
                                                    </select>
                                                    <span className='text-danger'>{errors.Gender?.message}</span>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="birthday">Birthday  <span className='text-danger'>*</span></label>
                                                    <input type="date" {...register("Birthday")}  class="form-control" id='birthday'/>
                                                    <span className='text-danger'>{errors.Birthday?.message}</span>
                                                </div>
                                            </div>
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
                                        <div className='row justify-content-center'>
                                            <GoogleLogin
                                                    onSuccess={credentialResponse => {
                                                    var decoded= jwt_decode(credentialResponse.credential)
                                                    RegisterSubmmit(decoded);
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
export default Register;