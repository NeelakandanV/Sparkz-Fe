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
    First_Name:yup.string().required("!Kindly Enter your First Name"),
    Last_Name:yup.string().required("!Kindly Enter your Last Name"),
    Email: yup.string().email("!Invalid Email format").required("!Email required"),
    Password: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required"),
    InviteCode:yup.string()
})
function User_Signup() {
    const navigate = useNavigate();

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            First_Name:"",
            Last_Name:"",
            Email : "",
            Password : "",
            InviteCode:""
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
            const verifyData = await axios.post(`${Url}/Register`,data,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            //console.log(verifyData)
            toast.success(verifyData.data.message)
            navigate("/Login")
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
                <h3>Signup Here!!</h3>
                <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "First Name"
                        helperText = "Enter Your First Name"
                        name = "First_Name"
                        value = {values.First_Name}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.First_Name && touched.First_Name ? <p style={{color:"crimson"}}>{errors.First_Name}</p>:""}
                        
                        <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Last Name"
                        helperText = "Enter Your Last Name"
                        name = "Last_Name"
                        value = {values.Last_Name}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Last_Name && touched.Last_Name ? <p style={{color:"crimson"}}>{errors.Last_Name}</p>:""}

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

                        <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Invite Code"
                        helperText = "Enter invite Code"
                        name = "InviteCode"
                        value = {values.InviteCode}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                    
                    <Button type="submit" size="md">Signup</Button>
                    <hr></hr>
                    <label>Forgot your Password? :{" "}</label>
                    <Link to="/ForgotPassword">Click here!!</Link><br/>
                    <label>Already have an account! :{" "}</label>
                    <Link to="/Login">Login!!</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default User_Signup;