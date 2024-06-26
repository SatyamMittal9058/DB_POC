import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import loginpage from '../css/LoginPage.module.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function LoginPage(){
    const [accessToken,setAccessToken]=useState("");
    const [cookies,setCookie,,]=useCookies("token");
    const navigate=useNavigate();
    useEffect(()=>{
        if(cookies.token) navigate('/dashboard');
    },[])
    return(
        <div className={loginpage.container}>
            <h1>Use Acces-Token</h1>
            <div className={loginpage.logincontainer}>
                <input className={loginpage.inputbox} type="text" placeholder="Enter Access-Token" value={accessToken} onChange={(e)=>setAccessToken(e.target.value)}/>
                <button className={loginpage.btn} onClick={()=>{
                    setCookie("token",accessToken);
                    navigate('/dashboard');
                    if(accessToken!=="") toast.success('Authentication Successfull');
                    else toast.error("Invalid Token");
                }}>Login</button>
            </div> 
        </div>
    )
}
export default LoginPage;