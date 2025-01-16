import React, { useContext, useState } from 'react'
import { Context } from '../main'
import {Navigate} from 'react-router-dom';

const Auth = () => {
    const {isAuthenticated} = useContext(Context);
    const [isLogin, setIsLogin] = useState(true)
    if(isAuthenticated){
        return <Navigate to={"/"} />
    }
  return (
    <div className='auth-page'>
        <div className='auth-container'>
            <div className='auth-toggle'>
                <button className={`toggle-btn ${isLogin ? "acitve" : ""}`} onClick={()=>setIsLogin(true )}>Login</button>
                <button className={`toggle-btn ${!isLogin ? "acitve" : ""}`} onClick={()=>setIsLogin(false )}>Register</button>
            </div>
        </div>
    </div>
  )
}

export default Auth