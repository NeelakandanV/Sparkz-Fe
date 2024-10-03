import React from 'react'
import BaseApp from '../Base/BaseApp'
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Url } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


const UserSchemaValidation = yup.object({  
    DressName:yup.string().required("!Enter your Dress Name"),
    DressColor:yup.string().required("!Enter your Dress Color"),
    Occasion: yup.string(),
    Mood: yup.string()
})


function Add_Favorites() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            DressName :"",
            DressColor :"",
            Occasion : "",
            Mood : "",
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            MyFavs(data)
            //console.log(data)
        }
    })

    const MyFavs = async(data)=>{
        try{
            const verifyData = await axios.post(`${Url}/AddFavorite`,data,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            //console.log(verifyData)
            toast.success(verifyData.data.message)
            navigate("/Favorites")
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }


  return (
    <BaseApp PageTitle="Add my Favorite">
        <div className='AdminAdd_MainParent'>
            <div className='AdminAdd_LoginCont'>
                <div className='AdminAdd_FormCont'>
                    <h3>Add Favorite Dress</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Dress Name"
                            helperText = "Enter Your Dress Name"
                            name = "DressName"
                            value = {values.DressName}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.DressName && touched.DressName ? <p style={{color:"crimson"}}>{errors.DressName}</p>:""}
                            
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Dress Color"
                            helperText = "Enter Your Dress Color"
                            name = "DressColor"
                            value = {values.DressColor}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.DressColor && touched.DressColor ? <p style={{color:"crimson"}}>{errors.DressColor}</p>:""}
    
                            <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Occasions"
                            helperText = "Enter Occasions suitable for"
                            name = "Occasion"
                            value = {values.Occasion}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Occasion && touched.Occasion ? <p style={{color:"crimson"}}>{errors.Occasion}</p>:""}
        
    
                            <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Moods"
                            helperText = "Enter Moods suitable for"
                            name = "Mood"
                            value = {values.Mood}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Mood && touched.Mood ? <p style={{color:"crimson"}}>{errors.Mood}</p>:""}<br/>
                        <Button type="submit" size="md"><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Add Favos</Button>{" "}
                        {" "}<Button onClick={()=>navigate("/Favorites")}>Back</Button>
                    </form>
                </div>
            </div>
        </div>
    </BaseApp>
  )
}

export default Add_Favorites