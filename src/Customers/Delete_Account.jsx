import React from 'react'
import BaseApp from '../Base/BaseApp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { Url } from '../App';

const UserSchemaValidation = yup.object({
    OTP : yup.string().required("! OTP required")
})

function Delete_Account() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            OTP:""
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            DeleteAccount(data.OTP)
            // console.log(data)
        }
    })

    // Send Otp for deletion
    const Del_Otp = async()=>{
        try{
            const OtpData = await axios.put(`${Url}/DeleteOtp`,{},{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            // console.log(OtpData)
            toast.success(OtpData.data.message)
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }

    // Delete My Account
    const DeleteAccount = async(otp)=>{
        try{
            const delAcc = await axios.delete(`${Url}/DeleteAccount/${otp}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            // console.log(delData)
            toast.success(delAcc.data.message)
            navigate("/")
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }


  return (
    <BaseApp PageTitle="Delete my Account">
        <div className='AdminDash_Parent'>
            <div className='Reward_Counts'>
            <h2>We’re Sorry to See You Go!</h2>
            <p>Your account is important to us, and we’re here to help. If you choose to delete your account, all your favorites saved  will be permanently removed.</p>
            <p>We’d love to hear your feedback before you leave. If you have any questions or need assistance, please reach out!</p>
            </div>
        </div>

        <div className='AdminAdd_MainParent'>
            <div className='AdminAdd_LoginCont'>
                <div className='AdminAdd_FormCont'>
                    <label>Still no change of mind??{" "}</label>{" "}<Button onClick={()=>Del_Otp()} variant="primary" size="md"><FontAwesomeIcon icon={faPaperPlane} size="xl" style={{color: "#ffffff",}} />Send OTP</Button>
                    <form onSubmit={handleSubmit}>
                        <TextField margin="dense"
                            id = "outlined-helperText"
                            helperText = "Enter OTP received in your email"
                            label = "OTP"
                            name = "OTP"
                            value = {values.OTP}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                            <br/>
                            {errors.OTP && touched.OTP ? <p style={{color:"crimson"}}>{errors.OTP}</p>:""}
                            <Button type='submit' variant="danger" size="md"><FontAwesomeIcon icon={faTrash} size="xl" style={{color: "#ffffff",}} />Delete My Account</Button>
                    </form>
                </div>
            </div>
        </div>
    </BaseApp>
  )
}

export default Delete_Account