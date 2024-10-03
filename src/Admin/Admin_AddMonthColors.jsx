import React from 'react'
import Admin_BaseApp from '../Base/Admin_BaseApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { Appstate } from '../AppContext/AppProvider'
import { Url } from '../App'
import { FormHelperText, TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'


const UserSchemaValidation = yup.object({  
  Color_Name : yup.string().required("!Name Required"),
  Color_Look : yup.string().required("!Description required"),
  Fact : yup.string().required("Single line of fact required"),
  Image : yup.string().required("!Image Url required-Image should be free of CopyRights"),
  Month : yup.string().required("!Month required")
})


function Admin_AddMonthColors() {

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')
  const {Months} = Appstate();

  // Form Validation
  const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
      initialValues:{
          Color_Name :"",
          Color_Look :"",
          Fact :"",
          Image :"",
          Month:""
      },
      validationSchema : UserSchemaValidation,
      onSubmit:(data)=>{
          AddColor(data)
          //console.log(data)
      }
  })

  // Adding a Color
  const AddColor = async(data)=>{
      try{
          const verifyData = await axios.post(`${Url}/Admin/AddMonthColor`,data,{
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":`Bearer ${token}`
              }
          })
          //console.log(verifyData)
          toast.success(verifyData.data.message)
          navigate("/Admin/MonthColor")
      }
      catch(err){
          //console.log(err)
          toast.error(err.response.data.message)
      }
  }
  

  return (
    <Admin_BaseApp PageTitle="Add Color for Month">
        <div className="Crebtn">
            <Button size="lg" onClick={()=>navigate("/Admin/MonthColor")}>⬅️Monthwise Colors</Button>
        </div>
        <div className='AdminAdd_MainParent'>
            <div className='AdminAdd_LoginCont'>
                <div className='AdminAdd_FormCont'>
                    <h3>Add a Color for Month</h3>
                    <form onSubmit={handleSubmit}>

                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Color"
                            helperText = "Enter Color Name"
                            name = "Color_Name"
                            value = {values.Color_Name}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Color_Name && touched.Color_Name ? <p style={{color:"crimson"}}>{errors.Color_Name}</p>:""}
                            
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Description"
                            helperText = "Describe in short"
                            name = "Color_Look"
                            value = {values.Color_Look}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Color_Look && touched.Color_Look ? <p style={{color:"crimson"}}>{errors.Color_Look}</p>:""}
    
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Fact"
                            helperText = "Enter Single line Email"
                            name = "Fact"
                            value = {values.Fact}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Fact && touched.Fact ? <p style={{color:"crimson"}}>{errors.Fact}</p>:""}
        
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Image Url"
                            helperText = "Image Url - should be copyrights free."
                            name = "Image"
                            value = {values.Image}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Image && touched.Image ? <p style={{color:"crimson"}}>{errors.Image}</p>:""}

                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                                <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
                                <Select
                                  labelId="demo-simple-select-helper-label"
                                  id="demo-simple-select-helper"
                                  name="Month"
                                  value={values.Month}
                                  label="Month"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  {Months.map((dt,idx)=>(
                                    <MenuItem value={dt} key={idx}>{dt}</MenuItem>
                                  ))}
                                </Select>
                                <FormHelperText>Select a Month</FormHelperText>
                            </FormControl>
                        {errors.Month && touched.Month ? <p style={{color:"crimson"}}>{errors.Month}</p>:""}

                        <br/>
                        <Button size="lg" type='submit'><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button>
                    </form>
                </div>
            </div>
        </div>       
    </Admin_BaseApp>
  )
}

export default Admin_AddMonthColors