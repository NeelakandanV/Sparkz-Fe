import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Admin_BaseApp from '../Base/Admin_BaseApp';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Url } from '../App';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Appstate } from '../AppContext/AppProvider';

function Admin_MonthColor() {
    const {monthColors,setMonthColors} = Appstate();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')

    useEffect(()=>{
        if(token){
            const get_Colors = async()=>{
                try{
                    const getData = await axios.get(`${Url}/Admin/MonthColor`,{
                        headers :{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    // console.log(getData.data)
                    setMonthColors(getData.data.Color_Data)
                    toast.success(getData.data.message)
                }
                catch(err){
                    // console.log(err)
                    toast.error(err.response.data.message)
                    navigate("/")
                }
            }
            get_Colors();
        }
        else{
            navigate("/")
        }
    },[])


    // For delete a Color
    const delData = async(Id)=>{
        try{
            const response = await axios.delete(`${Url}/Admin/DeleteMonthColor/${Id}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            //console.log(response);
            toast.success(response.data.message)
            const data = monthColors.filter((emp)=>emp._id!=Id)
            setMonthColors(data)
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }


  return (
    <Admin_BaseApp PageTitle="Monthwise Colors">
        <div className="Crebtn">
            <Button size="lg" onClick={()=>navigate("/Admin/AddMonthColor")}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button>
        </div>

        <div className='Admin_CustPar'>
            {monthColors.map((col,idx)=>(
                <div className='Color_Card' key={idx}>
                    <p><b>Color {" "}:{" "}</b>{col.Color_Name}</p>
                    <img src={col.Image} alt='Dress Image'/>
                    <p><b>Describes{" "}:{" "}</b>{col.Color_Look}</p>
                    <p><b>Fact{" "}:{" "}</b>{col.Fact}</p>
                    <p><b>Month{" "}:{" "}</b>{col.Month}</p>
                    <button onClick={()=>navigate(`/Admin/UpdateMonthColor/${col._id}`)}>Update</button>
                    <button onClick={()=>delData(col._id)}>Delete</button>
                </div>
            ))}
        </div>
    </Admin_BaseApp>
  )
}

export default Admin_MonthColor