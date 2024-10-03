import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Url } from '../App';
import BaseApp from '../Base/BaseApp';

function Rewards() {
    const [reward,setReward] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = sessionStorage.getItem('token')
        if(token){
            const getReward = async()=>{
                try{
                    const refers = await axios.get(`${Url}/Rewards`,{
                        headers :{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    // console.log(refers.data)
                    setReward(refers.data.user)
                    toast.success(refers.data.message)
                }
                catch(err){
                    // console.log(err)
                    toast.error(err.response.data.message)
                }
            }
            getReward();
        }
        else{
            navigate("/")
        }
    },[])

  return (
    <BaseApp PageTitle="Refer & Earn">
        <div className='AdminDash_Parent'>
            <div className='RewardPar'>
                <div className='RewardCard' style={{height:"fit-content"}}>
                    <p><b>Referral Code : {reward.ReferralCode}</b></p>
                </div> 
                <div className='RewardCard' style={{height:"fit-content"}}>
                    <p><b>Reward Points: {reward.RewardPoints}</b></p>
                </div>
            </div>
            <div className='Reward_Counts'>
                <h2>Welcome {reward.First_Name} ,</h2>
                <h3>Unlock Surprises with Every Referral! 🎁</h3>
                <p>Join our referral program and start earning points for every friend you invite! When your friend create an account with your invite code on our platform, you’ll collect points that bring you closer to exclusive rewards.</p>
                <h3>✨ Reach 1000 points and receive a surprise gift! ✨</h3>
                <p>We can’t wait to show our appreciation for your support. The more you refer, the more surprises await you! Start sharing and let the fun begin!</p>
            </div>
        </div>
    </BaseApp>
  )
}

export default Rewards