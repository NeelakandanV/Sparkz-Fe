import React, { useEffect } from 'react'
import BaseApp from '../Base/BaseApp'
import { useNavigate } from 'react-router-dom'

function Suggestions() {
    const navigate = useNavigate();

    useEffect(()=>{
        const token = sessionStorage.getItem('token')
        if(!token){
            navigate("/")
        }
    },[])
  return (
    <BaseApp PageTitle="Suggestions">
        <div className='Suggest_CustPar'>
            <div className='Suggest_ColorCard' >
                <p><b>Suggestion by Season</b></p>
                <img src="https://wallpapers.com/images/featured/winter-season-pictures-t6jheosv0awzd74t.jpg" alt='Season Image'/>
                <p>Embrace the season with a stunning color! 🌸🍂 Let your style bloom with the vibes! 💖</p>
                <button onClick={()=>navigate("/SuggestBySeason")}>Get Suggestions!</button>
            </div>
            <div className='Suggest_ColorCard' >
                <p><b>Suggestions by Mood </b></p>
                <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eea7899b-943f-4897-92b1-d3a71dc091e9/dfl381v-22659601-8435-4c8d-947b-b6fe7e5f3d64.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VlYTc4OTliLTk0M2YtNDg5Ny05MmIxLWQzYTcxZGMwOTFlOVwvZGZsMzgxdi0yMjY1OTYwMS04NDM1LTRjOGQtOTQ3Yi1iNmZlN2U1ZjNkNjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EXsB8tTQeJuBHAQ-q4DbhbkbCIHO4EbtONyxZiZlfAc" alt='Mood Image'/>
                <p>Choose a fantabulous color for your mood today! 🌈✨. Let your outfit shine with your vibe!</p>
                <button onClick={()=>navigate("/SuggestByMood")}>Get Suggestions!</button>
            </div>
            <div className='Suggest_ColorCard' >
                <p><b> Suggestion by Occasions</b></p>
                <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg" alt='Party Image'/>
                <p>Select the perfect color for your occasion! 🎉💼 Let your outfit dazzle for the moment! 💖</p>
                <button onClick={()=>navigate("/SuggestByOccasions")}>Get Suggestions!</button>
            </div>
            <div className='Suggest_ColorCard' >
                <p><b>Suggestions by Weather </b></p>
                <img src="https://imengine.public.prod.cmg.infomaker.io/?uuid=c1d3deeb-6e98-5e7e-a0c2-a3d30517b8e7&function=cropresize&type=preview&source=false&q=75&crop_w=0.99999&crop_h=0.99999&width=1200&height=675&x=1.0E-5&y=1.0E-5" alt='Weather Image'/>
                <p>Choose a fabulous color for today’s weather! ☀️🌧️ Let your outfit reflect the atmosphere! 💖</p>
                <button onClick={()=>navigate("/SuggestByWeather")}>Get Suggestions!</button>
            </div>
        </div>
    </BaseApp>
  )
}

export default Suggestions