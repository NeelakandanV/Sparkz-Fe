import React, { useEffect, useState } from 'react'
import Admin_BaseApp from '../Base/Admin_BaseApp'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Url } from '../App';


function Admin_Dashboard() {
    const [adminDash,setAdminDash] = useState([]);
    const [daily,setDaily] = useState([]);
    const [monthy,setMonthy] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = sessionStorage.getItem('token')
        if(token){
            const getDashboard = async()=>{
                try{
                    const Color_Data = await axios.get(`${Url}/Admin/Dashboard`,{
                        headers :{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    // console.log(Color_Data.data)
                    setAdminDash(Color_Data.data)
                    setDaily(Color_Data.data.Daily_Color[0])
                    setMonthy(Color_Data.data.Monthly_Color[0])
                    toast.success(Color_Data.data.message)
                }
                catch(err){
                    // console.log(err)
                    toast.error("Unauthorized!")
                    navigate("/")
                }
            }
            getDashboard();
        }
        else{
            navigate("/")
        }
    },[])

  return (
    <Admin_BaseApp PageTitle="Dashboard">
        <div className='AdminDash_Parent'>
            <div className='Admin_Counts'>
                <label><b>Customers{" "}:{" "}{adminDash.Cust}+</b></label>
                <label><b>Colors{" "}:{" "}{adminDash.Total_Colors}+</b></label>
            </div>
            <div className='Admin_CountPar'>
                <div className='MajorityColor_Card'>
                    <p><b>Most Preferred Color</b></p>
                    <p><b>Color</b> : Black </p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqIPC7qaZsCFaObqZMdQg6NTQ_mmjsgeifA&s" alt="Black Dress"/>
                    <p><b>Describes</b> : Power and sophistication </p>
                    <p><b>Fact</b> : Can evoke feelings of elegance and sophistication </p>
                </div> 
                <div className='MajorityColor_Card'>
                    <p><b>Color of the Day</b></p>
                    <p><b>Color</b> : {daily.Color_Name} </p>
                    <img src={daily.Image} alt="Dress Image"/>
                    <p><b>Describes</b> : {daily.Color_Look}</p>
                    <p><b>Fact</b> : {daily.Fact}</p>
                </div>
                <div className='MajorityColor_Card'>
                    <p><b>Color of the Month</b></p>
                    <p><b>Color</b> : {monthy.Color_Name}</p>
                    <img src={monthy.Image} alt="Dress Image"/>
                    <p><b>Describes</b> : {monthy.Color_Look}</p>
                    <p><b>Fact</b> : {monthy.Fact}</p>
                </div>
            </div>
        </div>
    </Admin_BaseApp>
  )
}

export default Admin_Dashboard