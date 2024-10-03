import React, { useEffect, useState } from 'react'
import BaseApp from '../Base/BaseApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

function Favorites() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const [favoCol,setFavoCol] = useState([]);
    const [myFavo,setMyFavo] = useState([]);

    useEffect(()=>{
        if(token){
            const get_Colors = async()=>{
                try{
                    const getData = await axios.get(`${Url}/Favorites`,{
                        headers :{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    // console.log(getData.data)
                    setFavoCol(getData.data.getFavoriteColors.FavoriteColors)
                    setMyFavo(getData.data.getFavorites)
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

    // Delete My Favorites
    const DeleteMyFavo = async(Id)=>{
        try{
            const delData = await axios.delete(`${Url}/DeleteFavorite/${Id}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            // console.log(delData)
            const newData = myFavo.filter((item)=>item._id!=Id)
            setMyFavo(newData)
            toast.success(delData.data.message)
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }


    // Remove Suggested Color added to Favorites
    const RemoveFavColors = async(Id)=>{
        try{
            const RemoveData = await axios.put(`${Url}/RemoveColor/${Id}`,{},{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            // console.log(RemoveData)
            const newData = favoCol.filter((item)=>item._id!=Id)
            setFavoCol(newData)
            toast.success(RemoveData.data.message)
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }

  return (
    <BaseApp PageTitle="My Favorites">
        <div className="Crebtn">
            <Button size="lg" onClick={()=>navigate("/AddFavorite")}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Add Favorites</Button>
        </div>
        
        <h3>My Favorites!</h3>
        <div className='Suggest_CustPar'>
            {myFavo.map((col,idx)=>(
                <div className='Suggest_ColorCard' style={{height:"fit-content"}} key={idx}>
                    <p><b>Dress Name {" "}:{" "}</b>{col.DressName}</p>
                    <p><b>Dress Color {" "}:{" "}</b>{col.DressColor}</p>
                    {col.Mood ? <p><b>Mood{" "}:{" "}</b>{col.Mood}</p>:""}
                    {col.Occasion ? <p><b>Occasion{" "}:{" "}</b>{col.Occasion}</p>:""}
                    <button onClick={()=>DeleteMyFavo(col._id)}>Delete Favorites⭐</button>
                </div>
            ))}
        </div>

        <hr/>
       
        <h3>Added from Suggested Colors!</h3>
        <div className='Suggest_CustPar'>
            {favoCol.map((col,idx)=>(
                <div className='Color_Card' style={{height:"450px"}} key={idx}>
                    <p><b>Color {" "}:{" "}</b>{col.Color_Name}</p>
                    <img src={col.Image} alt='Dress Image'/>
                    <p><b>Describes{" "}:{" "}</b>{col.Color_Look}</p>
                    <p><b>Fact{" "}:{" "}</b>{col.Fact}</p>
                    <button onClick={()=>RemoveFavColors(col._id)}>Remove from Favorites⭐</button>
                </div>
            ))}
        </div>

    </BaseApp>
  )
}

export default Favorites