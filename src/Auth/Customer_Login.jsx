import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {  Link, useNavigate } from 'react-router-dom';
import { Url } from '../App';

const UserSchemaValidation = yup.object({
    Email: yup.string().email("!Invalid Email format").required("!Email required"),
    Password: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required")
})
function User_Login() {
    const navigate = useNavigate();

    // Clearing session storage
    useEffect(()=>{
        sessionStorage.clear()
        setTimeout(()=>{
            alert("Initial request may take longer time!")
        },1000)
    },[])

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Email : "",
            Password : ""
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            verifyLogin(data)
            //console.log(data)
        }
    })

    // Checking login credentilals
    const verifyLogin = async(data)=>{
        try{
            const verifyData = await axios.post(`${Url}/Login`,data,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            //console.log(verifyData)
            const token = verifyData.data.token;
            sessionStorage.setItem('Name',verifyData.data.user.First_Name)
            sessionStorage.setItem('token',token)
            toast.success(verifyData.data.message)
            navigate("/Dashboard")
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }


  return (
    <div className='Auth_MainParent'>
        <div className='Auth_LoginCont'>
            <div className='Auth_FormCont'>
                <h3>Login Here!!</h3>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Email Id"
                        helperText = "Enter Your Email"
                        name = "Email"
                        value = {values.Email}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Email && touched.Email ? <p style={{color:"crimson"}}>{errors.Email}</p>:""}
    
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Password"
                        helperText = "Enter Your Password"
                        name = "Password"
                        value = {values.Password}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Password && touched.Password ? <p style={{color:"crimson"}}>{errors.Password}</p>:""}
                    
                    <label>Forgot your Password? :{" "}</label>
                    <Link to="/ForgotPassword">Click here!!</Link><br/>
                    <label>Don't have an Account? :{" "}</label>
                    <Link to="/Register">Register!!</Link><br/>
                    <Button type="submit" size="md">Login</Button>
                    <hr></hr>
                </form>
            </div>
            <label>Verify your Account :{" "}</label>
            <Link to="/VerifyAccount">Verify now!!</Link><br/>
            <p><sub>(Only verfied accounts can login in!)</sub></p>
        </div>
    </div>
  )
}

export default User_Login;