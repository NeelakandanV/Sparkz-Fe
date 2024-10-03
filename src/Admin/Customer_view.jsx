import React, { useEffect, useState } from 'react'
import Admin_BaseApp from '../Base/Admin_BaseApp'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Url } from '../App';
import { toast } from 'react-toastify';

function Customer_view() {
    const [customers,setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = sessionStorage.getItem('token')
        if(token){
            const get_Customers = async()=>{
                try{
                    const getData = await axios.get(`${Url}/Admin/Customers`,{
                        headers :{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    //console.log(getData.data)
                    setCustomers(getData.data.Customer_Data)
                    toast.success(getData.data.message)
                }
                catch(err){
                    //console.log(err)
                    toast.error(err.response.data.message)
                    navigate("/")
                }
            }
            get_Customers();
        }
        else{
            navigate("/")
        }
    },[])

  return (
    <Admin_BaseApp PageTitle="Customers">
        <div className='Admin_CustPar'>
            {customers.map((cus,idx)=>(
                <div className='MajorityCust_Card' key={idx}>
                    <p><b>First Name{" "}:{" "}</b>{cus.First_Name}</p>
                    <p><b>Last Name{" "}:{" "}</b>{cus.Last_Name}</p>
                    <label><b>Email{" "}:{" "}</b>{cus.Email}</label>
                    <p><b>Status{" "}:{" "}</b>{cus.Status}</p>
                    <p><b>Referral Code{" "}:{" "}</b>{cus.ReferralCode}</p>
                    <p><b>Reward Points{" "}:{" "}</b>{cus.RewardPoints}</p>
                </div>
            ))}
        </div>
    </Admin_BaseApp>
  )
}

export default Customer_view