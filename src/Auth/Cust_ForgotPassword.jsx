import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Url } from '../App';


const UserSchemaValidation = yup.object({
  Email: yup.string().email("!Invalid Email format").required("!Email required"),
})


function User_ForgotPassword() {
  const navigate = useNavigate();  

  // Clearing session storage
  useEffect(()=>{
      sessionStorage.clear()
  },[])

  // Form Validation
  const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
      initialValues:{
          Email : ""
      },
      validationSchema : UserSchemaValidation,
      onSubmit:(data)=>{
          verifyEmail(data)
          //console.log(data)
      }
  })

  // Creating Password Reset Link
  const verifyEmail = async(data)=>{
      try{
          const verifyData = await axios.put(`${Url}/ForgotPassword`,data,{
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
            <div className='Auth_ImageCont'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXHt7u8S8benfDnzRxzOOU0--NKthaMo6zpQ&usqp=CAU"></img>
            </div>
            <div className='Auth_FormCont'>
                <h4>Forgot Your Password?</h4>
                <p>We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>

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
    

                    <Button type="submit" size="sm">Send Reset Link</Button>
                    <hr></hr>
                </form>
            </div>
            <label>Remember your Password! :{" "}</label>
            <Link to="/Login">Login!!</Link><br/>
            <label>Don't have an account? :{" "}</label>
            <Link to="/Register">Register Now!</Link>
        </div>
    </div>
  )
}

export default User_ForgotPassword;