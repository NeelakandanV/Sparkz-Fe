import axios from "axios";
import { children, createContext, useContext, useEffect, useState } from "react";
import { Url } from "../App";

let AppContext = createContext("");

const AppProvider=({children})=>{
    const [server,setServer]=useState([]);
    const [colors,setColors] = useState([]);
    const [dailyColors,setDailyColors] = useState([]);
    const [monthColors,setMonthColors] = useState([]);

    const Dates = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

    const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const All_Moods = [
        "Confident",
        "Mysterious",
        "Sleek",
        "Calm",
        "Fresh",
        "Innocent",
        "Professional",
        "Trustworthy",
        "Cool",
        "Passionate",
        "Energetic",
        "Excited",
        "Warm",
        "Elegant",
        "Sophisticated",
        "Romantic",
        "Gentle",
        "Balanced",
        "Friendly",
        "Inviting",
        "Relaxed",
        "Grounded",
        "Luxurious",
        "Creative",
        "Dynamic",
        "Happy",
        "Cheerful",
        "Optimistic",
        "Playful",
        "Soothing",
        "Vintage",
        "Neutral",
        "Earthy",
        "Rich",
        "Timeless"
    ]

    const All_Weather = [
        "All Weather",
        "Sunny",
        "Clear",
        "Mild",
        "Cool",
        "Chilly",
        "Warm"
    ];

    const All_Seasons = [
        "All Year",
        "Spring",
        "Summer",
        "Fall",
        "Winter",
        "Rainy"
    ];

    const All_Occasions = [
        "Formal Events",
        "Cocktail Parties",
        "Evening Out",
        "Weddings",
        "Summer Parties",
        "Brunch",
        "Work",
        "Interviews",
        "Business Meetings",
        "Date Nights",
        "Holiday Parties",
        "Celebrations",
        "Dinner Parties",
        "Fall Gatherings",
        "Garden Parties",
        "Baby Showers",
        "Picnics",
        "Outdoor Events",
        "Art Shows",
        "Relaxed Gatherings",
        "Casual Outings",
        "Festivals",
        "Tropical Events",
        "Night Out",
        "Cozy Gatherings",
        "Harvest Festivals",
        "Tea Parties",
        "Spring Gatherings",
        "Home Events"
    ];

    useEffect(()=>{
        const getDetails = async()=>{
            try{
                //All colors
                const Backend_Data = await axios.get(`${Url}/`)
                setServer(Backend_Data)
            }
            catch(err){
                //console.log(err)
            }
        } 
        getDetails()
    },[])

    return(
        <AppContext.Provider 
        value={{server,setServer,colors,setColors,dailyColors,setDailyColors,monthColors,setMonthColors,All_Moods,All_Seasons,All_Occasions,All_Weather,Dates,Months}}>
            {children}
        </AppContext.Provider>
    );
}

export const Appstate = ()=>{
    return useContext(AppContext);
}

export default AppProvider;