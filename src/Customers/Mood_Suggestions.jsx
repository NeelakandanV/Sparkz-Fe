import React, { useState } from 'react'
import BaseApp from '../Base/BaseApp'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { Appstate } from '../AppContext/AppProvider'
import { Url } from '../App'
import { FormHelperText } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'


const UserSchemaValidation = yup.object({  
    Mood : yup.string().required("!Mood required")
})

function Mood_Suggestions() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const {All_Moods} = Appstate();
    const [moodColors,setMoodColors] = useState([]);

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Mood : ""
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            GetColors(data.Mood)
            //console.log(data)
        }
    })

    // Get  Colors
    const GetColors = async(id)=>{
        try{
            const verifyData = await axios.get(`${Url}/SuggestByMood/${id}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            // console.log(verifyData)
            toast.success(verifyData.data.message)
            setMoodColors(verifyData.data.find_MoodColor)
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }

    // Adding Color to favorites
    const FavColors = async(id)=>{
        try{
            const FavoriteColor = await axios.put(`${Url}/ColorToFavorite/${id}`,{},{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            toast.success(FavoriteColor.data.message)
        }
        catch(err){
            // console.log(err)
            toast.error(err.response.data.message)
        }
    }

  return (
    <BaseApp PageTitle="Suggestions by Mood">
        <div className='CustGet_MainParent'>
            <div className='CustGet_SuggestCont'>
                <div className='AdminAdd_FormCont'>
                    <h3>Select a Mood</h3>
                    <form onSubmit={handleSubmit}>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel id="demo-simple-select-helper-label">Moods</InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              name="Mood"
                              value={values.Mood}
                              label="Mood"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {All_Moods.map((dt,idx)=>(
                                <MenuItem value={dt} key={idx}>{dt}</MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>Select a Mood</FormHelperText>
                        </FormControl>
                        {errors.Mood && touched.Mood ? <p style={{color:"crimson"}}>{errors.Mood}</p>:""}

                        <br/>
                        <Button type="submit" size="md">Get Colors!</Button>{" "}
                        {" "}<Button onClick={()=>navigate("/Suggestions")}>Back</Button>
                    </form>
                </div>
            </div>
        </div>

        <div className='Suggest_CustPar'>
            {moodColors.map((col,idx)=>(
                <div className='Color_Card' style={{height:"450px"}} key={idx}>
                    <p><b>Color {" "}:{" "}</b>{col.Color_Name}</p>
                    <img src={col.Image} alt='Dress Image'/>
                    <p><b>Describes{" "}:{" "}</b>{col.Color_Look}</p>
                    <p><b>Fact{" "}:{" "}</b>{col.Fact}</p>
                    <button onClick={()=>FavColors(col._id)}>Add to Favorites⭐</button>
                </div>
            ))}
        </div>
    </BaseApp>
  )
}

export default Mood_Suggestions