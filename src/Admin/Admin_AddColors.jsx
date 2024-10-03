import React from 'react'
import Admin_BaseApp from '../Base/Admin_BaseApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { Appstate } from '../AppContext/AppProvider'
import { Url } from '../App'
import { TextField } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'


const UserSchemaValidation = yup.object({  
    Color_Name : yup.string().required("!Name Required"),
    Color_Look : yup.string().required("!Description required"),
    Fact : yup.string().required("Single line of fact required"),
    Image : yup.string().required("!Image Url required-Image should be free of CopyRights"),
    Mood : yup.array().of(yup.string()).min(1,"Kindly select atleast 1 Mood").required("!Mood type required"),
    Season : yup.array().of(yup.string()).min(1,"Kindly select atleast 1 Season").required("!Season required"),
    Weather : yup.array().of(yup.string()).min(1,"Kindly select atleast 1 Weather").required("!Weather required"),
    Occasions : yup.array().of(yup.string()).min(1,"Kindly select atleast 1 Occasion").required("!Occasions required")
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function Admin_AddColors() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const {All_Moods,All_Seasons,All_Weather,All_Occasions} = Appstate();

    // Form Validation
    const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
        initialValues:{
            Color_Name :"",
            Color_Look :"",
            Fact :"",
            Image :"",
            Mood :[],
            Season :[],
            Weather :[],
            Occasions :[]
        },
        validationSchema : UserSchemaValidation,
        onSubmit:(data)=>{
            AddColor(data)
            //console.log(data)
        }
    })

    // Adding a Color
    const AddColor = async(data)=>{
        try{
            const verifyData = await axios.post(`${Url}/Admin/AddColor`,data,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            //console.log(verifyData)
            toast.success(verifyData.data.message)
            navigate("/Admin/Colors")
        }
        catch(err){
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }
    

  return (
    <Admin_BaseApp PageTitle="Add Color">
        <div className="Crebtn">
            <Button size="lg" onClick={()=>navigate("/Admin/Colors")}>⬅️Colors</Button>
        </div>
        <div className='AdminAdd_MainParent'>
            <div className='AdminAdd_LoginCont'>
                <div className='AdminAdd_FormCont'>
                    <h3>Add a Color</h3>
                    <form onSubmit={handleSubmit}>

                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Color"
                            helperText = "Enter Color Name"
                            name = "Color_Name"
                            value = {values.Color_Name}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Color_Name && touched.Color_Name ? <p style={{color:"crimson"}}>{errors.Color_Name}</p>:""}
                            
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Description"
                            helperText = "Describe in short"
                            name = "Color_Look"
                            value = {values.Color_Look}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Color_Look && touched.Color_Look ? <p style={{color:"crimson"}}>{errors.Color_Look}</p>:""}
    
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Fact"
                            helperText = "Enter Single line Email"
                            name = "Fact"
                            value = {values.Fact}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Fact && touched.Fact ? <p style={{color:"crimson"}}>{errors.Fact}</p>:""}
        
                        <TextField fullWidth margin="dense" 
                            id = "outlined-helperText"
                            label = "Image Url"
                            helperText = "Image Url - should be copyrights free."
                            name = "Image"
                            value = {values.Image}
                            onChange = {handleChange}
                            onBlur = {handleBlur} /><br/>
                            {errors.Image && touched.Image ? <p style={{color:"crimson"}}>{errors.Image}</p>:""}

                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Moods</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              name = "Mood"
                              value={values.Mood}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              input={<OutlinedInput label="Tag" />}
                              renderValue={(selected) => selected.join(', ')}
                              MenuProps={MenuProps}
                            >
                              {All_Moods.map((mood,ind) => (
                                <MenuItem key={ind} value={mood}>
                                  <Checkbox checked={values.Mood.indexOf(mood) > -1} />
                                  <ListItemText primary={`${mood}`} />
                                </MenuItem>
                              ))}
                            </Select>
                        </FormControl>
                        {errors.Mood && touched.Mood ? <p style={{color:"crimson"}}>{errors.Mood}</p>:""}

                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Season</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              name = "Season"
                              value={values.Season}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              input={<OutlinedInput label="Tag" />}
                              renderValue={(selected) => selected.join(', ')}
                              MenuProps={MenuProps}
                            >
                              {All_Seasons.map((seas,ind) => (
                                <MenuItem key={ind} value={seas}>
                                  <Checkbox checked={values.Season.indexOf(seas) > -1} />
                                  <ListItemText primary={`${seas}`} />
                                </MenuItem>
                              ))}
                            </Select>
                        </FormControl>
                        {errors.Season && touched.Season ? <p style={{color:"crimson"}}>{errors.Season}</p>:""}

                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Weather</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              name = "Weather"
                              value={values.Weather}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              input={<OutlinedInput label="Tag" />}
                              renderValue={(selected) => selected.join(', ')}
                              MenuProps={MenuProps}
                            >
                              {All_Weather.map((wets,ind) => (
                                <MenuItem key={ind} value={wets}>
                                  <Checkbox checked={values.Weather.indexOf(wets) > -1} />
                                  <ListItemText primary={`${wets}`} />
                                </MenuItem>
                              ))}
                            </Select>
                        </FormControl>
                        {errors.Weather && touched.Weather ? <p style={{color:"crimson"}}>{errors.Weather}</p>:""}

                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Occasions</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              name = "Occasions"
                              value={values.Occasions}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              input={<OutlinedInput label="Tag" />}
                              renderValue={(selected) => selected.join(', ')}
                              MenuProps={MenuProps}
                            >
                              {All_Occasions.map((occs,ind) => (
                                <MenuItem key={ind} value={occs}>
                                  <Checkbox checked={values.Occasions.indexOf(occs) > -1} />
                                  <ListItemText primary={`${occs}`} />
                                </MenuItem>
                              ))}
                            </Select>
                        </FormControl>
                        {errors.Occasions && touched.Occasions ? <p style={{color:"crimson"}}>{errors.Occasions}</p>:""}
                        <br/>
                        <Button size="lg" type='submit'><FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color: "#d6dce6",}} />Create</Button>
                    </form>
                </div>
            </div>
        </div>
    </Admin_BaseApp>
   )
}

export default Admin_AddColors