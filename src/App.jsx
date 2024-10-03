import { createBrowserRouter as Router, RouterProvider } from 'react-router-dom';
import './App.css'
import './Admin/Admin.css'
import './Customers/Customer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseApp from './Base/BaseApp';
import ErrorPage from './Auth/NoPage';
import Admin_BaseApp from './Base/Admin_BaseApp';
import Guest_Dashboard from './Base/Guest_View';
import User_Login from './Auth/Customer_Login';
import User_Signup from './Auth/Customer_Signup';
import User_ForgotPassword from './Auth/Cust_ForgotPassword';
import User_ResetPassword from './Auth/Cust_ResetPassword';
import VerifyUser from './Auth/Cust_VerifyLink';
import UserVerification from './Auth/Cust_AccountVerification';
import Admin_Login from './Auth/Admin _Login';
import Admin_ForgotPassword from './Auth/Admin_ForgotPassword';
import Admin_ResetPassword from './Auth/Admin_ResetPassword';
import Admin_Dashboard from './Admin/Admin_Dashboard';
import Customer_view from './Admin/Customer_view';
import Admin_Colors from './Admin/Admin_Colors';
import Admin_AddColors from './Admin/Admin_AddColors';
import Admin_UpdateColor from './Admin/Admin_UpdateColor';
import Admin_GetOneColor from './Admin/Admin_GetOneColor';
import Admin_DailyColor from './Admin/Admin_DailyColor';
import Admin_AddDailyColors from './Admin/Admin_AddDailyColor';
import Admin_UpdateDailyColors from './Admin/Admin_UpdateDailyColor';
import Admin_MonthColor from './Admin/Admin_MonthColor';
import Admin_AddMonthColors from './Admin/Admin_AddMonthColors';
import Admin_UpdateMonthColor from './Admin/Admin_UpdateMonthColor';
import Dashboard from './Customers/Dashboard';
import Update_Profile from './Customers/Profile_Update';
import Suggestions from './Customers/Suggestions';
import Mood_Suggestions from './Customers/Mood_Suggestions';
import Season_Suggestions from './Customers/Season_Suggestions';
import Weather_Suggestions from './Customers/Weather_Suggestions';
import Occasion_Suggestions from './Customers/Occasion_Suggestions';
import Favorites from './Customers/Favorites';
import Add_Favorites from './Customers/Add_Favorites';
import Customer_Care from './Customers/Customer_Care';
import Rewards from './Customers/Rewards';
import Delete_Account from './Customers/Delete_Account';


// Backend Url
export const Url = "https://sparkz.onrender.com";

const routes = Router([
  {
    path:"/",
    element:<Guest_Dashboard/>
  },{
    path:"/Login",
    element:<User_Login/>
  },{
    path:"/Register",
    element:<User_Signup/>
  },{
    path:"/ForgotPassword",
    element:<User_ForgotPassword/>
  },{
    path:"/ResetPassword/:id/:pin/:token",
    element:<User_ResetPassword/>
  },{
    path:"/VerifyAccount",
    element:<VerifyUser/>
  },{
    path:"/VerifyUser/:id/:pin/:token",
    element : <UserVerification/>
  },{
    path:"/Admin/Login",
    element:<Admin_Login/>
  },{
    path:"/Admin/ForgotPassword",
    element:<Admin_ForgotPassword/>
  },{
    path:"/Admin/ResetPassword/:id/:pin/:token",
    element:<Admin_ResetPassword/>
  },{
    path:"/Admin/Dashboard",
    element:<Admin_Dashboard/>
  },{
    path:"/Admin/Customers",
    element:<Customer_view/>
  },{
    path:"/Admin/Colors",
    element:<Admin_Colors/>
  },{
    path:"/Admin/AddColor",
    element:<Admin_AddColors/>
  },{
    path:"/Admin/UpdateColor/:id",
    element:<Admin_UpdateColor/>
  },{
    path:"/Admin/GetColor/:id",
    element:<Admin_GetOneColor/>
  },{
    path:"/Admin/DailyColor",
    element:<Admin_DailyColor/>
  },{
    path:"/Admin/AddDailyColor",
    element:<Admin_AddDailyColors/>
  },{
    path:"/Admin/UpdateDailyColor/:id",
    element:<Admin_UpdateDailyColors/>
  },{
    path:"/Admin/MonthColor",
    element:<Admin_MonthColor/>
  },{
    path:"/Admin/AddMonthColor",
    element:<Admin_AddMonthColors/>
  },{
    path:"/Admin/UpdateMonthColor/:id",
    element:<Admin_UpdateMonthColor/>
  },{
    path:"/Dashboard",
    element:<Dashboard/>
  },{
    path:"/UpdateProfile",
    element:<Update_Profile/>
  },{
    path:"/Suggestions",
    element:<Suggestions/>
  },{
    path:"/SuggestByMood",
    element:<Mood_Suggestions/>
  },{
    path:"/SuggestBySeason",
    element:<Season_Suggestions/>
  },{
    path:"/SuggestByWeather",
    element:<Weather_Suggestions/>
  },{
    path:"/SuggestByOccasions",
    element:<Occasion_Suggestions/>
  },{
    path:"/Favorites",
    element:<Favorites/>
  },{
    path:"/AddFavorite",
    element:<Add_Favorites/>
  },{
    path:"/CustomerCare",
    element:<Customer_Care/>
  },{
    path:"/Rewards",
    element:<Rewards/>
  },{
    path:"/DeleteAccount",
    element:<Delete_Account/>
  },{
    path:"*",
    element:<ErrorPage/>
  }
])

function App() {

  return (
    <>
    <RouterProvider router={routes}/>
    <ToastContainer autoClose={1500} />
    </>
  )
}

export default App
