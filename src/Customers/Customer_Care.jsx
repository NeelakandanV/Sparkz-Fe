import React from 'react'
import BaseApp from '../Base/BaseApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { Url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';


const UserSchemaValidation = yup.object({
    Name:yup.string().required("!Name required"),  
    Query:yup.string().required("!Raise your query here")
})

function Customer_Care() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const Name = sessionStorage.getItem('Name')

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Name:Name,
            Query:""
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            CustCare(data.Query)
            // console.log(data)
        }
    })

    const CustCare = async(query)=>{
        try{
            const queryData = await axios.post(`${Url}/CustomerCare`,{"Query":query},{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            // console.log(queryData)
            toast.success(queryData.data.message)
            navigate("/Dashboard")
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }

  return (
    <BaseApp PageTitle="Customer Care">
        <div className='CustomeCare_Description'>
            <p>We value your feedback and are here to help! If you have a complaint or concern, please fill out our online form. Our dedicated team will review your submission promptly and Our team will reach you ASAP and work towards a satisfactory resolution. Your voice matters to us!</p>
        </div>
        <div className='AdminAdd_MainParent'>
            <div className='AdminAdd_LoginCont'>
                <div className='AdminAdd_FormCont'>
                    <h3>Reach us!!</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Your Name"
                            name = "Name"
                            value = {values.Name}/>
                            <br/>
                            {errors.Name && touched.Name ? <p style={{color:"crimson"}}>{errors.Name}</p>:""}
  
                        <textarea type="text" 
                        name='Query'
                        placeholder='Write your query here.'
                        value={values.Query}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                        <br/>
                        {errors.Query && touched.Query ? <p style={{color:"crimson"}}>{errors.Query}</p>:""}
                        <br/>
                        <Button type="submit" size="md"><FontAwesomeIcon icon={faPaperPlane} size="xl" style={{color: "#ffffff",}} />Send Query</Button>
                    </form>
                </div>
            </div>
        </div>
    </BaseApp>
  )
}

export default Customer_Care