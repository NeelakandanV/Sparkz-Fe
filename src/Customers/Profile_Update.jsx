import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Url } from '../App';
import BaseApp from '../Base/BaseApp';

const UserSchemaValidation = yup.object({  
    First_Name:yup.string().required("!Kindly Enter your First Name"),
    Last_Name:yup.string().required("!Kindly Enter your Last Name"),
    Email: yup.string().required("!Email required"),
    Password: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required"),
    SkinTone:yup.string()
})
function Update_Profile() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const Name = sessionStorage.getItem('Name')

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            First_Name:Name,
            Last_Name:"",
            Email : "********************",
            Password : "**********",
            SkinTone:""
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
            const verifyData = await axios.put(`${Url}/UpdateProfile`,data,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            //console.log(verifyData)
            toast.success(verifyData.data.message)
            navigate("/Dashboard")
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }


  return (
    <BaseApp PageTitle="Update Profile">
        <div className='AdminAdd_MainParent'>
            <div className='AdminAdd_LoginCont'>
                <div className='AdminAdd_FormCont'>
                    <h3>Update your Profile</h3>
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
                            helperText = "Email can't be changed"
                            name = "Email"
                            value = {values.Email} /><br/>
                            {errors.Email && touched.Email ? <p style={{color:"crimson"}}>{errors.Email}</p>:""}
        
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Password"
                            helperText = "Password can't be changed.Try to reset while login."
                            name = "Password"
                            value = {values.Password} /><br/>
                            {errors.Password && touched.Password ? <p style={{color:"crimson"}}>{errors.Password}</p>:""}
    
                            <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Skintone"
                            helperText = "Enter your Skintone"
                            name = "SkinTone"
                            value = {values.SkinTone}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                        <p>To see updated details,Login Again!</p>
                        <Button type="submit" size="md">⬆️ Update</Button>{" "}
                        {" "}<Button onClick={()=>navigate("/Dashboard")}>Back</Button>
                    </form>
                </div>
            </div>
        </div>
    </BaseApp>
  )
}

export default Update_Profile;