import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Url } from '../App';

function UserVerification(){
    const {id,pin,token} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const verify = async()=>{
            try{
                const verifyUser = await axios.get(`${Url}/VerifyUser/${id}/${pin}/${token}`)
                toast.success(verifyUser.data.message)
                navigate("/Login")
            }
            catch(err){
                toast.error(err.response.data.message)
                navigate("/Login")
            }
        }
        verify()
    },[])
    
  return (
    <div className='Auth_MainParent'></div>
  )
}

export default UserVerification;