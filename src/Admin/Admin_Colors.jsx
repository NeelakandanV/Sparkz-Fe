import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Admin_BaseApp from '../Base/Admin_BaseApp';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Url } from '../App';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Appstate } from '../AppContext/AppProvider';

function Admin_Colors() {
    const {colors,setColors} = Appstate();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')

    useEffect(()=>{
        if(token){
            const get_Colors = async()=>{
                try{
                    const getData = await axios.get(`${Url}/Admin/Colors`,{
                        headers :{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    // console.log(getData.data)
                    setColors(getData.data.Color_Data)
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
            const response = await axios.delete(`${Url}/Admin/DeleteColor/${Id}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            //console.log(response);
            toast.success(response.data.message)
            const data = colors.filter((emp)=>emp._id!=Id)
            setColors(data)
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }


    // For Pagination
    const [CurrPage,setCurrPage] = useState(1);
    let DataPerPage = 7;
    let TotalPage = Math.ceil(colors.length/DataPerPage);
    const LastIndex = CurrPage*DataPerPage;
    const FirstIndex = LastIndex-DataPerPage;
    const PageData = colors.slice(FirstIndex,LastIndex);
    const PageNumbers = [...Array(TotalPage+1).keys()].slice(1);


    const PrevPage = ()=>{
        if(CurrPage!==1){
            setCurrPage(CurrPage-1);
        }
    }
    
    const NextPage = ()=>{
        if(CurrPage !== TotalPage){
            setCurrPage(CurrPage+1);
        }
    }
    
    const PageNav = (PageNo)=>{
        setCurrPage(PageNo)
    }

  return (
    <Admin_BaseApp PageTitle="Colors">
        <div className="Crebtn">
            <Button size="lg" onClick={()=>navigate("/Admin/AddColor")}><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button>
        </div>

        <div className='Admin_CustPar'>
            {PageData.map((col,idx)=>(
                <div className='Color_Card' key={idx}>
                    <p><b>Color {" "}:{" "}</b>{col.Color_Name}</p>
                    <img src={col.Image} alt='Dress Image'/>
                    <p><b>Describes{" "}:{" "}</b>{col.Color_Look}</p>
                    <p><b>Fact{" "}:{" "}</b>{col.Fact}</p>
                    <button onClick={()=>navigate(`/Admin/GetColor/${col._id}`)}>View</button>
                    <button onClick={()=>navigate(`/Admin/UpdateColor/${col._id}`)}>Update</button>
                    <button onClick={()=>delData(col._id)}>Delete</button>
                </div>
            ))}
        </div>

        <div className="UserPagiCont">
            <p>Page : {CurrPage} of {TotalPage}</p>
            <nav className="Pagination">
                <a href="#" onClick={PrevPage}>Prev</a>
                {PageNumbers.map((num,index)=>(
                    <a href="#" key={index}
                    onClick ={()=>PageNav(num)}
                    >
                        {num}
                    </a>
                ))}
                <a href="#" onClick={NextPage}> Next</a>
            </nav>
        </div>
    </Admin_BaseApp>
  )
}

export default Admin_Colors