import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Admin_BaseApp from '../Base/Admin_BaseApp';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Url } from '../App';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


function Admin_GetOneColor() {
    const [oneColor,setOneColor] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [occs,setOccs] = useState([]);
    const [mod,setMod] = useState([]);
    const [ses,setSes] = useState([]);
    const [wet,setWet] = useState([]);

    useEffect(()=>{
        const token = sessionStorage.getItem('token')
        if(token){
            const get_Colors = async()=>{
                try{
                    const getData = await axios.get(`${Url}/Admin/GetColor/${id}`,{
                        headers :{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    // console.log(getData.data)
                    setOneColor(getData.data.Color_Data)
                    setOccs(getData.data.Color_Data.Occasions)
                    setSes(getData.data.Color_Data.Season)
                    setWet(getData.data.Color_Data.Weather)
                    setMod(getData.data.Color_Data.Mood)
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

  return (
    <Admin_BaseApp PageTitle="Color Detail">
        <div className="Crebtn">
            <Button size="lg" onClick={()=>navigate("/Admin/AddColor")}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button>
        </div>

        <div className='Admin_CustPar'>
            <div className='Color_Card OneColor'>
                <p><b>Color {" "}:{" "}</b>{oneColor.Color_Name}</p>
                <img src={oneColor.Image} alt='Dress Image'/>
                <p><b>Describes{" "}:{" "}</b>{oneColor.Color_Look}</p>
                <p><b>Fact{" "}:{" "}</b>{oneColor.Fact}</p>
                <p><b>Moods{" "}:{" "}</b>{mod.map((one,idex)=>(<label key={idex}>{one}{" "},{" "}</label>))}</p>
                <p><b>Weather{" "}:{" "}</b>{wet.map((one,idex)=>(<label key={idex}>{one}{" "},{" "}</label>))}</p>
                <p><b>Season{" "}:{" "}</b>{ses.map((one,idex)=>(<label key={idex}>{one}{" "},{" "}</label>))}</p>
                <p><b>Occasions{" "}:{" "}</b>{occs.map((one,idex)=>(<label key={idex}>{one}{" "},{" "}</label>))}</p>
                <button onClick={()=>navigate(`/Admin/Colors`)}>Back to Colors</button>
                <button onClick={()=>navigate(`/Admin/UpdateColor/${oneColor._id}`)}>Update</button>
            </div>
        </div>
    </Admin_BaseApp>
  )
}

export default Admin_GetOneColor